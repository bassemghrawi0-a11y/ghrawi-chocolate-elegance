import { motion } from "framer-motion";
import { useLang } from "@/hooks/use-lang";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});

const line = "0.5px solid rgba(44,26,14,0.1)";

const rows = [
  { goodEn: "100% Cocoa Butter", goodAr: "زبدة كاكاو ١٠٠٪", badEn: "Hydrogenated Oils", badAr: "زيوت مهدرجة" },
  { goodEn: "Pure Natural Flavor", goodAr: "نكهة طبيعية نقية", badEn: "Artificial Flavoring", badAr: "نكهة اصطناعية" },
  { goodEn: "No Preservatives", goodAr: "بدون مواد حافظة", badEn: "Contains Additives", badAr: "يحتوي على إضافات" },
];

const CheckIcon = () => (
  <span className="inline-block w-2 h-2 rounded-full shrink-0 mt-[3px]" style={{ background: "#5C7A3A" }} />
);
const CrossIcon = () => (
  <span className="inline-block w-2 h-2 shrink-0 mt-[3px] rotate-45" style={{ background: "#A05050" }} />
);

const Philosophy = () => {
  const { t } = useLang();

  return (
    <section className="bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          {/* Left — Text */}
          <motion.div {...fadeUp(0)} className="py-16 md:py-20 md:pr-14 md:pl-10 flex flex-col justify-center">
            <p
              className="font-body text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "hsl(var(--accent))" }}
            >
              {t("Our Philosophy", "فلسفتنا")}
            </p>

            <h2 className="font-display text-[36px] md:text-[42px] font-light leading-[1.15] text-foreground mb-6">
              {t(
                <>What makes <em>real</em> chocolate different?</>,
                "ما الذي يجعل الشوكولاتة الحقيقية مختلفة؟"
              )}
            </h2>

            <p
              className="font-body font-light text-sm leading-[1.9] max-w-[400px] mb-10"
              style={{ color: "#6B4226" }}
            >
              {t(
                "Most commercial chocolate replaces cocoa butter with hydrogenated vegetable oils — cheaper, but hollow in taste and texture. At Basem Ghrawi, we never compromise. 100% pure cocoa butter gives the silky finish and deep flavor that simply cannot be faked.",
                "معظم الشوكولاتة التجارية تستبدل زبدة الكاكاو بزيوت نباتية مهدرجة — أرخص ثمناً، لكن فارغة في الطعم والقوام. في Basem Ghrawi لا نساوم. زبدة الكاكاو ١٠٠٪ تمنح الملمس الحريري والنكهة العميقة التي لا يمكن تزويرها."
              )}
            </p>

            {/* Comparison Table */}
            <div style={{ borderTop: line }} className="max-w-[420px]">
              {/* Headers */}
              <div className="grid grid-cols-2" style={{ borderBottom: line }}>
                <div className="py-3 px-5">
                  <span className="font-body text-[11px] font-medium tracking-[0.15em] uppercase" style={{ color: "#5C7A3A" }}>
                    {t("Basem Ghrawi", "باسم غراوي")}
                  </span>
                </div>
                <div className="py-3 px-5" style={{ borderLeft: line }}>
                  <span className="font-body text-[11px] font-medium tracking-[0.15em] uppercase" style={{ color: "#A05050" }}>
                    {t("Regular Chocolate", "شوكولاتة عادية")}
                  </span>
                </div>
              </div>
              {/* Rows */}
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2"
                  style={{
                    borderBottom: line,
                    background: i % 2 === 1 ? "rgba(44,26,14,0.02)" : "transparent",
                  }}
                >
                  <div className="py-3.5 px-5 flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="font-body font-light text-[13px]" style={{ color: "#6B4226" }}>
                      {t(row.goodEn, row.goodAr)}
                    </span>
                  </div>
                  <div className="py-3.5 px-5 flex items-start gap-2.5" style={{ borderLeft: line }}>
                    <CrossIcon />
                    <span className="font-body font-light text-[13px]" style={{ color: "#6B4226" }}>
                      {t(row.badEn, row.badAr)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Visual */}
          <div
            className="flex flex-col justify-center gap-6 py-16 md:py-16 px-8 md:px-10"
            style={{ background: "#F0E8D8", borderLeft: line }}
          >
            {/* Image placeholder */}
            <motion.div {...fadeUp(0.15)}>
              <div className="w-full h-[240px] flex items-center justify-center" style={{ background: "#E8D5B7" }}>
                <span className="font-body text-[11px] tracking-[0.15em] italic" style={{ color: "#8B5E3C" }}>
                  Process / Ingredients Photo
                </span>
              </div>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-2"
              style={{ borderTop: line, borderBottom: line }}
            >
              <div className="py-6 px-5">
                <p className="font-display text-[48px] font-light text-accent leading-none mb-2">2×</p>
                <p
                  className="font-body font-light text-[11px] tracking-[0.08em] leading-[1.6]"
                  style={{ color: "#8B5E3C" }}
                >
                  {t("Richer in flavor vs standard chocolate", "أغنى بالنكهة مقارنة بالشوكولاتة العادية")}
                </p>
              </div>
              <div className="py-6 px-5" style={{ borderLeft: line }}>
                <p className="font-display text-[48px] font-light text-accent leading-none mb-2">0</p>
                <p
                  className="font-body font-light text-[11px] tracking-[0.08em] leading-[1.6]"
                  style={{ color: "#8B5E3C" }}
                >
                  {t("Preservatives or artificial additives", "مواد حافظة أو إضافات اصطناعية")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
