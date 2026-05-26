import { useEffect, useState } from "react";
import "./GpuWall.css";

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

export default function GpuWall({ step }: Props) {
  return (
    <div className="gw-root">
      {step === 0 && <StepAnchor />}
      {step === 1 && <StepManufacturers />}
      {step === 2 && <StepDistribution />}
      {step === 3 && <StepImpact />}
    </div>
  );
}

/* ─── step 0: 章节锚 + 成本阶梯 ─── */
const TIERS = [
  { label: "GPT-3.5",  cost: "数千张 H100",   bar: 30 },
  { label: "GPT-4",    cost: "数万张 H100",   bar: 65 },
  { label: "下一代",   cost: "> 10 亿美元 / 次", bar: 100 },
] as const;

function StepAnchor() {
  const active = useIn();
  return (
    <div className="gw-s0 scene-pad">
      <p className="gw-label kicker">第一道墙</p>
      <h2 className="gw-wall-title">算力 = 入场券</h2>
      <div className="rule" style={{ margin: "24px 0 32px" }} />
      <p className="gw-sub">训练一个前沿大模型，需要多少 GPU？</p>
      <div className="gw-tiers">
        {TIERS.map((t, i) => (
          <div
            key={t.label}
            className={`gw-tier ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 160}ms` }}
          >
            <span className="gw-tier-name">{t.label}</span>
            <span className="gw-tier-cost">{t.cost}</span>
            <div className="gw-tier-bar-wrap">
              <div
                className={`gw-tier-bar ${active ? "is-in" : ""}`}
                style={{ "--bar-w": `${t.bar}%`, animationDelay: `${i * 160 + 100}ms` } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── step 1: 制造商寡头 ─── */
function StepManufacturers() {
  const active = useIn();
  return (
    <div className="gw-s1 scene-pad">
      <p className="gw-label kicker">全球高端 AI 训练芯片制造商</p>
      <div className={`gw-mfr-wrap ${active ? "is-in" : ""}`}>
        <div className="gw-mfr-count hero-num">2</div>
        <p className="gw-mfr-sub">家公司垄断全球 AI 训练芯片</p>
      </div>
      <div className="gw-mfr-list">
        {[
          { name: "NVIDIA", product: "H100 / H200", share: "~80%", note: "事实上的行业标准" },
          { name: "AMD",    product: "MI300X",       share: "~15%", note: "追赶中" },
        ].map((m, i) => (
          <div key={m.name}>
            <div className="rule" />
            <div
              className={`gw-mfr-row ${active ? "is-in" : ""}`}
              style={{ animationDelay: `${i * 200 + 300}ms` }}
            >
              <span className="gw-mfr-name">{m.name}</span>
              <span className="gw-mfr-product">{m.product}</span>
              <span className="gw-mfr-share">{m.share}</span>
              <span className="gw-mfr-note">{m.note}</span>
            </div>
          </div>
        ))}
        <div className="rule" />
      </div>
      <p className={`gw-mfr-footer ${active ? "is-in" : ""}`}>
        英伟达 H100 几乎垄断了全球 AI 训练市场
      </p>
    </div>
  );
}

/* ─── step 2: H100 全球分配 ─── */
const REGIONS = [
  { name: "美国",   pct: 70, note: "微软 · 亚马逊 · 谷歌 · Meta", accent: true },
  { name: "中国",   pct: 20, note: "华为昇腾 + 英伟达中国特供版",  accent: false },
  { name: "其他全部", pct: 10, note: "法国 + 德国 + 日本 + 韩国 + ……", accent: false },
] as const;

function StepDistribution() {
  const active = useIn();
  return (
    <div className="gw-s2 scene-pad">
      <p className="gw-label kicker">H100 等效算力全球分配</p>
      <div className="gw-dist-list">
        {REGIONS.map((r, i) => (
          <div key={r.name} className="gw-dist-row">
            <div className="gw-dist-meta">
              <span className={`gw-dist-region ${r.accent ? "gw-dist-accent" : ""}`}>{r.name}</span>
              <span className="gw-dist-pct hero-num">{r.pct}%</span>
            </div>
            <div className="gw-dist-track">
              <div
                className={`gw-dist-bar ${r.accent ? "gw-dist-bar-accent" : ""} ${active ? "is-in" : ""}`}
                style={{ "--bar-w": `${r.pct}%`, transitionDelay: `${i * 200 + 100}ms` } as React.CSSProperties}
              />
            </div>
            <p className="gw-dist-note">{r.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── step 3: 冲击对比 + GPU 编辑插图 ─── */
function StepImpact() {
  const active = useIn();
  return (
    <div className="gw-s3 scene-pad">
      <div className="gw-s3-split">
        <div className="gw-s3-left">
          <p className="gw-label kicker">这意味着什么？</p>
          <div className="gw-s3-compare">
            <div className={`gw-s3-card gw-s3-card-a ${active ? "is-in" : ""}`}>
              <span className="gw-s3-card-label">欧洲所有 AI 公司</span>
              <span className="gw-s3-card-value">1 年</span>
            </div>
            <div className="gw-s3-vs">vs</div>
            <div className={`gw-s3-card gw-s3-card-b ${active ? "is-in" : ""}`} style={{ animationDelay: "200ms" }}>
              <span className="gw-s3-card-label">OpenAI</span>
              <span className="gw-s3-card-value">1 个月</span>
            </div>
          </div>
          <p className={`gw-s3-verdict mask-reveal ${active ? "in" : ""}`}>
            没有算力，就没有大模型。
          </p>
        </div>
        <div className={`gw-s3-right ${active ? "is-in" : ""}`}>
          <img
            src="/images/gpu-chip.png"
            alt="NVIDIA H100 GPU 芯片图示"
            className="gw-s3-img"
          />
          <p className="gw-s3-caption">NVIDIA H100 · 全球 AI 算力核心</p>
        </div>
      </div>
    </div>
  );
}
