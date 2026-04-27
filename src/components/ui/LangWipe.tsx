import { motion } from "framer-motion";
import { useLang } from "../../lib/LangContext";

export default function LangWipe() {
  const { wipePhase, onWipeInComplete, onWipeOutComplete } = useLang();

  if (wipePhase === "idle") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-[#0a0a0a]"
      initial={wipePhase === "in" ? { x: "-100%" } : false}
      animate={{ x: wipePhase === "in" ? "0%" : "100%" }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      onAnimationComplete={
        wipePhase === "in" ? onWipeInComplete : onWipeOutComplete
      }
    />
  );
}
