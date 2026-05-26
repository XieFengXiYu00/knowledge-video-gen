import { useEffect, useState } from "react";
import "./ColdOpen.css";

interface Props { step: number; }

/** Sets the `in` state true after `delay` ms on each mount — triggers CSS transitions. */
function useIn(delay = 40) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => { clearTimeout(t); setActive(false); };
  }, []);
  return active;
}

export default function ColdOpen({ step }: Props) {
  return (
    <div className="co-root">
      {step === 0 && <StepQuestion />}
      {step === 1 && <StepBrands />}
      {step === 2 && <StepMissing />}
      {step === 3 && <StepPunchline />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * Step 0 — 悬念大问句
 * ───────────────────────────────────────────────────────────────── */
function StepQuestion() {
  const active = useIn();
  return (
    <div className="co-s0 scene-pad center">
      <div className="co-s0-inner">
        <div className={`co-s0-rule rule-grow ${active ? "in" : ""}`} />
        <p className="co-s0-kicker kicker">深度报道 · 2024</p>
        <h1 className={`co-s0-headline mask-reveal ${active ? "in" : ""}`}>
          你有没有发现<br />一件很奇怪的事？
        </h1>
        <div className={`co-s0-rule rule-grow ${active ? "in" : ""}`} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * Step 1 — 品牌阵容
 * ───────────────────────────────────────────────────────────────── */
const BRANDS = [
  { name: "ChatGPT",   company: "OpenAI",    origin: "美" },
  { name: "DeepSeek",  company: "深度求索",   origin: "中" },
  { name: "Gemini",    company: "Google",    origin: "美" },
  { name: "Claude",    company: "Anthropic", origin: "美" },
] as const;

function StepBrands() {
  const active = useIn();
  return (
    <div className="co-s1 scene-pad">
      <p className="co-s1-label kicker">你每天用的 AI</p>
      <div className="co-s1-list">
        {BRANDS.map((b, i) => (
          <div key={b.name}>
            <div className="rule" />
            <div
              className={`co-s1-row ${active ? "is-in" : ""}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <span className="co-s1-name">{b.name}</span>
              <span className="co-s1-company">{b.company}</span>
              <span className="co-s1-origin">{b.origin}</span>
            </div>
          </div>
        ))}
        <div className="rule" />
      </div>
      <p className={`co-s1-footer mask-reveal ${active ? "in" : ""}`}>
        全都来自同一个地方：<strong>中美两国</strong>
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * Step 2 — 国家问号
 * ───────────────────────────────────────────────────────────────── */
const MISSING = ["日本", "德国", "法国", "韩国"] as const;

function StepMissing() {
  const active = useIn();
  return (
    <div className="co-s2 scene-pad">
      <p className="co-s2-kicker kicker">那么……这些国家呢？</p>
      <div className="co-s2-grid">
        {MISSING.map((country, i) => (
          <div
            key={country}
            className={`co-s2-cell ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 110}ms` }}
          >
            <span className="co-s2-country">{country}</span>
            <span className="co-s2-qmark">?</span>
          </div>
        ))}
      </div>
      <p className={`co-s2-sub ${active ? "is-in" : ""}`}>
        这些老牌工业强国，科技巨头一堆，去哪了？
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * Step 3 — 金句 pull-quote
 * ───────────────────────────────────────────────────────────────── */
function StepPunchline() {
  const active = useIn();
  return (
    <div className="co-s3 scene-pad">
      <div className={`co-s3-rule rule-grow ${active ? "in" : ""}`} />
      <div className="co-s3-body">
        <span className="co-s3-openquote">"</span>
        <blockquote className={`co-s3-quote mask-reveal ${active ? "in" : ""}`}>
          大模型这场游戏，<br />
          从一开始就没给<br />
          其他国家发入场券。
        </blockquote>
      </div>
      <div className={`co-s3-rule rule-grow ${active ? "in" : ""}`} />
      <p className={`co-s3-attr ${active ? "is-in" : ""}`}>
        —— 多位 AI 投资人与研究者的共识
      </p>
    </div>
  );
}
