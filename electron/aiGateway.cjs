/* AI 网关 stub（v1）：只定接口形状与熔断规则，不发真实请求、不存真实 Key。
   Dataler 主、Apiniuma 备，令牌不互通；401/403 立即停不重试不切备站；
   超时/429/503 指数退避最多 3 次；价格目录生成前拉 /api/pricing（v1 为占位）。 */
const CIRCUIT = { dataler: { state: 'closed', failures: 0 }, apiniuma: { state: 'closed', failures: 0 } }
function status() {
  return { primary: 'dataler', backup: 'apiniuma', tokensInterchangeable: false, circuit: CIRCUIT,
    note: 'v1 stub：未发真实请求。接通真实生成前须用户拍板新库名/试点/SIF/DY/DX 并在设置抽屉填 Key（走 safeStorage）。' }
}
function priceCatalogPlaceholder() {
  return { ok: false, code: 'PRICE_CATALOG_STUB', message: 'v1 未拉取真实价格目录；单价一律取实时目录，不编单价。接通后调用站方 /api/pricing。', items: [] }
}
function generateStub(req = {}) {
  // 熔断规则演示（纯逻辑，不联网）：401/403 直接停；其余走退避计数但不重试发包。
  if (req.simulateStatus === 401 || req.simulateStatus === 403) {
    CIRCUIT.dataler.state = 'open'
    return { ok: false, code: 'AUTH_STOP', message: '401/403：立即停，不重试，不切备站。请到设置抽屉检查 Key。' }
  }
  return { ok: false, code: 'GATEWAY_STUB', route: req.route || null,
    message: 'v1 骨架：AI 生成未接通。本次未发任何真实请求、未消耗 quota。' }
}
module.exports = { status, priceCatalogPlaceholder, generateStub }
