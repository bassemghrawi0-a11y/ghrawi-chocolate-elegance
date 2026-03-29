import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ar";

interface LangContextType {
  lang: Lang;
  isAr: boolean;
  toggleLang: () => void;
  t: (en: string, ar: string) => string;
}

const LangContext = createContext<LangContextType | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));
  const isAr = lang === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <LangContext.Provider value={{ lang, isAr, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};
