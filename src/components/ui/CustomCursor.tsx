import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    document.body.classList.add("with-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const dot = dotRef.current;
      const label = labelRef.current;
      if (dot) {
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (label) {
        label.style.transform = `translate(${mx}px, ${my}px) translate(-50%, calc(-50% + 44px))`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cur = target.closest("a, button, [data-cursor]") as HTMLElement | null;
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!cur || !ring || !label) return;
      const kind = cur.getAttribute("data-cursor");
      ring.classList.remove("is-hover", "is-drag");
      label.classList.remove("is-show");
      if (kind === "drag") {
        ring.classList.add("is-drag");
        label.textContent = "Drag";
        label.classList.add("is-show");
      } else if (kind === "view") {
        ring.classList.add("is-hover");
        label.textContent = cur.getAttribute("data-cursor-label") || "View";
        label.classList.add("is-show");
      } else if (kind === "read") {
        ring.classList.add("is-hover");
        label.textContent = "Read";
        label.classList.add("is-show");
      } else if (kind === "send") {
        ring.classList.add("is-hover");
        label.textContent = "Send";
        label.classList.add("is-show");
      } else if (kind === "call") {
        ring.classList.add("is-hover");
        label.textContent = "Call";
        label.classList.add("is-show");
      } else {
        ring.classList.add("is-hover");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cur = target.closest("a, button, [data-cursor]");
      if (!cur) return;
      const related = e.relatedTarget as Node | null;
      if (related && cur.contains(related)) return;
      const ring = ringRef.current;
      const label = labelRef.current;
      ring?.classList.remove("is-hover", "is-drag");
      label?.classList.remove("is-show");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("with-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
