// 规格常量：只写工程版当前口径。旧数不在此作当前值；旧数见附录 A，
// 本文件注释中出现“已取代”时仅作溯源提示，代码绝不以旧数为准。
// 来源：~/workspace/your_files/ai-listing-factory/AI项目工程版-需求到开发.md §2
export const COPY = {
  titleMaxChars: 75,
  highlightMaxChars: 125,
  bulletHardMaxChars: 500, // 每条硬上限
  bulletWarnChars: 255, // 风格指南警告线
  bulletTargetChars: 200, // 生成目标（旧类目建议，非硬上限）
  backendMaxBytes: 249, // 官方原文 less than 250 bytes，即 ≤249 UTF-8 字节
  titleMaxRepeat: 2, // 同一词最多 2 次
  // 禁用符号（品牌名本身含符号除外）
  bannedSymbols: ['!', '$', '?', '_', '{', '}', '^', '¬', '¦'],
}
export const IMAGE = {
  mainLongEdgeMin: 500, mainLongEdgeMax: 10000, zoomMin: 1000, minDpi: 72,
  pureWhite: 255, // RGB 255,255,255
  frameMinRatio: 0.85, // 限制维度法：竖图量高比、横图量宽比 ≥0.85，不是面积法
  maxExtraImages: 8, // 1 主图 + 最多 8 附加图
}
export const APLUS = {
  normalWidth: 970, normalMaxModules: 5,
  premiumWidth: 1464, premiumMaxModules: 7,
  brandStoryDesktop: { w: 1464, h: 625 }, brandStoryMobile: { w: 463, h: 625 },
  brandStoryLogo: { w: 315, h: 145 },
  compareNormal: { w: 150, h: 300 },
  compareTable1: { w: 200, h: 225 }, compareTable2: { w: 300, h: 225 },
  compareTable3Desktop: { w: 488, h: 700 },
}
export const VIDEO = {
  detailMinSec: 60, detailMaxSec: 720, detailMaxBytes: 5 * 1024 ** 3,
  sbvMinSec: 6, sbvMaxSec: 45, sbvAspect: '16:9', sbvMaxBytes: 500 * 1024 ** 2,
  spvMinSec: 7, spvAspect: '16:9', spvMinProductShare: 0.5,
  projectMaxSec: 20, // 项目自有规则（比亚马逊上限更严），与亚马逊上限分开报警
  aplusVideoMaxSec: 180, aplusVideoMinWidth: 960, aplusVideoMinHeight: 540,
}
export const QUEUE_LIMITS = { copy: Infinity, image: 2, video: 1 }
// 待用户定 / 待登录核实（v1 一律为 null，占位不编数）：
export const PENDING = {
  repoName: null, firstPilot: null, sifSampleHeader: null,
  dyMode: null, // 6 还是 8
  dxThreshold: null, dxFallback: null, rankAggregation: null, // min 还是 first_seen
  colorThreshold: null, // 颜色阈值 15 为内控示例，未校准
  safeZone: null, aplusVideoSizeConflict: null,
}
