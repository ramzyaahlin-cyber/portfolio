import { useEffect, useState } from "react";
import { useLang } from "../../lib/LangContext";
import { t } from "../../lib/translations";

export default function StatusBug() {
  const { lang } = useLang();
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Oslo",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status-bug">
      <span className="status-bug-dot" />
      <span>{t[lang].statusBug}</span>
      <span style={{ opacity: 0.7 }}>{time}</span>
    </div>
  );
}
