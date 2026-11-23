// Modern Web Guidance: scroll-completion-effects
// Feature-detects native scrollIntoView Promise with a faithful scrollend + idle timer fallback
// and token-based cancellation for rapid overlapping scrolls.

let currentScrollToken = 0;

export function scrollIntoViewAsync(
  element: HTMLElement,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" }
): Promise<void> {
  const result = element.scrollIntoView(options) as unknown;

  if (result instanceof Promise) {
    return result as Promise<void>;
  }

  return new Promise<void>((resolve) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const finish = () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scrollend", finish);
      window.removeEventListener("scroll", onScroll);
      resolve();
    };

    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(finish, 110);
    };

    window.addEventListener("scrollend", finish, { once: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    timeoutId = setTimeout(finish, 110);
  });
}

export async function scrollToElementAndPulse(
  elementId: string,
  focusSelector?: string
) {
  const token = ++currentScrollToken;
  const target = document.getElementById(elementId);
  if (!target) return;

  target.classList.remove("qualifier-highlight-pulse");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  await scrollIntoViewAsync(target, {
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "center",
  });

  if (token !== currentScrollToken) return;

  target.classList.add("qualifier-highlight-pulse");
  setTimeout(() => {
    target.classList.remove("qualifier-highlight-pulse");
  }, 2300);

  if (focusSelector) {
    const focusTarget = target.querySelector<HTMLElement>(focusSelector);
    if (focusTarget) {
      focusTarget.focus({ preventScroll: true });
    }
  }
}
