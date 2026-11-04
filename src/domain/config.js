// 配置四层：全局 → 站点 → 产品 → 单次任务。低层只存差异项。
// 每一项的生效视图必须同时给：生效值、来源层、是否改动、恢复默认。
export const LAYERS = ['global', 'site', 'product', 'task']
export const LAYER_LABEL = { global: '全局默认', site: '站点', product: '产品', task: '单次任务' }
export const DEFAULTS = {
  // 只放已定口径；未定项一律 null + pendingReason，不编默认值冒充定论。
  dataFreshnessDays: { value: 30, pending: '内控建议，待配置锁定（C 档可后补）' },
  dyMode: { value: null, pending: '待用户定：6 项还是 8 项' },
  dxThreshold: { value: null, pending: '待用户定：DX 阈值与 SIF 兜底' },
  rankAggregation: { value: null, pending: '待用户定：min 还是 first_seen' },
  colorThreshold: { value: null, pending: '待实拍校准：15 为内控示例，未校准，默认人工' },
  safeZone: { value: null, pending: '待登录核实：官方 Safe Zone 模板实测' },
}
export function resolveConfig(overrides = {}) {
  // overrides: { layer: { key: value } }，只存差异项；返回每项 { value, layer, changed, defaultValue, pending }
  const out = {}
  for (const [key, def] of Object.entries(DEFAULTS)) {
    let value = def.value, layer = 'global', changed = false
    for (const l of LAYERS.slice(1)) {
      if (overrides[l] && overrides[l][key] !== undefined) { value = overrides[l][key]; layer = l; changed = true }
    }
    out[key] = { value, layer: LAYER_LABEL[layer], changed, defaultValue: def.value, pending: def.pending }
  }
  return out
}
export function restoreItem(overrides, layer, key) {
  const next = JSON.parse(JSON.stringify(overrides || {}))
  if (next[layer]) delete next[layer][key]
  return next
}
// 坚决不可配置的硬规则：出现在此表的键，配置页不许渲染为可选项。
export const HARD_RULES = ['titleMaxChars', 'highlightMaxChars', 'bulletHardMaxChars', 'backendMaxBytes', 'pureWhite', 'frameMinRatio', 'sbvSpec', 'bannedWords', 'claimNeedsEvidence']
