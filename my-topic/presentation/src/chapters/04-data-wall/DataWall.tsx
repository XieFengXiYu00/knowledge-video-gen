import { useEffect, useState } from "react";
import "./DataWall.css";

interface Props { step: number; }

function useIn(delay = 40) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    let live = true;
    const t = setTimeout(() => { if (live) setActive(true); }, delay);
    return () => { live = false; clearTimeout(t); };
  }, []);
  return active;
}

export default function DataWall({ step }: Props) {
  return (
    <div className="dw-root">
      {step === 0 && <StepDistribution />}
      {step === 1 && <StepAdvantage />}
      {step === 2 && <StepJapanKorea />}
    </div>
  );
}

/* ─── step 0: 语言分布条形图 ─── */
const LANGS = [
  { lang: "英语", pct: 60, label: "English", key: true },
  { lang: "中文", pct: 18, label: "Chinese", key: true },
  { lang: "法语", pct: 2.5, label: "French",  key: false },
  { lang: "德语", pct: 2.5, label: "German",  key: false },
  { lang: "日语", pct: 3.5, label: "Japanese",key: false },
  { lang: "韩语", pct: 1.5, label: "Korean",  key: false },
  { lang: "其他", pct: 12,  label: "Other",   key: false },
] as const;

function StepDistribution() {
  const active = useIn();
  return (
    <div className="dw-s0 scene-pad">
      <p className="dw-label kicker">第二道墙 · 全球互联网内容语言分布</p>
      <div className="dw-bars">
        {LANGS.map((l, i) => (
          <div key={l.lang} className="dw-bar-row">
            <div className="dw-bar-name">
              <span className="dw-lang">{l.lang}</span>
            </div>
            <div className="dw-track">
              <div
                className={`dw-bar ${l.key ? "dw-bar-key" : ""} ${active ? "is-in" : ""}`}
                style={{ "--bar-w": `${l.pct * 1.33}%`, transitionDelay: `${i * 100 + 100}ms` } as React.CSSProperties}
              />
            </div>
            <span className={`dw-pct ${l.key ? "dw-pct-key" : ""}`}>{l.pct}%</span>
          </div>
        ))}
      </div>
      <p className={`dw-sum ${active ? "is-in" : ""}`}>
        英语 + 中文 合计 <strong>&gt;75%</strong>
      </p>
    </div>
  );
}

/* ─── step 1: 数据 → 能力的关系 ─── */
function StepAdvantage() {
  const active = useIn();
  return (
    <div className="dw-s1 scene-pad center">
      <div className="dw-s1-inner">
        <div className={`dw-s1-rule rule-grow ${active ? "in" : ""}`} />
        <div className="dw-s1-compare">
          <div className={`dw-s1-card dw-s1-strong ${active ? "is-in" : ""}`}>
            <span className="dw-s1-card-lang">英语 + 中文</span>
            <span className="dw-s1-card-desc">全球大多数场景 ✓</span>
            <div className="dw-s1-bar dw-s1-bar-full" />
          </div>
          <div className={`dw-s1-card dw-s1-weak ${active ? "is-in" : ""}`} style={{ animationDelay: "200ms" }}>
            <span className="dw-s1-card-lang">法语 / 德语</span>
            <span className="dw-s1-card-desc">英语任务天然差一截</span>
            <div className="dw-s1-bar dw-s1-bar-partial" />
          </div>
        </div>
        <div className={`dw-s1-rule rule-grow ${active ? "in" : ""}`} style={{ transitionDelay: "300ms" }} />
      </div>
    </div>
  );
}

/* ─── step 2: 日韩困境 ─── */
function StepJapanKorea() {
  const active = useIn();
  return (
    <div className="dw-s2 scene-pad">
      <p className="dw-label kicker">日语 + 韩语的困境</p>
      <div className="dw-s2-hero">
        <span className={`dw-s2-num hero-num ${active ? "is-in" : ""}`}>&lt;3%</span>
        <p className="dw-s2-context">日语 + 韩语在全球互联网内容中的占比</p>
      </div>
      <div className={`dw-s2-rule rule-grow ${active ? "in" : ""}`} style={{ margin: "28px 0" }} />
      <div className="dw-s2-table">
        {[
          { lang: "日语", pct: "3~4%", verdict: "❌  远远不够" },
          { lang: "韩语", pct: "1~2%", verdict: "❌  远远不够" },
        ].map((r, i) => (
          <div
            key={r.lang}
            className={`dw-s2-row ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 180 + 300}ms` }}
          >
            <span className="dw-s2-lang">{r.lang}</span>
            <span className="dw-s2-pct">{r.pct}</span>
            <span className="dw-s2-verdict">{r.verdict}</span>
          </div>
        ))}
      </div>
      <p className={`dw-s2-note mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "700ms" }}>
        不是工程师不行，是语言本身就是劣势。
      </p>
    </div>
  );
}
