// 标记体系：五种绝不混用（工程版 §5.3.2）。
export const MARKS = {
  hard: { key: 'hard', symbol: '!', label: '硬拦截', color: '#dc2626', action: '程序已拦住，不提交、不导出；修好源头后自动消失' },
  warn: { key: 'warn', symbol: '△', label: '黄标', color: '#d97706', action: '人工逐项确认后放行' },
  inferred: { key: 'inferred', symbol: '◇', label: 'AI 推断', color: '#6b7280', action: '默认不进终稿，点确认才进' },
  downgraded: { key: 'downgraded', symbol: '↓', label: '已降级', color: '#2563eb', action: '实际来源为下一优先级源，点开看完整链' },
  changed: { key: 'changed', symbol: '●', label: '已改动', color: '#0f766e', action: '点开看原值，点恢复默认只恢复本项' },
}
// kind: 'hard' | 'warn' | 'inferred' | 'downgraded' | 'changed'
export function mark(kind, message, extra = {}) {
  if (!MARKS[kind]) throw new Error(`未知标记 kind：${kind}（五种之外不许自创）`)
  return { kind, symbol: MARKS[kind].symbol, label: MARKS[kind].label, message, ...extra }
}
