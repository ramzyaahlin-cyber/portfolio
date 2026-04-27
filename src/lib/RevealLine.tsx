import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ENTER_EASE = [0.22, 0.7, 0.2, 1] as const;

export default function RevealLine({
  children,
  delay = 0,
  duration = 1.05,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -10% 0px",
  });
  return (
    <span
      ref={ref}
      className="block overflow-hidden"
      style={{ paddingBottom: "0.2em", marginBottom: "-0.2em" }}
    >
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={{ y: inView ? "0%" : "110%" }}
        transition={{ duration, ease: ENTER_EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
