// 校验引擎（纯 JS）。本文件绝不能被复制进 Vue 页面；页面只展示本引擎返回的结果。
import { COPY } from './constants.js'
import { mark } from './marks.js'
const utf8Bytes = (s) => new TextEncoder().encode(s || '').length
export function checkTitle(title = '') {
  const issues = []
  if ([...title].length > COPY.titleMaxChars) issues.push(mark('hard', `标题 ${[...title].length} 字符，超过 ${COPY.titleMaxChars} 字符硬上限`))
  const banned = COPY.bannedSymbols.filter((c) => title.includes(c))
  if (banned.length) issues.push(mark('hard', `标题含禁用符号：${banned.join(' ')}（品牌名本身含符号除外）`))
  const counts = {}
  for (const w of title.toLowerCase().split(/\s+/).filter(Boolean)) counts[w] = (counts[w] || 0) + 1
  const over = Object.entries(counts).filter(([, n]) => n > COPY.titleMaxRepeat)
  if (over.length) issues.push(mark('hard', `同一词超过 ${COPY.titleMaxRepeat} 次：${over.map(([w, n]) => `${w}×${n}`).join('、')}`))
  return { ok: issues.length === 0, issues }
}
export function checkHighlight(text = '') {
  const n = [...text].length
  return n > COPY.highlightMaxChars
    ? { ok: false, issues: [mark('hard', `亮点 ${n} 字符，超过 ${COPY.highlightMaxChars} 字符`)] }
    : { ok: true, issues: [] }
}
export function checkBullet(text = '') {
  const n = [...text].length, issues = []
  if (n > COPY.bulletHardMaxChars) issues.push(mark('hard', `五点 ${n} 字符，超过 ${COPY.bulletHardMaxChars} 字符/条硬上限`))
  else if (n > COPY.bulletWarnChars) issues.push(mark('warn', `五点 ${n} 字符，超过 ${COPY.bulletWarnChars} 字符警告线`))
  return { ok: !issues.some((i) => i.kind === 'hard'), issues }
}
export function checkBackendKeywords(text = '') {
  // 后台词：只用空格分隔、全小写、单字段；超限后果是整字段被搜索忽略，不是截断。
  const bytes = utf8Bytes(text)
  return bytes > COPY.backendMaxBytes
    ? { ok: false, issues: [mark('hard', `后台词 ${bytes} 字节，超过 ${COPY.backendMaxBytes} 字节（≤249，非 250）`)], bytes }
    : { ok: true, issues: [], bytes }
}
export function checkImageFrame({ ratio, isVertical }) {
  // ratio：限制维度比（竖图高比 / 横图宽比）。0.8495 不静默驳回，进人工（官方措辞“约 85%”）。
  if (ratio == null) return { ok: false, issues: [mark('hard', '未给包围盒比值')] }
  if (ratio >= 0.85) return { ok: true, issues: [] }
  if (ratio >= 0.8495) return { ok: true, issues: [mark('warn', `包围盒比 ${ratio} 接近 0.85，进人工复核，不静默驳回`)] }
  return { ok: false, issues: [mark('hard', `包围盒比 ${ratio}，低于 0.85（${isVertical ? '竖图量高比' : '横图量宽比'}）`)] }
}
export const checkAllCopy = ({ title = '', highlights = [], bullets = [], backend = '' }) => {
  const parts = [checkTitle(title), ...highlights.map(checkHighlight), ...bullets.map(checkBullet), checkBackendKeywords(backend)]
  return { ok: parts.every((p) => p.ok), issues: parts.flatMap((p) => p.issues) }
}
