# AI Listing Factory v1（骨架）

本地桌面端：Electron + Vue 3 + Vite。v1 只做骨架 + 主线 + 领域层，**不做完整三路 AI 生成、不发真实请求、不存真实 Key**。

## 依据
- 开发用本：`~/workspace/your_files/ai-listing-factory/AI项目工程版-需求到开发.md`（3160 行）
- UI 风格（已确认）：深色侧边栏 + 浅色主区、深青主色；设计图：`ui-design-all-pages.html`
- 参考（只读，未改动）：`~/workspace/amazon-listing-studio-desktop/`（V3）。本项目未复制 V3 的 state.json 或 Key。

## 启动
```bash
cd ~/workspace/ai-listing-factory
npm install        # 首次；本地验证时 node_modules 为 V3 的同版本依赖符号链接，见下
npm run dev        # 仅渲染层（Vite，http://localhost:5173）
npm start          # 先 vite build 再 electron .（正式桌面端）
```
本地 node_modules 复用方式：本机验证用 `ln -s ../amazon-listing-studio-desktop/node_modules node_modules`（同版本 vue/vite/electron），`node_modules/` 已进 `.gitignore`；新电脑 / 新库克隆后请正常 `npm install`，不要提交 node_modules。

## 数据位置
- 数据根目录：Electron `userData` 下的 `data/`（可在设置抽屉改目录；本机验证与 V3 的 `als-settings.json` 分开，本项目用 `alf-settings.json`，互不干扰）。
- `state.json`：只存索引 / 状态 / 相对路径；写临时文件再重命名 + 上一版 `.bak` 备份；大文件、base64、凭证、Key 一律被主进程与领域层 `sanitizeState` 剥离。
- Key：只走 Electron `safeStorage`，加密串存 `userData/keys.enc.json`；渲染层只能拿到“有无 + 尾号后 6 位”，拿不到明文；日志脱敏 `***`。

## 分层
- `electron/`：窗口、state.json、safeStorage、AI 网关 stub。
- `src/domain/`（纯 JS，绝不写进 Vue 页面）：`constants.js`（当前口径）、`validate.js`（标题/亮点/五点/后台词/包围盒）、`marks.js`（! / △ / ◇ / ↓ / ●）、`config.js`（四层配置）、`queue.js`（任务队列）、`state.js`（state 守门）。
- `src/views/`：P0 / P1 / P2（含 P13 弹窗）/ P3 / P5 / 复核（P6 对比 + P7 黄标合并页）/ P8。
- `src/components/SettingsDrawer.vue`：原 P9 配置 / P12 中转站 / P10 日志 / P11 归档，收进顶栏“设置”抽屉分栏，功能保留；要恢复成页时把分栏提升为侧边页即可。
- 校验、AI 网关、任务队列、成本、ffprobe 全部在主进程 / 领域层，不进 Vue 页面。

## 未定项（全部占位，不擅自定稿）
新库名、首个试点（USUBIR 还是 JRING）、SIF 样例表头、DY 6 还是 8、DX 阈值与兜底、排名 min 还是 first_seen、颜色阈值 15、Safe Zone 精确尺寸、A+ 视频冲突（200MB vs 500MB 等）、Premium 资格 5 vs 15、SBV 竖版是否可选。以上在设置抽屉与配置默认值里均为 null + “待用户定 / 待登录核实”。

## v1 未做清单
完整三路 AI 生成、图片 / 视频真实生成、GitHub 推送、exe 打包（无 electron-builder 配置）、真实价格目录拉取、ffprobe 真实校验（只留接口位置与规则说明）。

## 下一步需要用户做的事
1. 在 GitHub 网页自建空库并把 Muse GitHub App 装到该库（App 建库 2026-11-04 实测 403，走不通），Muse 再推本目录源码；不要用本机 node_modules 符号链接进库（已 gitignore）。
2. 拍板：新库名、首个试点、SIF 样例表头、DY / DX、排名聚合方式，之后才能接通真实生成。
3. 在设置抽屉 → 中转站填 Key（走 safeStorage）后，才能拉取真实价格目录与模型列表。
