import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "no";

type LangContextValue = {
  lang: Lang;
  triggerSwitch: () => void;
  wipePhase: "idle" | "in" | "out";
  onWipeInComplete: () => void;
  onWipeOutComplete: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "no") return stored;
  } catch {}
  return "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [wipePhase, setWipePhase] = useState<"idle" | "in" | "out">("idle");
  const [pendingLang, setPendingLang] = useState<Lang | null>(null);

  const triggerSwitch = useCallback(() => {
    if (wipePhase !== "idle") return;
    const next: Lang = lang === "en" ? "no" : "en";
    setPendingLang(next);
    setWipePhase("in");
  }, [lang, wipePhase]);

  const onWipeInComplete = useCallback(() => {
    if (pendingLang) {
      setLang(pendingLang);
      try {
        localStorage.setItem("lang", pendingLang);
      } catch {}
      setPendingLang(null);
    }
    setWipePhase("out");
  }, [pendingLang]);

  const onWipeOutComplete = useCallback(() => {
    setWipePhase("idle");
  }, []);

  return (
    <LangContext.Provider
      value={{
        lang,
        triggerSwitch,
        wipePhase,
        onWipeInComplete,
        onWipeOutComplete,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
