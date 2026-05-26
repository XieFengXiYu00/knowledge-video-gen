import { useEffect, useState } from "react";
import "./Takeaway.css";

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

export default function Takeaway({ step }: Props) {
  return (
    <div className="tw-root">
      {step === 0 && <StepSlogan />}
      {step === 1 && <StepAppLayer />}
      {step === 2 && <StepDiff />}
      {step === 3 && <StepFive />}
      {step === 4 && <StepClosure />}
    </div>
  );
}

/* ─── step 0: 核心金句 ─── */
function StepSlogan() {
  const active = useIn();
  return (
    <div className="tw-s0 scene-pad center">
      <div className="tw-s0-inner">
        <div className={`tw-s0-rule rule-grow ${active ? "in" : ""}`} />
        <p className="tw-s0-pre kicker" style={{ textAlign: "center", margin: "0 0 12px" }}>对普通人来说</p>
        <h1 className={`tw-s0-slogan mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "100ms" }}>
          别想造操作系统，
        </h1>
        <h1 className={`tw-s0-slogan tw-s0-slogan-accent mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "500ms" }}>
          去开发 APP。
        </h1>
        <div className={`tw-s0-rule rule-grow ${active ? "in" : ""}`} style={{ transitionDelay: "300ms" }} />
      </div>
    </div>
  );
}

/* ─── step 1: 应用层 ─── */
const APP_DOMAINS = ["医疗 AI", "法律 AI", "金融 AI", "教育 AI"] as const;

function StepAppLayer() {
  const active = useIn();
  return (
    <div className="tw-s1 scene-pad">
      <p className="tw-label kicker">建议一 · 做应用层</p>
      <p className={`tw-s1-headline mask-reveal ${active ? "in" : ""}`}>
        基于中美的大模型，做垂直行业应用。
      </p>
      <div className="tw-s1-domains">
        {APP_DOMAINS.map((d, i) => (
          <div
            key={d}
            className={`tw-s1-domain ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 130 + 300}ms` }}
          >
            {d}
          </div>
        ))}
      </div>
      <p className={`tw-s1-note ${active ? "is-in" : ""}`} style={{ transitionDelay: "900ms" }}>
        每一个垂直领域，都是一个独立的机会
      </p>
    </div>
  );
}

/* ─── step 2: 差异化 + 合规 ─── */
function StepDiff() {
  const active = useIn();
  return (
    <div className="tw-s2 scene-pad">
      <p className="tw-label kicker">建议二 + 三</p>
      <div className="tw-s2-cards">
        {[
          {
            num: "02",
            title: "做差异化",
            body: "不做基础模型，但在某个细分领域做到极致。卖水人比淘金者赚得更稳。",
          },
          {
            num: "03",
            title: "深耕合规",
            body: "如果你在欧洲，AI 合规和伦理研究本身就是机会。全球都需要专业的合规顾问。",
          },
        ].map((c, i) => (
          <div
            key={c.num}
            className={`tw-s2-card ${active ? "is-in" : ""}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <span className="tw-s2-num">{c.num}</span>
            <div className="rule" style={{ margin: "12px 0" }} />
            <span className="tw-s2-title">{c.title}</span>
            <p className="tw-s2-body">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── step 3: 五位一体总结 ─── */
const FIVE = [
  { name: "算力",  eu: "✓", jk: "×", others: "×", us: "✓", cn: "✓" },
  { name: "数据",  eu: "×", jk: "△", others: "×", us: "✓", cn: "✓" },
  { name: "资本",  eu: "✓", jk: "△", others: "×", us: "✓", cn: "✓" },
  { name: "人才",  eu: "✓", jk: "✓", others: "△", us: "✓", cn: "✓" },
  { name: "政策",  eu: "×", jk: "△", others: "×", us: "✓", cn: "✓" },
] as const;

function StepFive() {
  const active = useIn();
  return (
    <div className="tw-s3 scene-pad">
      <p className="tw-label kicker">为什么只有中美？五位一体缺一不可</p>
      <table className="tw-s3-table">
        <thead>
          <tr>
            <th className="tw-th tw-th-factor">要素</th>
            <th className="tw-th">美国</th>
            <th className="tw-th">中国</th>
            <th className="tw-th">欧洲</th>
            <th className="tw-th">日韩</th>
            <th className="tw-th">其他</th>
          </tr>
        </thead>
        <tbody>
          {FIVE.map((row, i) => (
            <tr
              key={row.name}
              className={`tw-s3-row ${active ? "is-in" : ""}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <td className="tw-td tw-td-name">{row.name}</td>
              <td className="tw-td tw-td-check tw-td-yes">{row.us}</td>
              <td className="tw-td tw-td-check tw-td-yes">{row.cn}</td>
              <td className={`tw-td tw-td-check ${row.eu === "✓" ? "tw-td-yes" : row.eu === "△" ? "tw-td-half" : "tw-td-no"}`}>{row.eu}</td>
              <td className={`tw-td tw-td-check ${row.jk === "✓" ? "tw-td-yes" : row.jk === "△" ? "tw-td-half" : "tw-td-no"}`}>{row.jk}</td>
              <td className={`tw-td tw-td-check ${row.others === "✓" ? "tw-td-yes" : row.others === "△" ? "tw-td-half" : "tw-td-no"}`}>{row.others}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── step 4: 结尾 CTA ─── */
function StepClosure() {
  const active = useIn();
  return (
    <div className="tw-s4 scene-pad center">
      <div className="tw-s4-inner">
        <div className={`tw-s4-rule rule-grow ${active ? "in" : ""}`} />
        <p className={`tw-s4-main mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "100ms" }}>
          看清楚这个格局，
        </p>
        <p className={`tw-s4-main mask-reveal ${active ? "in" : ""}`} style={{ transitionDelay: "500ms" }}>
          然后找到自己的位置。
        </p>
        <div className={`tw-s4-rule rule-grow ${active ? "in" : ""}`} style={{ transitionDelay: "400ms" }} />
        <p className={`tw-s4-cta ${active ? "is-in" : ""}`}>
          评论区聊聊：你觉得哪个国家最有可能打破这个格局？
        </p>
      </div>
    </div>
  );
}
