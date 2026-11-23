export const siteConfig = {
  seo: {
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://ironridgewaterproofing.com"),
    siteName: "Ironridge Foundation & Waterproofing",
    defaultTitle:
      "Ironridge Foundation & Waterproofing | Columbus & Central Ohio",
    titleTemplate: "%s | Ironridge Foundation & Waterproofing",
    defaultDescription:
      "Permanent basement waterproofing, foundation crack injection, bowing wall repair, and crawl space encapsulation in Columbus & Central Ohio. Free 45-minute laser inspection and lifetime transferable warranty.",
    ogImage: "/images/og-site-snapshot.png",
    twitterImage: "/images/twitter-site-snapshot.png",
    twitterHandle: "@ironridgeohio",
    locale: "en_US",
    keywords: [
      "basement waterproofing Columbus OH",
      "foundation repair Central Ohio",
      "interior French drain installation",
      "bowing basement wall carbon fiber straps",
      "crawl space encapsulation Columbus",
      "sump pump battery backup Ohio",
      "foundation crack injection Columbus",
      "Dublin basement waterproofing",
      "Westerville foundation repair",
      "Upper Arlington crawl space encapsulation",
    ],
    geo: {
      region: "US-OH",
      placename: "Columbus, Ohio",
      latitude: "39.9612",
      longitude: "-82.9988",
    },
  },

  company: {
    name: "Ironridge Foundation & Waterproofing",
    shortName: "IRONRIDGE",
    subBrand: "FOUNDATION & WATERPROOFING",
    tagline:
      "Permanent Basement Waterproofing & Structural Repair, Backed for Life.",
    established: 2007,
    yearsInBusiness: 19,
    ownershipNote:
      "19 Years Locally Owned. Independent, Not a National Franchise",
    ownerName: "Mark Callahan",
    ownerTitle: "Certified Structural & Waterproofing Specialist",
    ownerRole:
      "Founder & Lead Structural Specialist, Ironridge Foundation & Waterproofing",
    licenseNumber: "Ohio Contractor Reg. #OH-FDN-84921",
    insuranceSummary: "Bonded & $2M Liability Insured",
    phoneDisplay: "(614) 555-0194",
    phoneHref: "tel:+16145550194",
    address: "4180 Industrial Pkwy, Suite B, Columbus, OH 43228",
    hours: "Mon-Sat 7:00 AM - 7:00 PM",
    emergencyDispatch: "24/7 Active Leak Emergency Dispatch",
    rating: "4.9",
    reviewCount: 214,
    bbbRating: "BBB A+ Accredited",
    basementsProtected: "3,400+ Central Ohio Basements Protected",
    localMission:
      "Protecting Central Ohio homes with permanent, engineering-grade basement waterproofing and structural foundation repair since 2007, with zero commissioned sales reps.",
    copyrightYear: 2026,
  },

  serviceAreas: [
    "Columbus",
    "Dublin",
    "Westerville",
    "Upper Arlington",
    "Powell",
    "Grove City",
    "New Albany",
    "Delaware",
  ],

  suburbProfiles: [
    {
      city: "Columbus",
      soil: "Glacial Till & Silty Clay",
      commonIssue: "Cove joint seepage & poured wall shrinkage cracks",
      nextSlot: "Tomorrow, 8:30 AM",
      projectsCompleted: "1,120+",
    },
    {
      city: "Dublin",
      soil: "High-Plasticity Scioto Clay",
      commonIssue: "Finished basement perimeter seepage & sump overload",
      nextSlot: "Tomorrow, 10:15 AM",
      projectsCompleted: "640+",
    },
    {
      city: "Westerville",
      soil: "Dense Clay-Loam Basin",
      commonIssue: "Lateral wall bowing & diagonal window cracks",
      nextSlot: "Tomorrow, 1:00 PM",
      projectsCompleted: "510+",
    },
    {
      city: "Upper Arlington",
      soil: "Limestone Overburden & Clay",
      commonIssue: "1950s-1970s block foundations & damp crawl spaces",
      nextSlot: "Wed, 9:00 AM",
      projectsCompleted: "485+",
    },
    {
      city: "Powell",
      soil: "Expansive Olentangy Clay",
      commonIssue: "Hydrostatic slab uplift after spring storms",
      nextSlot: "Wed, 11:30 AM",
      projectsCompleted: "340+",
    },
    {
      city: "New Albany",
      soil: "Poorly Drained Clay Subsoil",
      commonIssue: "Deep basement window well & cove joint leaks",
      nextSlot: "Thu, 8:30 AM",
      projectsCompleted: "310+",
    },
  ],

  marketSummary:
    "Columbus, Dublin, Westerville, Upper Arlington, Powell, Grove City, New Albany & Central Ohio",

  zipToCityMap: {
    "43016": "Dublin",
    "43017": "Dublin",
    "43081": "Westerville",
    "43082": "Westerville",
    "43220": "Upper Arlington",
    "43221": "Upper Arlington",
    "43065": "Powell",
    "43123": "Grove City",
    "43054": "New Albany",
    "43015": "Delaware",
    "43214": "Clintonville / Columbus",
    "43215": "Downtown Columbus",
    "43228": "West Columbus",
    "43235": "Worthington / North Columbus",
    "43026": "Hilliard",
    "43068": "Reynoldsburg",
    "43110": "Canal Winchester",
    "43147": "Pickerington",
  } as Record<string, string>,

  navigation: [
    { label: "Diagnostics", href: "/diagnostics" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Cost Estimator", href: "/cost-estimator" },
    { label: "FAQ", href: "/faq" },
  ],

  announcementBar: {
    text: "Active Leak After Heavy Rain? Same-Week Emergency Inspections Across Central Ohio",
    ctaLabel: "Call (614) 555-0194",
  },

  hero: {
    eyebrow: "CENTRAL OHIO'S INDEPENDENT ENGINEERS SINCE 2007",
    headlinePrimary: "Permanent waterproofing",
    headlineSecondary: "and structural repair.",
    subheadline:
      "Licensed Central Ohio engineers solving wet basements, cracked walls, and damp crawl spaces. Get a free 45-minute laser diagnostic, exact written pricing, and a lifetime transferable warranty.",
    trustPills: [
      "4.9★ (214 Google Reviews)",
      "Lifetime Transferable Warranty",
      "No Commissioned Sales Reps",
    ],
    phonePrompt: "Prefer to talk right now?",
    phoneSubtext: "Answered live in Columbus",
    heroImage: "/images/hero-basement-crew.jpg",
    heroVideo: "/videos/hero-field-reel.mp4",
  },

  qualifier: {
    headerTitle: "Book Your Free Structural Inspection",
    timeEstimate: "Takes 45 seconds",
    step1Title: "What are you seeing in your home?",
    step1Options: [
      {
        id: "active-leak",
        label: "Active Water Leak / Standing Water",
        shortDesc: "Seepage at floor joint, wet carpet, or puddles after rain",
        iconName: "Droplets" as const,
      },
      {
        id: "wall-cracks",
        label: "Foundation Wall Cracks",
        shortDesc:
          "Vertical, diagonal, stair-step, or horizontal concrete cracks",
        iconName: "Split" as const,
      },
      {
        id: "bowing-walls",
        label: "Bowing, Leaning, or Shifting Walls",
        shortDesc:
          "Inward wall deflection, sticking doors, or uneven floors",
        iconName: "MoveHorizontal" as const,
      },
      {
        id: "crawl-space",
        label: "Musty Crawl Space / Damp Basement",
        shortDesc:
          "High humidity, mold odor, damp dirt crawl space, or old sump",
        iconName: "Wind" as const,
      },
    ],
    step2Title: "Tell us about the space & urgency",
    spaceTypes: [
      "Unfinished Basement",
      "Finished Basement",
      "Crawl Space",
      "Slab / Exterior",
    ],
    urgencyLevels: [
      "ASAP (Active Water)",
      "This Week",
      "Just Planning / 2nd Opinion",
    ],
    step3Title: "Snap or Upload a Photo (Optional)",
    step3Helper:
      "Helps Mark identify the issue before arriving. Completely optional.",
    step3SkipLabel: "Skip This Step →",
    step4Title: "Where should we send your free inspection window?",
    submitButtonLabel: "Get My Free Inspection",
    deriskingMicroCopy:
      "15-minute callback • Written quote on the spot • Zero obligation",
    honestNote:
      "\"If your leak is just a $40 downspout issue, we'll tell you honestly.\"",
  },

  authorityStrip: [
    {
      label: "BBB A+ Accredited",
      sub: "Zero unresolved complaints since 2007",
      detail:
        "Verified Ohio Better Business Bureau A+ rating with zero unresolved homeowner disputes across 19 years.",
      iconName: "Award" as const,
    },
    {
      label: "3,400+ Local Homes Repaired",
      sub: "Proven across Central Ohio clay soils",
      detail:
        "Documented job logs across Columbus, Dublin, Westerville, Upper Arlington, Powell, and New Albany.",
      iconName: "Home" as const,
    },
    {
      label: "Lifetime Transferable Warranty",
      sub: "100% transferable when you sell",
      detail:
        "Serial-numbered certificate transfers at $0 fee to future home buyers during real estate closing.",
      iconName: "ShieldCheck" as const,
    },
    {
      label: "Licensed, Bonded & $2M Insured",
      sub: "Ohio Reg. #OH-FDN-84921",
      detail:
        "Full commercial general liability and Ohio workers compensation coverage on every structural crew.",
      iconName: "FileCheck2" as const,
    },
    {
      label: "100% Locally Owned (No Franchise Markup)",
      sub: "In-house crews, never subcontractors",
      detail:
        "Zero corporate royalties or commissioned closer fees, keeping local quotes 25% to 35% lower.",
      iconName: "HardHat" as const,
    },
  ],

  symptomsSection: {
    eyebrow: "DIAGNOSTIC SYMPTOM GUIDE",
    headline: "Not Sure How Serious It Is? Start With What You See.",
    subheadline:
      "Catching water or structural movement early often turns a $12,000 excavation into a $1,200 localized fix. Click any symptom to inspect the engineering details.",
    cards: [
      {
        id: "active-leak",
        qualifierOptionId: "active-leak",
        title: "Water Seeping at the Wall-Floor Joint",
        tag: "Most Common After Heavy Rain",
        typicalRange: "$4,500 - $10,000",
        installTime: "1 to 2 Days",
        whatYouSee:
          "Damp dark lines where the concrete wall meets the floor, white chalky dust (efflorescence), or puddles spreading across the basement after storms.",
        whatIsHappening:
          "Central Ohio clay soil holds water like a bowl around your home. Groundwater builds up under the concrete slab and pushes through the cold joint between the footing and wall.",
        typicalFix: "Interior French Drain + Vapor Barrier",
        typicalFixDetail:
          "Sub-floor perimeter French drain trench relieving under-slab water pressure straight into a sealed sump system with zero exterior yard digging.",
        ctaLabel: "Inspect This Problem",
        iconName: "Droplets" as const,
      },
      {
        id: "wall-cracks",
        qualifierOptionId: "wall-cracks",
        title: "Vertical, Stair-Step, or Horizontal Wall Cracks",
        tag: "Poured Concrete & Block Walls",
        typicalRange: "$750 - $1,500",
        installTime: "3 to 4 Hours",
        whatYouSee:
          "Diagonal or vertical cracks in poured walls (often near basement windows), or stair-step mortar cracks in concrete block foundations.",
        whatIsHappening:
          "Seasonal freeze-thaw cycles and saturated clay soil push against the wall, opening shrinkage cracks into active water channels or structural stress fractures.",
        typicalFix: "Epoxy/Polyurethane Injection or Carbon Fiber Straps",
        typicalFixDetail:
          "High-pressure flexible polyurethane or structural epoxy fills the full 8-inch thickness of the concrete wall, never a surface patch that peels off.",
        ctaLabel: "Inspect This Problem",
        iconName: "Split" as const,
      },
      {
        id: "bowing-walls",
        qualifierOptionId: "bowing-walls",
        title: "Bowing Walls, Sticking Doors, or Sloping Floors",
        tag: "Structural Movement Warning",
        typicalRange: "$5,000 - $15,000+",
        installTime: "1 to 2 Days",
        whatYouSee:
          "Basement walls curving inward at the center, upstairs doors sticking in their frames, drywall cracks above doorways, or bouncy/uneven floors.",
        whatIsHappening:
          "Expansive soil pressure is exceeding the lateral load capacity of your foundation wall, or under-house piers have settled into soft subsoil.",
        typicalFix: "Carbon Fiber Straps / Wall Anchors / Structural Piers",
        typicalFixDetail:
          "Aerospace-grade carbon fiber stabilization straps or heavy-duty galvanized steel wall anchors lock the wall permanently in place without excavating your yard.",
        ctaLabel: "Inspect This Problem",
        iconName: "MoveHorizontal" as const,
      },
      {
        id: "crawl-space",
        qualifierOptionId: "crawl-space",
        title: "Musty Odors, Damp Crawl Space, or Failing Sump Pump",
        tag: "Air Quality & Storm Protection",
        typicalRange: "$1,800 - $6,500",
        installTime: "Half Day to 2 Days",
        whatYouSee:
          "Persistent earthy/musty smell upstairs, cold damp floors, sagging crawl space insulation, or an aging rusty sump pump without a battery backup.",
        whatIsHappening:
          "Up to 50% of the air you breathe on your first floor rises directly from your basement or crawl space (the stack effect), carrying moisture, mold spores, and rot into floor joists.",
        typicalFix: "20-Mil Encapsulation + Cast-Iron Pump & Battery Backup",
        typicalFixDetail:
          "Reinforced 20-mil antimicrobial vapor barrier sealing the dirt floor and piers, paired with commercial dehumidification and a dual marine-battery sump system.",
        ctaLabel: "Inspect This Problem",
        iconName: "Wind" as const,
      },
    ],
  },

  beforeAfterSection: {
    eyebrow: "DOCUMENTED CENTRAL OHIO PROJECTS",
    headline: "Real Central Ohio Repairs. Bone-Dry Results.",
    subheadline:
      "Drag the slider on our recent projects to see how we permanently solve leaking walls, flooded floors, and damp crawl spaces.",
    transformationVideo: "/videos/case-transformations.mp4",
    cases: [
      {
        id: "westerville",
        tabLabel: "Case 1: Westerville Crack & Wall Repair",
        location: "Westerville, OH (1984 Colonial)",
        videoStartSec: 0,
        beforeImage: "/images/case1-before.jpg",
        afterImage: "/images/case1-after.jpg",
        beforeLabel: "BEFORE: Active Diagonal Crack & Seepage",
        afterLabel: "AFTER: Carbon Fiber Straps & Sealed Vapor Wall",
        problem:
          "Diagonal foundation crack leaking every spring storm + early inward wall bowing.",
        solution:
          "Polyurethane structural crack injection + 6 carbon fiber reinforcement straps.",
        specs: [
          "Completed in 1.5 Days",
          "Zero Exterior Digging",
          "Lifetime Warranty",
        ],
        testimonial: {
          quote:
            "Two big national franchises quoted us $19,500 and tried to pressure me to sign that night. Mark measured our wall with a laser, showed us we didn't need exterior excavation, and fixed the crack plus reinforced the wall for less than half the price. Three heavy thunderstorms later, bone dry.",
          author: "David & Karen H., Westerville",
          badge: "Verified Google Review ★★★★★",
        },
      },
      {
        id: "dublin",
        tabLabel: "Case 2: Dublin Perimeter French Drain",
        location: "Dublin, OH (1998 Finished Basement)",
        videoStartSec: 5.2,
        beforeImage: "/images/case2-before.jpg",
        afterImage: "/images/case2-after.jpg",
        beforeLabel: "BEFORE: Perimeter Seepage & Failing Sump",
        afterLabel: "AFTER: Interior French Drain & Dual Battery Sump",
        problem:
          "Groundwater seeping under finished carpet along 45 ft of perimeter wall + burned-out sump pump.",
        solution:
          "Full interior perimeter French drain system + dual cast-iron sump pump with marine battery backup.",
        specs: [
          "Completed in 2 Days",
          "Dust-Controlled Crew",
          "Transferable Warranty",
        ],
        testimonial: {
          quote:
            "I was terrified they were going to destroy my finished basement and leave concrete dust everywhere. Their crew plastic-sealed the whole workspace, finished in two days, and left the floor cleaner than when they arrived. When power went out last month during a downpour, the battery backup kicked right on without a drop on the floor.",
          author: "Rachel M., Dublin",
          badge: "Verified Google Review ★★★★★",
        },
      },
      {
        id: "upper-arlington",
        tabLabel: "Case 3: Upper Arlington Encapsulation",
        location: "Upper Arlington, OH (1968 Ranch)",
        videoStartSec: 10.2,
        beforeImage: "/images/case3-before.jpg",
        afterImage: "/images/case3-after.jpg",
        beforeLabel: "BEFORE: Damp Dirt Crawl Space & 78% Humidity",
        afterLabel: "AFTER: 20-Mil Reinforced Vapor Encapsulation",
        problem:
          "Damp dirt crawl space causing persistent musty smell upstairs and high indoor humidity.",
        solution:
          "20-mil reinforced crawl space encapsulation, sealed vents, and commercial dehumidifier.",
        specs: [
          "Completed in 2 Days",
          "Humidity Dropped 78% to 46%",
          "Lifetime Barrier Warranty",
        ],
        testimonial: {
          quote:
            "We were about to list our house and our pre-listing inspector flagged crawl space moisture. Ironridge fit us in within 48 hours, gave us a clean written warranty that transferred directly to our buyer, and saved our closing. Worth every penny.",
          author: "Greg T., Upper Arlington",
          badge: "Verified Google Review ★★★★★",
        },
      },
    ],
    additionalReviews: [
      {
        highlightTag: "Honest Diagnosis: Saved Us $8,500",
        quote:
          "Another company told us our south foundation wall was failing and needed $9,000 in wall anchors. Mark came out with his digital laser level, showed me the wall was within 1/8 inch of plumb, and pointed out a crushed underground downspout line outside. He didn't charge us a dime and earned a customer for life.",
        author: "Thomas R.",
        suburb: "Powell, OH",
        date: "2 weeks ago",
        verifiedScope: "Laser Plumb Audit & Exterior Drainage",
      },
      {
        highlightTag: "On-Time to the Minute & Zero Sales Pitch",
        quote:
          "Showed up at 8:00 AM sharp, not a 4-hour cable-company window. Walked me through the moisture meter readings on every wall, handed me a clear 1-page written quote for two crack injections, and left without a single pushy sales line. Completed the repair three days later.",
        author: "Linda & Steve K.",
        suburb: "Grove City, OH",
        date: "1 month ago",
        verifiedScope: "2x Full-Depth Polyurethane Crack Injections",
      },
      {
        highlightTag: "Spotless Jobsite & Respectful In-House Crew",
        quote:
          "You can tell their crew actually works for Ironridge and aren't random day-labor subcontractors. They laid floor runners from the front door to the basement stairs, wore boot covers, vacuumed every speck of concrete dust, and walked me through testing the new battery backup alarm.",
        author: "Marcus W.",
        suburb: "New Albany, OH",
        date: "3 weeks ago",
        verifiedScope: "Cast-Iron Primary + Marine Battery Sump",
      },
    ],
  },

  costSection: {
    eyebrow: "INDUSTRY-ACCURATE COST TRANSPARENCY",
    headline: "Honest Local Pricing. Zero Mystery, Zero Franchise Markups.",
    subheadline:
      "Every foundation, soil condition, and water table is different, so any company quoting an exact final price over the phone is guessing. Use our live calculator and Central Ohio ranges below before booking your free written inspection.",
    rangeBadgeLabel: "Typical Local Ranges",
    cards: [
      {
        title: "Foundation Crack Injection",
        priceRange: "$750 - $1,500",
        unitNote: "Per crack • High-pressure epoxy or polyurethane seal",
        details: [
          "Full-depth 8\" concrete wall penetration",
          "Stops active leaks & structural movement",
          "Completed in 3 to 4 hours with zero digging",
          "Backed by Lifetime Transferable Warranty",
        ],
        qualifierOptionId: "wall-cracks",
      },
      {
        title: "Sump Pump & Battery Backup",
        priceRange: "$1,800 - $3,500",
        unitNote: "Cast-iron primary + storm backup + sealed basin",
        details: [
          "Heavy-duty cast-iron primary pump (not plastic)",
          "Automatic marine-grade battery storm backup",
          "Airtight radon/odor-sealed basin lid & dual check valves",
          "High-water alarm & freeze-proof exterior discharge",
        ],
        qualifierOptionId: "crawl-space",
      },
      {
        title: "Interior Perimeter Waterproofing",
        priceRange: "$4,500 - $10,000",
        unitNote:
          "Sub-floor French drain + wall vapor barrier, varies by linear footage",
        details: [
          "Relieves groundwater pressure beneath the slab",
          "Washed gravel bed + commercial perforated drain tile",
          "Rigid white wall vapor channel + smooth re-concreting",
          "Zero damage to exterior porch, patio, or landscaping",
        ],
        qualifierOptionId: "active-leak",
      },
      {
        title: "Structural Wall Stabilization / Encapsulation",
        priceRange: "$5,000 - $15,000+",
        unitNote:
          "Carbon fiber straps, wall anchors, or full 20-mil encapsulation",
        details: [
          "Aerospace carbon fiber straps or galvanized steel anchors",
          "Halts bowing block & poured concrete walls permanently",
          "20-mil reinforced poly crawl space liner & dehumidifier",
          "Engineered documentation ready for future home buyers",
        ],
        qualifierOptionId: "bowing-walls",
      },
    ],
    financingBanner: {
      pills: [
        "$0 Down • 0% APR for 12 Months",
        "Low Monthly Payments from $119/mo",
        "Written Fixed-Price Quotes Locked for 30 Days",
      ],
      note: "Checking financing options takes 2 minutes and uses a soft pull that won't impact your credit score.",
    },
    secondOpinionBox: {
      badge: "FREE COMPETITOR QUOTE AUDIT",
      headline: "Got a Scary Quote Already?",
      copy: "Big franchise reps work on commission and routinely push $20k+ full-perimeter tear-outs when a targeted repair will solve the problem. Show us any written competitor quote and Mark will give you an honest, no-pressure 2nd opinion for free.",
      ctaLabel: "Request a Free 2nd Opinion",
    },
  },

  processSection: {
    eyebrow: "THE ZERO-PRESSURE INSPECTION PROCESS",
    headline: "What Happens After You Request an Inspection?",
    subheadline:
      'No high-pressure kitchen-table pitches. No "sign tonight or lose the discount" gimmicks.',
    steps: [
      {
        stepNumber: "01",
        title: "Step 1: 15-Minute Local Callback",
        description:
          "Our Columbus office calls or texts you within 15 minutes to confirm a convenient 45-minute inspection window, often same-week.",
        detail:
          "Direct local dispatch in West Columbus (43228), never an out-of-state call center.",
        badge: "Live Local Dispatch",
      },
      {
        stepNumber: "02",
        title: "Step 2: 45-Minute Laser & Moisture Diagnostic",
        description:
          "A certified Ironridge specialist checks floor elevations, wall deflection, grading, and moisture readings, walking you through the exact root cause in plain English.",
        detail:
          "Includes digital ±0.125\" plumb laser readings and non-invasive wall moisture mapping.",
        badge: "Salaried Specialist, Not a Salesman",
      },
      {
        stepNumber: "03",
        title: "Step 3: Exact Written Plan (Good for 30 Days)",
        description:
          "You receive an itemized, fixed-price written quote on the spot. Take your time deciding with zero follow-up harassment, and if you don't need a repair, we tell you.",
        detail:
          "Same-day digital PDF + printed scope breakdown with financing terms clearly listed.",
        badge: "Fixed Price Locked 30 Days",
      },
    ],
  },

  ownerSection: {
    eyebrow: "MEET YOUR LEAD STRUCTURAL INSPECTOR",
    headline: '"If You Don\'t Need a $10,000 Repair, I\'ll Tell You."',
    body: "I started Ironridge in 2007 because I was tired of watching Central Ohio homeowners get scared into massive loans by out-of-state franchise sales reps. When you call us, we send a licensed structural specialist, not a commissioned closer. We show you the exact moisture readings, give you a written price that doesn't change, and back our work with a Lifetime Warranty that transfers to the next owner when you sell your home.",
    ownerImage: "/images/mark-callahan.jpg",
    signatureName: "Mark Callahan",
    signatureTitle:
      "Founder & Lead Structural Specialist, Ironridge Foundation & Waterproofing",
    credentials: [
      "19+ Years Central Ohio Structural Diagnostics",
      "Ohio Reg. #OH-FDN-84921",
      "Personally Reviews Every Structural Plan",
    ],
    ctaLabel: "Schedule With Mark's Team",
  },

  faqSection: {
    eyebrow: "HOMEOWNER OBJECTIONS & STRAIGHT ANSWERS",
    headline: "Straight Answers to Every Homeowner's Biggest Worries",
    subheadline:
      "Clear, technical facts from our field supervisors so you know what to expect before anyone steps foot in your basement.",
    categories: [
      "All",
      "Inspection & Pricing",
      "Installation & Yard",
      "Warranty & Closing",
    ],
    items: [
      {
        category: "Inspection & Pricing",
        question:
          "Is the inspection really free, or is it a high-pressure sales trap?",
        answer:
          'It is 100% free with zero obligation. Unlike big franchise chains that send commissioned salespeople trained to stay in your living room for three hours, our inspectors are salaried structural specialists. Your written quote is valid for 30 days, and we never use "sign tonight" pressure tactics.',
      },
      {
        category: "Installation & Yard",
        question:
          "Will waterproofing destroy my yard, landscaping, or finished basement?",
        answer:
          "In over 85% of Central Ohio homes, our interior sub-floor drainage and carbon fiber repairs require zero exterior digging, meaning your porch, driveway, and landscaping stay untouched. If you have a finished basement, we isolate the work zone with dust barriers, remove only the minimal bottom strip of drywall needed, and leave the space broom-clean.",
      },
      {
        category: "Warranty & Closing",
        question:
          "Does the Lifetime Warranty actually transfer if I sell my house?",
        answer:
          "Yes, it is 100% transferable to future homeowners at no hidden transfer fee. Real estate agents and home buyers love our warranty because it turns a past foundation concern into documented peace of mind during closing.",
      },
      {
        category: "Installation & Yard",
        question:
          "How long does a typical foundation repair or waterproofing job take?",
        answer:
          "Most crack injections take 3 to 4 hours. Full interior waterproofing systems, sump backups, carbon fiber wall stabilization, and crawl space encapsulations are typically completed in 1 to 3 days by our own in-house trained crews (never random subcontractors).",
      },
      {
        category: "Installation & Yard",
        question:
          "What happens if the power goes out during a severe Ohio thunderstorm?",
        answer:
          "Standard sump pumps fail the exact moment you need them most: when the power dies in a storm. That's why we install dual systems with an automatic marine-grade battery backup that kicks in seamlessly the millisecond utility power drops, keeping your basement dry for days.",
      },
      {
        category: "Inspection & Pricing",
        question:
          "Will my homeowners insurance cover basement water or foundation cracks?",
        answer:
          "Standard homeowner policies rarely cover groundwater seepage or clay-soil foundation movement, though sudden pipe bursts or sump backup riders sometimes have partial coverage. We provide detailed photo documentation and clear diagnostics so you know your options upfront, plus $0-down financing to keep repairs manageable.",
      },
      {
        category: "Warranty & Closing",
        question:
          "Can I just seal a leaking basement wall myself with waterproof paint (like Drylok)?",
        answer:
          "Waterproof paint only traps water inside your concrete block or poured wall; it does not relieve hydrostatic pressure. Eventually the trapped moisture causes the paint to bubble and peel, accelerating concrete spalling. Permanent waterproofing relieves water pressure beneath the floor or seals the crack structurally through the full depth of the wall.",
      },
    ],
  },

  preFooterBand: {
    headline: "Water & Foundation Cracks Only Get More Expensive With Time.",
    subheadline:
      "Get an honest, written structural assessment this week. Zero cost, zero pressure.",
    primaryCtaLabel: "Book My Free Inspection",
    secondaryCtaLabel: "Call 24/7 Dispatch: (614) 555-0194",
  },

  legalModals: {
    privacyPolicy: {
      title: "Privacy Policy & Local Dispatch Communications",
      lastUpdated: "Effective January 1, 2026",
      sections: [
        {
          heading: "1. Zero Lead-Broker Reselling Guarantee",
          body: "When you submit your name, phone number, ZIP code, or basement photos to Ironridge Foundation & Waterproofing, your information goes strictly to Mark Callahan's local dispatch desk in Columbus, Ohio. We NEVER sell, rent, or share your contact information with third-party home-advisor lead brokers or marketing lists.",
        },
        {
          heading: "2. SMS & Phone Inspection Scheduling",
          body: "By requesting an inspection window or 2nd opinion, you authorize Ironridge Foundation & Waterproofing to contact you via phone call or SMS text message at the number provided solely to confirm your appointment window, share your inspector's arrival time, and deliver your written quote. You may reply STOP to any text message at any time.",
        },
        {
          heading: "3. Jobsite Photos & Diagnostic Data",
          body: "Photos uploaded through our 4-Step Inspection Qualifier are processed strictly for diagnostic preparation by your assigned structural specialist and are never published externally without explicit written homeowner consent.",
        },
      ],
    },
    warrantyTerms: {
      title: "Lifetime Transferable Dry-Basement & Structural Warranty",
      lastUpdated: "Certificate Summary • Ohio Reg. #OH-FDN-84921",
      sections: [
        {
          heading: "1. Full-Perimeter & Localized Dry-Basement Guarantee",
          body: "If any section of an Ironridge Interior Sub-Floor French Drain System or Full-Depth Structural Crack Injection ever allows groundwater seepage through the treated area for the life of the structure, Ironridge will return and remediate the covered area at $0 labor and $0 material cost to the homeowner.",
        },
        {
          heading: "2. Structural Wall Stabilization Warranty",
          body: "Walls stabilized with Ironridge Carbon Fiber Reinforcement Straps or Galvanized Steel Wall Anchors are warranted against further inward lateral movement for the life of the foundation.",
        },
        {
          heading: "3. 100% Free Real Estate Transferability",
          body: "If you sell your Central Ohio home, this warranty transfers in full to the new homeowner with zero transfer fees and zero re-inspection fees. Simply provide the closing buyer with your serial-numbered Ironridge Warranty Certificate.",
        },
      ],
    },
  },
};

export type SiteConfig = typeof siteConfig;
