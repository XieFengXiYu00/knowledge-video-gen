import { useEffect, useState } from "react";
import "./CapitalTalent.css";

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

export default function CapitalTalent({ step }: Props) {
  return (
    <div className="ct-root">
      {step === 0 && <StepCostAnchor />}
      {step === 1 && <StepFunding />}
      {step === 2 && <StepVcGap />}
      {step === 3 && <StepPapers />}
      {step === 4 && <StepFlow />}
    </div>
  );
}

/* ─── step 0: 训练成本锚 ─── */
function StepCostAnchor() {
  const active = useIn();
  return (
    <div className="ct-s0 scene-pad">
      <p className="ct-label kicker">第三道墙 · 资本</p>
      <div className="ct-s0-split">
        <div>
          <p className="ct-s0-intro">训练一个 GPT-4 级别的模型，需要多少钱？</p>
          <div className="rule" style={{ margin: "20px 0 24px" }} />
          <div className="ct-s0-costs">
            {[
              { item: "硬件成本（GPU）", cost: "5~10 亿美元" },
              { item: "电费 + 冷却", cost: "数千万美元" },
              { item: "人力 + 数据标注", cost: "数亿美元" },
            ].map((c, i) => (
              <div
                key={c.item}
                className={`ct-s0-row ${active ? "is-in" : ""}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="ct-s0-item">{c.item}</span>
                <span className="ct-s0-cost">{c.cost}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ct-s0-total">
          <p className="ct-label kicker">总计</p>
          <div className={`ct-s0-total-num ${active ? "is-in" : ""}`}>
            <span className="ct-gt">&gt;</span>
            <span className="hero-num ct-big">10</span>
            <span className="ct-unit">亿美元</span>
          </div>
          <p className="ct-s0-sub">一次训练运行的成本</p>
        </div>
      </div>
    </div>
  );
}

/* ─── step 1: 融资对比 ─── */
const FUNDING = [
  { name: "OpenAI",    amount: 120, label: ">120 亿美元", barPct: 100 },
  { name: "Anthropic", amount:  70, label: ">70 亿美元",  barPct: 58 },
  { name: "Google\nGemini", amount: 300, label: "数百亿美元",  barPct: 95 },
  { name: "中国三大厂各", amount: 50, label: "各数百亿人民币", barPct: 42 },
] as const;

function StepFunding() {
  const active = useIn();
  return (
    <div className="ct-s1 scene-pad">
      <p className="ct-label kicker">顶级玩家融资 / 投入规模</p>
      <div className="ct-fund-list">
        {FUNDING.map((f, i) => (
          <div key={f.name} className="ct-fund-row">
            <div className="rule" />
            <div
              className={`ct-fund-content ${active ? "is-in" : ""}`}
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <span className="ct-fund-name">{f.name}</span>
              <span className="ct-fund-amount">{f.label}</span>
              <div className="ct-fund-track">
                <div
                  className={`ct-fund-bar ${active ? "is-in" : ""}`}
                  style={{ "--bar-w": `${f.barPct}%`, transitionDelay: `${i * 130 + 200}ms` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="rule" />
      </div>
    </div>
  );
}

/* ─── step 2: 欧洲 VC 差距 ─── */
function StepVcGap() {
  const active = useIn();
  return (
    <div className="ct-s2 scene-pad center">
      <div className="ct-s2-inner">
        <p className="ct-label kicker">欧洲 VC 规模 vs 美国顶级 VC</p>
        <div className="ct-s2-compare">
          <div className={`ct-s2-block ct-s2-us ${active ? "is-in" : ""}`}>
            <span className="ct-s2-tag">美国顶级 VC</span>
            <span className="ct-s2-scale">10x</span>
          </div>
          <div className={`ct-s2-block ct-s2-eu ${active ? "is-in" : ""}`} style={{ animationDelay: "200ms" }}>
            <span className="ct-s2-tag">欧洲最大 VC</span>
            <span className="ct-s2-scale">1x</span>
          </div>
        </div>
        <p className={`ct-s2-verdict mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "500ms" }}>
          全球能承受烧 10 亿美元还不知道怎么赚钱的玩家，屈指可数。
        </p>
      </div>
    </div>
  );
}

/* ─── step 3: 论文作者分布 ─── */
const PAPERS = [
  { region: "美国",  pct: 60, accent: true },
  { region: "中国",  pct: 20, accent: false },
  { region: "欧洲",  pct: 10, accent: false },
  { region: "日韩",  pct: 5,  accent: false },
  { region: "其他",  pct: 5,  accent: false },
] as const;

function StepPapers() {
  const active = useIn();
  return (
    <div className="ct-s3 scene-pad">
      <p className="ct-label kicker">第四道墙 · 人才 · AI 顶会（NeurIPS / ICML / ICLR）一作分布</p>
      <div className="ct-paper-chart">
        {PAPERS.map((p, i) => (
          <div key={p.region} className="ct-paper-col">
            <div className="ct-paper-track">
              <div
                className={`ct-paper-bar ${p.accent ? "ct-paper-accent" : ""} ${active ? "is-in" : ""}`}
                style={{ "--bar-h": `${p.pct * 1.5}%`, transitionDelay: `${i * 120 + 100}ms` } as React.CSSProperties}
              />
            </div>
            <span className={`ct-paper-pct ${p.accent ? "ct-paper-accent-text" : ""}`}>{p.pct}%</span>
            <span className="ct-paper-region">{p.region}</span>
          </div>
        ))}
      </div>
      <p className={`ct-s3-note ${active ? "is-in" : ""}`}>
        超过 80% 的顶会论文来自中美两国机构
      </p>
    </div>
  );
}

/* ─── step 4: 人才流向 ─── */
const FLOWS = [
  { from: "欧洲 AI 博士", to: "硅谷" },
  { from: "日韩 AI 研究员", to: "美国科技公司" },
] as const;

function StepFlow() {
  const active = useIn();
  return (
    <div className="ct-s4 scene-pad">
      <p className="ct-label kicker">人才流向</p>
      <div className="ct-flow-list">
        {FLOWS.map((f, i) => (
          <div
            key={f.from}
            className={`ct-flow-row ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <span className="ct-flow-from">{f.from}</span>
            <div className="ct-flow-arrow">
              <div className="ct-flow-line" />
              <span className="ct-flow-arrowhead">→</span>
            </div>
            <span className="ct-flow-to">{f.to}</span>
          </div>
        ))}
      </div>
      <div className={`ct-s4-rule rule-grow ${active ? "in" : ""}`} style={{ margin: "40px 0 28px", transitionDelay: "500ms" }} />
      <p className={`ct-s4-verdict mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "700ms" }}>
        这不是欧洲大学不行，是资本密度决定了人才流向。
      </p>
    </div>
  );
}
