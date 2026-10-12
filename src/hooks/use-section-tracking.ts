import { useEffect, type RefObject } from "react";
import { useActiveSection } from "@/state/context";

/** Marks `id` as the active section while it crosses the middle of the viewport. */
export function useSectionTracking(id: string, ref: RefObject<HTMLElement>) {
  const { setActive } = useActiveSection();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, ref, setActive]);
}
