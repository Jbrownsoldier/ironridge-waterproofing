import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";

const inspectionRequestSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .refine((val) => val.replace(/\D/g, "").length === 10, {
      message: "Valid 10-digit US phone number required.",
    }),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Valid 5-digit ZIP code required."),
  problemId: z.string().trim().min(1).max(60),
  problemLabel: z.string().trim().min(1).max(160).optional(),
  spaceType: z.string().trim().min(1).max(80),
  urgency: z.string().trim().min(1).max(80),
  secondOpinionMode: z.boolean().optional(),
  estimateSummary: z.string().trim().max(240).nullable().optional(),
  photoAttached: z.boolean().optional(),
  photoFilename: z.string().trim().max(180).nullable().optional(),
});

function generateDispatchRef(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `IR-${year}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = inspectionRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please verify your contact details and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const dispatchId = generateDispatchRef();
    const matchedCity =
      siteConfig.zipToCityMap[data.zipCode] ||
      (data.zipCode.startsWith("43")
        ? `Central Ohio (${data.zipCode})`
        : `ZIP ${data.zipCode}`);

    const leadRecord = {
      dispatchId,
      receivedAt: new Date().toISOString(),
      serviceArea: matchedCity,
      ...data,
    };

    // Forward to external CRM / Dispatch webhook when configured in environment
    const webhookUrl = process.env.IRONRIDGE_LEAD_WEBHOOK_URL;
    let forwarded = false;
    if (webhookUrl) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        forwarded = res.ok;
      } catch (err) {
        console.error("[Ironridge Dispatch Webhook Error]", err);
      }
    }

    // Structured server audit log (visible in Vercel Functions logs)
    console.info("[Ironridge Inspection Lead]", {
      dispatchId,
      city: matchedCity,
      problemId: data.problemId,
      urgency: data.urgency,
      forwarded,
    });

    return NextResponse.json(
      {
        ok: true,
        dispatchId,
        matchedCity,
        receivedAt: leadRecord.receivedAt,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process inspection request right now. Please call (614) 555-0194.",
      },
      { status: 500 }
    );
  }
}
