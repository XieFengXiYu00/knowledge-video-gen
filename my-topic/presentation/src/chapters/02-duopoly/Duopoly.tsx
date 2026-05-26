import { useEffect, useState } from "react";
import "./Duopoly.css";

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

export default function Duopoly({ step }: Props) {
  return (
    <div className="dp-root">
      {step === 0 && <StepDominance />}
      {step === 1 && <StepMistral />}
      {step === 2 && <StepJapanKorea />}
      {step === 3 && <StepConclusion />}
    </div>
  );
}

/* ─── step 0: >95% 支配数据 ─── */
function StepDominance() {
  const active = useIn();
  return (
    <div className="dp-s0 scene-pad">
      <p className="dp-label kicker">全球前沿大模型分布 · 2024</p>
      <div className="dp-hero-row">
        <span className="dp-big-num hero-num">95</span>
        <span className="dp-pct-sign">%</span>
      </div>
      <p className="dp-hero-sub">中美两国占全球前沿大模型（GPT-4 级别以上）</p>
      <div className="dp-bar-track">
        <div className="dp-bar-cn-us" />
        <div className={`dp-bar-fill ${active ? "is-in" : ""}`} />
        <div className="dp-bar-rest" />
      </div>
      <div className="dp-bar-labels">
        <span className="dp-bar-label-cn">中国 + 美国</span>
        <span className="dp-bar-label-rest">其他全部</span>
      </div>
      <p className={`dp-context ${active ? "is-in" : ""}`}>
        全球共 &gt;1000 个大模型，真正有前沿能力的不超过 50 个
      </p>
    </div>
  );
}

/* ─── step 1: Mistral 档案卡 ─── */
const mistralFacts = [
  { label: "成立时间", value: "2023 年" },
  { label: "融资规模", value: "~4 亿欧元" },
  { label: "创始人背景", value: "Google DeepMind + Meta" },
  { label: "模型能力", value: "差 GPT-4 至少一个身位" },
] as const;

function StepMistral() {
  const active = useIn();
  return (
    <div className="dp-s1 scene-pad">
      <div className="dp-s1-split">
        <div className="dp-s1-left">
          <p className="dp-label kicker">欧洲代表</p>
          <div className="dp-s1-name-row">
            <span className="dp-s1-company serif-cn">Mistral AI</span>
            <span className="dp-s1-country">法国</span>
          </div>
          <div className="rule" style={{ margin: "20px 0" }} />
          <div className="dp-s1-facts">
            {mistralFacts.map((f, i) => (
              <div
                key={f.label}
                className={`dp-s1-fact ${active ? "is-in" : ""}`}
                style={{ animationDelay: `${i * 130}ms` }}
              >
                <span className="dp-s1-fact-label">{f.label}</span>
                <span className="dp-s1-fact-value">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dp-s1-right">
          <p className="dp-label kicker">与 GPT-4 的差距</p>
          <div className={`dp-s1-gap-vis ${active ? "is-in" : ""}`}>
            <div className="dp-s1-gap-bar dp-s1-bar-gpt4">
              <span className="dp-s1-bar-label">GPT-4</span>
            </div>
            <div className="dp-s1-gap-bar dp-s1-bar-mistral">
              <span className="dp-s1-bar-label">Mistral</span>
            </div>
          </div>
          <p className="dp-s1-verdict">差了至少一到两个身位</p>
        </div>
      </div>
    </div>
  );
}

/* ─── step 2: 日韩参数对比 ─── */
const players = [
  { name: "Rinna",   country: "日本", params: "百亿", maker: "Microsoft Japan", pct: 8 },
  { name: "Fugaku",  country: "日本", params: "百亿", maker: "富士通 / 理研",     pct: 8 },
  { name: "Samsung", country: "韩国", params: "垂直",  maker: "三星电子",         pct: 6 },
  { name: "Naver",   country: "韩国", params: "垂直",  maker: "Naver Corp",      pct: 6 },
  { name: "GPT-4",   country: "美国", params: "万亿+", maker: "OpenAI",          pct: 95 },
] as const;

function StepJapanKorea() {
  const active = useIn();
  return (
    <div className="dp-s2 scene-pad">
      <p className="dp-label kicker">参数规模对比</p>
      <div className="dp-s2-list">
        {players.map((p, i) => (
          <div key={p.name} className="dp-s2-row">
            <div className="rule" />
            <div
              className={`dp-s2-content ${active ? "is-in" : ""}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="dp-s2-name">{p.name}</span>
              <span className="dp-s2-maker">{p.maker}</span>
              <span className={`dp-s2-params ${p.name === "GPT-4" ? "dp-s2-highlight" : ""}`}>{p.params}</span>
              <div className="dp-s2-bar-wrap">
                <div
                  className={`dp-s2-bar ${active ? "is-in" : ""} ${p.name === "GPT-4" ? "dp-s2-bar-accent" : ""}`}
                  style={{ "--bar-target": `${p.pct}%`, animationDelay: `${i * 100 + 200}ms` } as React.CSSProperties}
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

/* ─── step 3: 结论 ─── */
function StepConclusion() {
  const active = useIn();
  return (
    <div className="dp-s3 scene-pad center">
      <div className="dp-s3-inner">
        <div className={`dp-s3-rule rule-grow ${active ? "in" : ""}`} />
        <p className="dp-s3-pre kicker">这不是态度问题</p>
        <h2 className={`dp-s3-headline mask-reveal ${active ? "in" : ""}`}>
          从一开始<br />就没有解题空间。
        </h2>
        <div className={`dp-s3-rule rule-grow ${active ? "in" : ""}`} />
      </div>
    </div>
  );
}
