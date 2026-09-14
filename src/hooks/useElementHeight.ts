import { useEffect, useRef, useState } from "react";

/**
 * Tracks an element's rendered height in pixels, live-updated via
 * ResizeObserver as content or column width changes. Returns `null` until
 * the first measurement lands.
 */
export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("ResizeObserver" in window)) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, height] as const;
}
