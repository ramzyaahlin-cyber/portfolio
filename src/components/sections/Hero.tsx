import { motion } from "framer-motion";

const ease = [0.22, 0.7, 0.2, 1] as const;

export default function Hero() {
  const base = import.meta.env.BASE_URL;
  return (
    <header
      id="top"
      className="sticky top-0 z-[1] h-[88vh] min-h-[560px] md:h-[65vh] md:min-h-0 xl:h-screen overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-top xl:bg-center"
        style={{ backgroundImage: `url('${base}cubes.png')` }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 35%, rgba(0,0,0,.55) 100%)",
        }}
      />

      <div className="relative z-[3] h-full max-w-[1400px] mx-auto px-6 sm:px-10 pt-[clamp(140px,18vh,200px)] pb-14 grid grid-cols-1 md:grid-cols-[1fr_auto] md:gap-12 xl:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-end">
        <div className="max-w-[820px]">
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="font-sans font-medium text-white uppercase"
            style={{
              fontSize: "clamp(56px, 8vw, 132px)",
              lineHeight: "0.92",
              letterSpacing: "-0.04em",
              paddingBottom: "0.15em",
            }}
          >
            Digital Designer
            <br />
            <span
              className="italic font-normal normal-case"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--accent)",
              }}
            >
              & frontend dev.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
            className="font-sans text-white/85 max-w-[560px] mt-10 sm:mt-14"
            style={{
              fontSize: "clamp(20px, 2.2vw, 30px)",
              fontWeight: 400,
              lineHeight: "1.4em",
              letterSpacing: "-0.02em",
            }}
          >
            Twenty-five years of building brand, interface, and the code
            underneath —{" "}
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--accent)",
              }}
            >
              end-to-end
            </em>
            , from first sketch to final ship.
          </motion.p>

          <motion.a
            href="#work"
            aria-label="Scroll to work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="inline-flex items-center justify-center mt-10 w-10 h-10 text-white/85 hover:text-white"
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl"
            >
              ↓
            </motion.span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.45 }}
          className="hidden md:block w-[clamp(180px,28vw,420px)] aspect-[3/4] rounded-[6px] overflow-hidden self-start shadow-[0_30px_80px_rgba(0,0,0,.45)]"
        >
          <img
            src={`${base}ramzy02.jpeg`}
            alt="Ramzy Aahlin Zaher"
            className="w-full h-full object-cover scale-110 grayscale"
          />
        </motion.div>
      </div>
    </header>
  );
}
