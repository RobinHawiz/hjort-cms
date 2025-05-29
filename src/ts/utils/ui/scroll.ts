import Lenis from "lenis";

/**
 * Enables smooth scrolling when user scrolls with their mouse.
 */
export function initSmoothScroll(): void {
  // Initialize Lenis
  const lenis = new Lenis({
    lerp: 0.12,
  });

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
