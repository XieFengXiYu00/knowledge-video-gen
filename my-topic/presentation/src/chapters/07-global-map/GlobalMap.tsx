import { useEffect, useState } from "react";
import "./GlobalMap.css";

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

export default function GlobalMap({ step }: Props) {
  return (
    <div className="gm-root">
      {step === 0 && <StepTitle />}
      {step === 1 && <StepSidesApps />}
      {step === 2 && <StepSovereign />}
      {step === 3 && <StepCompliance />}
      {step === 4 && <StepConclusion />}
    </div>
  );
}

/* ─── step 0: 标题 ─── */
function StepTitle() {
  const active = useIn();
  return (
    <div className="gm-s0 scene-pad center">
      <div className="gm-s0-inner">
        <p className="gm-label kicker">其他国家的生存策略</p>
        <h2 className={`gm-s0-num hero-num ${active ? "is-in" : ""}`}>5</h2>
        <p className={`gm-s0-sub mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "200ms" }}>
          种不同的选择
        </p>
        <div className={`gm-s0-rule rule-grow ${active ? "in" : ""}`} style={{ transitionDelay: "400ms" }} />
      </div>
    </div>
  );
}

/* ─── step 1: 选边站 + 垂直应用 ─── */
function StepSidesApps() {
  const active = useIn();
  return (
    <div className="gm-s1 scene-pad">
      <p className="gm-label kicker">策略一 + 二</p>
      <div className="gm-cards-row">
        {[
          {
            num: "01",
            type: "选边站派",
            reps: "欧洲 · 日韩",
            desc: "用中美的大模型，做本地化应用和合规落地",
          },
          {
            num: "02",
            type: "垂直应用派",
            reps: "东南亚 · 中东",
            desc: "基于中美模型，做行业垂直应用（医疗 / 法律 / 金融）",
          },
        ].map((c, i) => (
          <div
            key={c.num}
            className={`gm-strategy-card ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <span className="gm-card-num">{c.num}</span>
            <div className="rule" style={{ margin: "16px 0" }} />
            <span className="gm-card-type">{c.type}</span>
            <span className="gm-card-reps">{c.reps}</span>
            <p className="gm-card-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── step 2: 主权 AI ─── */
function StepSovereign() {
  const active = useIn();
  return (
    <div className="gm-s2 scene-pad center">
      <div className="gm-s2-inner">
        <p className="gm-label kicker">策略三</p>
        <div
          className={`gm-strategy-card gm-s2-card ${active ? "is-in" : ""}`}
        >
          <span className="gm-card-num">03</span>
          <div className="rule" style={{ margin: "16px 0" }} />
          <span className="gm-card-type">主权 AI 派</span>
          <span className="gm-card-reps">阿联酋 · 沙特阿拉伯</span>
          <p className="gm-card-desc">主权基金大规模投资，引入他国技术建立本地 AI 能力</p>
          <div className="rule" style={{ margin: "16px 0" }} />
          <p className={`gm-s2-example ${active ? "is-in" : ""}`} style={{ transitionDelay: "400ms" }}>
            代表案例：阿联酋 Falcon 系列模型（Technology Innovation Institute）
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── step 3: 合规 AI ─── */
function StepCompliance() {
  const active = useIn();
  return (
    <div className="gm-s3 scene-pad center">
      <div className="gm-s3-inner">
        <p className="gm-label kicker">策略四 · 欧洲的隐藏优势</p>
        <div
          className={`gm-strategy-card gm-s3-card ${active ? "is-in" : ""}`}
        >
          <span className="gm-card-num">04</span>
          <div className="rule" style={{ margin: "16px 0" }} />
          <span className="gm-card-type">合规 AI 派</span>
          <span className="gm-card-reps">欧洲</span>
          <p className="gm-card-desc">深耕 AI 伦理、合规、监管标准，成为全球规则制定者</p>
          <div className="rule" style={{ margin: "16px 0" }} />
          <p className={`gm-s3-note ${active ? "is-in" : ""}`} style={{ transitionDelay: "400ms" }}>
            GDPR 已成为全球数据保护参考标准。<br />AI Act 正在成为全球 AI 监管蓝图。
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── step 4: 结论 ─── */
function StepConclusion() {
  const active = useIn();
  return (
    <div className="gm-s4 scene-pad center">
      <div className="gm-s4-inner">
        <div className={`gm-s4-rule rule-grow ${active ? "in" : ""}`} />
        <div className="gm-s4-two-lines">
          <p className={`gm-s4-ok mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "100ms" }}>
            不做基础模型 ≠ 被淘汰
          </p>
          <p className={`gm-s4-but ${active ? "is-in" : ""}`} style={{ transitionDelay: "400ms" }}>
            但没有基础模型能力 = 没有 AI 时代的话语权
          </p>
        </div>
        <div className={`gm-s4-rule rule-grow ${active ? "in" : ""}`} style={{ transitionDelay: "300ms" }} />
      </div>
    </div>
  );
}
