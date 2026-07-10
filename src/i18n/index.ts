import { createI18n } from "vue-i18n";
import en from "../locales/en";
import es from "../locales/es";

function detectLocale(): "en" | "es" {
  try {
    const stored = localStorage.getItem("locale");
    if (stored === "en" || stored === "es") return stored;
  } catch {}
  try {
    const nav = navigator.language;
    if (nav && nav.toLowerCase().startsWith("es")) return "es";
  } catch {}
  return "en";
}

const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: "en",
  messages: { en, es },
});

export default i18n;