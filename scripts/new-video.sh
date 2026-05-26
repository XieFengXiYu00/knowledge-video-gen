#!/usr/bin/env bash
# new-video.sh — 初始化一个新视频的工作目录
# 用法：bash scripts/new-video.sh <视频名>
# 示例：bash scripts/new-video.sh my-first-video

set -e

# ── 参数检查 ──────────────────────────────────────────────
if [ -z "$1" ]; then
  echo "用法：bash scripts/new-video.sh <视频名>"
  echo "示例：bash scripts/new-video.sh my-first-video"
  exit 1
fi

VIDEO_NAME="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
VIDEO_DIR="$PROJECT_DIR/$VIDEO_NAME"

# ── 检查是否已存在 ────────────────────────────────────────
if [ -d "$VIDEO_DIR" ]; then
  echo "目录 $VIDEO_DIR 已存在，跳过创建。"
  echo "如需重新初始化，请先删除该目录：rm -rf $VIDEO_DIR"
  exit 0
fi

# ── 创建目录结构 ──────────────────────────────────────────
mkdir -p "$VIDEO_DIR"

cat > "$VIDEO_DIR/article.md" << 'ARTICLE_EOF'
# 请在这里填入你的文章或口播稿

<!-- 
  支持的输入类型：
  1. 原始文章（书面语 / 公众号 / 博客 / 论文）
  2. 直接的口播稿 / 视频脚本
  
  填写完成后，在 Cursor Chat 中告诉 AI：
  "帮我把 <视频名>/article.md 做成一个视频"
  
  AI 会自动完成：
  1. 生成口播稿 script.md
  2. 生成分章计划 outline.md
  3. 搭建 Vite+React 脚手架
  4. 逐章开发动效章节
-->

在此处粘贴你的文章内容...
ARTICLE_EOF

echo ""
echo "✅ 视频工作目录创建完成：$VIDEO_DIR"
echo ""
echo "下一步："
echo "  1. 编辑 $VIDEO_DIR/article.md，填入你的文章内容"
echo "  2. 在 Cursor Chat 中输入："
echo "     \"帮我把 $VIDEO_NAME/article.md 做成一个视频\""
echo ""
echo "脚手架命令（AI 会自动调用，也可手动运行）："
echo "  bash skill/scripts/scaffold.sh $VIDEO_NAME/presentation --theme=<主题id>"
echo "  bash skill/scripts/scaffold.sh --list-themes  # 查看所有主题"
