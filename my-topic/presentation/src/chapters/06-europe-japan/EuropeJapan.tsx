import { useEffect, useState } from "react";
import "./EuropeJapan.css";

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

export default function EuropeJapan({ step }: Props) {
  return (
    <div className="ej-root">
      {step === 0 && <StepEuropeIntro />}
      {step === 1 && <StepRegulations />}
      {step === 2 && <StepMistral />}
      {step === 3 && <StepJapanKorea />}
      {step === 4 && <StepJKStrategy />}
    </div>
  );
}

/* ─── step 0: 欧洲 ── 带着镣铐跳舞 ─── */
function StepEuropeIntro() {
  const active = useIn();
  return (
    <div className="ej-s0 scene-pad center">
      <div className="ej-s0-inner">
        <p className="ej-label kicker">欧洲的困境</p>
        <div className="ej-s0-balance">
          <div className={`ej-s0-side ej-s0-innovation ${active ? "is-in" : ""}`}>
            <span className="ej-s0-icon">⚡</span>
            <span className="ej-s0-title">AI 创新</span>
            <span className="ej-s0-desc">人才 · 资金 · 技术意志</span>
          </div>
          <div className={`ej-s0-vs ${active ? "is-in" : ""}`}>
            <span className="ej-s0-vs-text">vs</span>
          </div>
          <div className={`ej-s0-side ej-s0-regulation ${active ? "is-in" : ""}`} style={{ animationDelay: "150ms" }}>
            <span className="ej-s0-icon">⚖️</span>
            <span className="ej-s0-title">监管重压</span>
            <span className="ej-s0-desc">GDPR · AI Act · 数据主权</span>
          </div>
        </div>
        <p className={`ej-s0-quote mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "400ms" }}>
          带着镣铐跳舞
        </p>
      </div>
    </div>
  );
}

/* ─── step 1: GDPR + AI Act ─── */
const REGS = [
  {
    name: "GDPR",
    year: "2018",
    scope: "全球最严数据隐私法",
    impact: "对 AI 训练数据的获取和使用设了重重限制",
  },
  {
    name: "AI Act",
    year: "2024",
    scope: "全球第一个全面监管 AI 的法律",
    impact: "对高风险 AI 系统设置了严格准入门槛",
  },
] as const;

function StepRegulations() {
  const active = useIn();
  return (
    <div className="ej-s1 scene-pad">
      <p className="ej-label kicker">欧洲监管体系</p>
      <div className="ej-reg-list">
        {REGS.map((r, i) => (
          <div
            key={r.name}
            className={`ej-reg-card ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="ej-reg-header">
              <span className="ej-reg-name">{r.name}</span>
              <span className="ej-reg-year">{r.year}</span>
            </div>
            <div className="rule" style={{ margin: "12px 0" }} />
            <p className="ej-reg-scope">{r.scope}</p>
            <p className="ej-reg-impact">{r.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── step 2: Mistral ─── */
function StepMistral() {
  const active = useIn();
  return (
    <div className="ej-s2 scene-pad">
      <p className="ej-label kicker">欧洲的倔强代表</p>
      <div className="ej-s2-split">
        <div>
          <div className="ej-s2-header">
            <span className="ej-s2-company">Mistral AI</span>
            <span className="ej-s2-flag">🇫🇷 法国</span>
          </div>
          <div className="rule" style={{ margin: "20px 0 24px" }} />
          <div className="ej-s2-facts">
            {[
              { k: "成立", v: "2023 年" },
              { k: "融资", v: "~4 亿欧元" },
              { k: "创始团队", v: "Google DeepMind + Meta" },
            ].map((f, i) => (
              <div
                key={f.k}
                className={`ej-s2-fact ${active ? "is-in" : ""}`}
                style={{ animationDelay: `${i * 140}ms` }}
              >
                <span className="ej-s2-fact-k">{f.k}</span>
                <span className="ej-s2-fact-v">{f.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`ej-s2-verdict-wrap ${active ? "is-in" : ""}`}>
          <p className="ej-s2-verdict-label kicker">与 GPT-4 差距</p>
          <p className="ej-s2-verdict">差了一个身位</p>
          <div className="rule" style={{ margin: "24px 0" }} />
          <p className="ej-s2-soil">欧洲不是没有 AI，<br />只是土壤太贫瘠了。</p>
        </div>
      </div>
    </div>
  );
}

/* ─── step 3: 日韩困境 ─── */
function StepJapanKorea() {
  const active = useIn();
  return (
    <div className="ej-s3 scene-pad center">
      <div className="ej-s3-inner">
        <p className="ej-label kicker">日本 · 韩国</p>
        <h2 className={`ej-s3-headline mask-reveal ${active ? "in" : ""}`}>
          有好厨子，但没食材。
        </h2>
        <div className="ej-s3-issues">
          {[
            { icon: "💾", issue: "芯片不匹配", detail: "三星 + 台积电做存储芯片，不是 AI 训练芯片" },
            { icon: "✈️", issue: "人才外流",   detail: "最好的 AI 研究员大量被硅谷挖走" },
          ].map((item, i) => (
            <div
              key={item.issue}
              className={`ej-s3-issue ${active ? "is-in" : ""}`}
              style={{ animationDelay: `${i * 200 + 400}ms` }}
            >
              <div className="rule" />
              <div className="ej-s3-issue-content">
                <span className="ej-s3-issue-title">{item.issue}</span>
                <span className="ej-s3-issue-detail">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── step 4: 日韩策略 ─── */
function StepJKStrategy() {
  const active = useIn();
  return (
    <div className="ej-s4 scene-pad center">
      <div className="ej-s4-inner">
        <div className={`ej-s4-rule rule-grow ${active ? "in" : ""}`} />
        <div className="ej-s4-content">
          <p className={`ej-s4-strategy mask-reveal ${active ? "in" : ""}`}>
            用美国模型，做本地化应用。
          </p>
          <p className={`ej-s4-note ${active ? "is-in" : ""}`}>
            这不是失败，是务实的选择。
          </p>
        </div>
        <div className={`ej-s4-rule rule-grow ${active ? "in" : ""}`} style={{ transitionDelay: "300ms" }} />
        <p className={`ej-s4-warning mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "600ms" }}>
          没有基础模型能力，AI 时代就永远是二流玩家。
        </p>
      </div>
    </div>
  );
}
