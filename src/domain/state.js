// state.json 形状守门：只存索引 / 状态 / 相对路径。
// 大文件、图片原图、凭证、Key 一律不许进 state.json；发现即剥离并告警（不静默丢弃：返回 stripped 字段名）。
const SECRET_KEYS = ['apiKey', 'secret', 'token', 'password', 'credential', 'key']
export function sanitizeState(state) {
  const stripped = []
  const walk = (obj) => {
    if (!obj || typeof obj !== 'object') return obj
    if (Array.isArray(obj)) return obj.map(walk)
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      if (SECRET_KEYS.some((s) => k.toLowerCase().includes(s))) { stripped.push(k); continue }
      if (typeof v === 'string' && v.startsWith('data:')) { stripped.push(k); continue } // base64 大文件
      out[k] = walk(v)
    }
    return out
  }
  return { state: walk(state), stripped }
}
export const EMPTY_STATE = {
  version: 1, products: [], // 每项只含 id/brand/type/site/category + 相对路径 + 状态
  jobs: [], configOverrides: {}, updatedAt: null,
}
