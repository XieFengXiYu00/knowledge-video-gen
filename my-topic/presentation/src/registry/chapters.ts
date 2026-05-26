import type { ChapterDef } from "./types";
import ColdOpen from "../chapters/01-cold-open/ColdOpen";
import { narrations as coldOpenNarrations } from "../chapters/01-cold-open/narrations";
import Duopoly from "../chapters/02-duopoly/Duopoly";
import { narrations as duopolyNarrations } from "../chapters/02-duopoly/narrations";
import GpuWall from "../chapters/03-gpu-wall/GpuWall";
import { narrations as gpuWallNarrations } from "../chapters/03-gpu-wall/narrations";
import DataWall from "../chapters/04-data-wall/DataWall";
import { narrations as dataWallNarrations } from "../chapters/04-data-wall/narrations";
import CapitalTalent from "../chapters/05-capital-talent/CapitalTalent";
import { narrations as capitalTalentNarrations } from "../chapters/05-capital-talent/narrations";
import EuropeJapan from "../chapters/06-europe-japan/EuropeJapan";
import { narrations as europeJapanNarrations } from "../chapters/06-europe-japan/narrations";
import GlobalMap from "../chapters/07-global-map/GlobalMap";
import { narrations as globalMapNarrations } from "../chapters/07-global-map/narrations";
import OsTheory from "../chapters/08-os-theory/OsTheory";
import { narrations as osTheoryNarrations } from "../chapters/08-os-theory/narrations";
import Takeaway from "../chapters/09-takeaway/Takeaway";
import { narrations as takeawayNarrations } from "../chapters/09-takeaway/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "cold-open",
    title: "全球都去哪了？",
    narrations: coldOpenNarrations,
    Component: ColdOpen,
  },
  {
    id: "duopoly",
    title: "中美双寡头数据",
    narrations: duopolyNarrations,
    Component: Duopoly,
  },
  {
    id: "gpu-wall",
    title: "第一道墙：算力",
    narrations: gpuWallNarrations,
    Component: GpuWall,
  },
  {
    id: "data-wall",
    title: "第二道墙：数据",
    narrations: dataWallNarrations,
    Component: DataWall,
  },
  {
    id: "capital-talent",
    title: "第三+四道墙：资本与人才",
    narrations: capitalTalentNarrations,
    Component: CapitalTalent,
  },
  {
    id: "europe-japan",
    title: "欧洲和日韩",
    narrations: europeJapanNarrations,
    Component: EuropeJapan,
  },
  {
    id: "global-map",
    title: "全球生存策略",
    narrations: globalMapNarrations,
    Component: GlobalMap,
  },
  {
    id: "os-theory",
    title: "大模型 = 操作系统",
    narrations: osTheoryNarrations,
    Component: OsTheory,
  },
  {
    id: "takeaway",
    title: "普通人的位置",
    narrations: takeawayNarrations,
    Component: Takeaway,
  },
];
