# 知识型讲解视频生成工程

## 快速预览（本地运行）

```bash
# 1. 克隆代码
git clone https://github.com/XieFengXiYu00/knowledge-video-gen.git
cd knowledge-video-gen/my-topic/presentation

# 2. 安装依赖
npm install

# 3. 启动
npm run dev
```

浏览器打开 `http://localhost:5174/?auto=1` 即可查看演示，音频已内置，无需额外配置。


## 工作原理

```
文章 / 口播稿
    ↓ AI 生成
script.md（口播稿）+ outline.md（分章计划）
    ↓ scaffold.sh
presentation/（Vite + React + TS 项目）
    ↓ AI 逐章编写 .tsx 章节组件
localhost:5173（浏览器预览）
    ↓ 录屏
MP4 视频
```

每次点击推进一个节拍，每一步独占整屏，进度条隐藏，舞台无 chrome —— 录出来就像一个真正的视频。

---

## 前置依赖

| 依赖 | 版本 | 说明 |
|---|---|---|
| Node.js | >= 18 | scaffold.sh 和 Vite 需要 |
| Git | 任意 | 已在本工程使用 |
| 录屏工具 | — | OBS / macOS 自带录屏 / 任意 |

可选（配音）：

| 依赖 | 说明 |
|---|---|
| mmx-cli | MiniMax TTS（默认 provider） |
| OPENAI_API_KEY | OpenAI TTS（内置 provider） |

---

## 快速上手

### 第 1 步：初始化新视频目录

```bash
bash scripts/new-video.sh my-video
```

这会在 `knowledge-video-gen/` 下创建 `my-video/` 目录，并生成 `article.md` 占位文件。

### 第 2 步：填入内容

把你的文章或口播稿内容写入（或替换）`my-video/article.md`。

### 第 3 步：让 AI 生成视频

在 Cursor 中打开 `knowledge-video-gen/` 工作区，新建一个 Chat，发送：

```
帮我把 my-video/article.md 做成一个视频
```

AI 会自动读取 skill，走完以下流程：
1. 生成 `script.md`（口播稿）+ `outline.md`（分章计划）
2. **停下来**让你确认 5 件事（稿子 / 分章 / 主题 / 素材 / 开发模式）
3. 运行 `scaffold.sh` 搭建 Vite+React 项目
4. 逐章开发 `.tsx` 章节组件

### 第 4 步：预览和录屏

```bash
cd my-video/presentation
npm install
npm run dev
# 浏览器打开 localhost:5173
```

点击屏幕推进节拍，开启录屏软件录制，完成后停止录屏即得到视频。

**自动模式**（合成配音后）：浏览器地址加 `?auto=1`，按空格键，全自动播放到底，无需手动点击。

---

## 内置主题（23 个）

运行以下命令查看所有主题及推荐场景：

```bash
bash skill/scripts/scaffold.sh --list-themes
```

| 主题 ID | 中文名 | 适用场景 |
|---|---|---|
| `bauhaus-bold` | 包豪斯粗体 | 设计、建筑、艺术 |
| `neon-cyber` | 霓虹赛博 | 科技、AI、未来感 |
| `midnight-press` | 午夜印刷 | 严肃内容、深度报道 |
| `warm-keynote` | 暖色 Keynote | 产品演示、演讲 |
| `terminal-green` | 终端绿 | 编程、技术教程 |
| `paper-press` | 纸质印刷 | 人文、历史、文学 |
| `dune` | 沙丘 | 自然、哲学、沉浸 |
| ... | 更多 | 见 `skill/themes/` |

---

## 目录结构说明

```
knowledge-video-gen/
├── README.md                              # 本文件
├── .cursor/
│   └── rules/
│       └── web-video-presentation.mdc    # Cursor 规则（AI 自动读取 skill）
├── skill/                                 # web-video-presentation skill 文件
│   ├── SKILL.md                           # 核心工作流（AI 必读）
│   ├── scripts/scaffold.sh                # Vite+React 脚手架脚本
│   ├── references/
│   │   ├── SCRIPT-STYLE.md               # 口播稿写作规范
│   │   ├── OUTLINE-FORMAT.md             # 分章计划格式规范
│   │   ├── CHAPTER-CRAFT.md              # 章节开发核心指南
│   │   ├── THEMES.md                     # 主题系统说明
│   │   ├── AUDIO.md                      # 音频合成流程
│   │   └── RECORDING.md                  # 录屏说明
│   ├── themes/                            # 23 个内置主题
│   └── templates/                         # Vite+React 模板源码
└── scripts/
    └── new-video.sh                       # 初始化新视频目录
```

每个视频独立在自己的目录中：

```
my-video/
├── article.md                  # 源文章（你提供）
├── script.md                   # 口播稿（AI 生成）
├── outline.md                  # 分章计划（AI 生成）
└── presentation/               # Vite+React 项目（scaffold.sh 生成）
    ├── src/chapters/
    │   ├── 01-intro/
    │   │   ├── Intro.tsx
    │   │   ├── Intro.css
    │   │   └── narrations.ts   # step 数 + 口播文本（唯一真相源）
    │   └── ...
    ├── public/audio/           # TTS 生成的 .mp3（可选）
    └── audio-segments.json     # 音频合成配置
```

---

## 配音合成（可选）

视频做完后，AI 会问你是否需要合成配音：

```bash
cd my-video/presentation
npm run extract-narrations   # 扫所有章节的 narrations.ts，生成 audio-segments.json
npm run synthesize-audio     # 默认用 MiniMax TTS 合成每段音频

# 或使用 OpenAI TTS：
PRESENTATION_TTS=openai npm run synthesize-audio
```

合成完成后，浏览器加 `?auto=1` 即可自动播放，音视频天然同步。

---

## 常见问题

**Q：scaffold.sh 运行失败？**
确认 Node.js 已安装：`node -v`（需要 >= 18）。

**Q：AI 生成的章节动效很普通？**
告诉 AI 具体哪一步需要改进，参考 `skill/references/CHAPTER-CRAFT.md` Part 8 反馈速查表。

**Q：想换主题？**
在 Checkpoint Plan 阶段告诉 AI，或对 AI 说「把主题换成 neon-cyber」。

**Q：想自定义主题？**
参考 `skill/references/THEMES.md` 创作新主题流程。
