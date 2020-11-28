export function loadPolyfills() {
  if (typeof window === "undefined") return;

  if (!("IntersectionObserver" in window)) {
    // @ts-ignore
    import("intersection-observer");
  }
}
