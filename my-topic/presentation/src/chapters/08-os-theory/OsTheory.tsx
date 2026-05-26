import { useEffect, useState } from "react";
import "./OsTheory.css";

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

export default function OsTheory({ step }: Props) {
  return (
    <div className="ot-root">
      {step === 0 && <StepOsAnalogy />}
      {step === 1 && <StepRepeat />}
      {step === 2 && <StepForecast />}
      {step === 3 && <StepFlywheels />}
    </div>
  );
}

/* ─── step 0: 操作系统类比 ─── */
const OS_EXAMPLES = [
  { platform: "PC", winners: ["Windows", "macOS", "Linux"], count: "3 个" },
  { platform: "手机", winners: ["Android", "iOS"],          count: "2 个" },
] as const;

function StepOsAnalogy() {
  const active = useIn();
  return (
    <div className="ot-s0 scene-pad">
      <p className="ot-label kicker">操作系统的历史规律</p>
      <div className="ot-s0-examples">
        {OS_EXAMPLES.map((ex, i) => (
          <div
            key={ex.platform}
            className={`ot-s0-platform ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="ot-s0-plat-header">
              <span className="ot-s0-plat-name">{ex.platform} 市场</span>
              <span className="ot-s0-plat-count">{ex.count}</span>
            </div>
            <div className="rule" style={{ margin: "12px 0" }} />
            <div className="ot-s0-winners">
              {ex.winners.map((w) => (
                <span key={w} className="ot-s0-winner">{w}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className={`ot-s0-pattern mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "500ms" }}>
        历史终局：每个平台只有 2~3 个主流选择。
      </p>
    </div>
  );
}

/* ─── step 1: 大模型重演 ─── */
function StepRepeat() {
  const active = useIn();
  return (
    <div className="ot-s1 scene-pad center">
      <div className="ot-s1-inner">
        <div className="ot-s1-arrow-wrap">
          <div className={`ot-s1-from ${active ? "is-in" : ""}`}>
            <span className="ot-s1-label-sm kicker">操作系统</span>
            <span className="ot-s1-text">Windows / macOS<br />Android / iOS</span>
          </div>
          <div className={`ot-s1-arrow ${active ? "is-in" : ""}`}>
            <div className="ot-s1-arrow-line" />
            <span className="ot-s1-arrow-head">→</span>
          </div>
          <div className={`ot-s1-to ${active ? "is-in" : ""}`} style={{ animationDelay: "300ms" }}>
            <span className="ot-s1-label-sm kicker">大模型时代</span>
            <span className="ot-s1-text ot-s1-text-accent">正在重演<br />同样的故事</span>
          </div>
        </div>
        <p className={`ot-s1-sub ${active ? "is-in" : ""}`} style={{ transitionDelay: "600ms" }}>
          格局正在收拢，最终玩家屈指可数
        </p>
      </div>
    </div>
  );
}

/* ─── step 2: 终局预判 ─── */
const FORECAST = [
  { region: "美国",   players: "OpenAI · Google · Anthropic", count: "1~2 家", tier: "leading" },
  { region: "中国",   players: "百度 · 阿里 · 字节 · DeepSeek",count: "1~2 家", tier: "leading" },
  { region: "欧洲",   players: "Mistral 或其他",               count: "1 家",  tier: "niche" },
  { region: "其他地区",players: "使用现成模型",                  count: "应用层", tier: "consumer" },
] as const;

function StepForecast() {
  const active = useIn();
  return (
    <div className="ot-s2 scene-pad">
      <p className="ot-label kicker">终局格局预判</p>
      <div className="ot-s2-grid">
        {FORECAST.map((f, i) => (
          <div
            key={f.region}
            className={`ot-s2-cell ot-s2-${f.tier} ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <span className="ot-s2-region">{f.region}</span>
            <span className="ot-s2-count">{f.count}</span>
            <div className="rule" style={{ margin: "8px 0" }} />
            <span className="ot-s2-players">{f.players}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── step 3: 三大飞轮 ─── */
const FLYWHEELS = [
  { name: "规模效应", desc: "模型越大 · 能力越强 · 用户越多" },
  { name: "网络效应", desc: "数据越多 · 模型越好 · 吸引更多数据" },
  { name: "资本密度", desc: "收入越高 · 融资越多 · 算力越强" },
] as const;

function StepFlywheels() {
  const active = useIn();
  return (
    <div className="ot-s3 scene-pad">
      <p className="ot-label kicker">格局集中的三个飞轮</p>
      <div className="ot-s3-list">
        {FLYWHEELS.map((f, i) => (
          <div key={f.name}>
            <div className="rule" />
            <div
              className={`ot-s3-row ${active ? "is-in" : ""}`}
              style={{ animationDelay: `${i * 180}ms` }}
            >
              <span className="ot-s3-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ot-s3-name">{f.name}</span>
              <span className="ot-s3-desc">{f.desc}</span>
              <div className="ot-s3-spin">↻</div>
            </div>
          </div>
        ))}
        <div className="rule" />
      </div>
      <p className={`ot-s3-verdict mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "700ms" }}>
        这三个飞轮同时转动，格局只会越来越集中。
      </p>
    </div>
  );
}
