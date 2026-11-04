/* AI Listing Factory v1 主进程：窗口 / state.json / safeStorage / AI 网关 stub。
   Key 绝不进 state.json、不进日志明文；state.json 只存索引/状态/相对路径。 */
const { app, BrowserWindow, ipcMain, dialog, safeStorage } = require('electron')
const fs = require('fs'); const path = require('path')
const settingsPath = () => path.join(app.getPath('userData'), 'alf-settings.json')
const readSettings = () => { try { return JSON.parse(fs.readFileSync(settingsPath(), 'utf8')) } catch { return {} } }
const writeSettings = (s) => { try { fs.mkdirSync(path.dirname(settingsPath()), { recursive: true }); fs.writeFileSync(settingsPath(), JSON.stringify(s, null, 1)) } catch {} }
const dataDir = () => { const s = readSettings(); const d = s.dataDir || path.join(app.getPath('userData'), 'data'); try { fs.mkdirSync(d, { recursive: true }) } catch {} return d }
const stateFile = () => path.join(dataDir(), 'state.json')
const keysFile = () => path.join(app.getPath('userData'), 'keys.enc.json')
const SECRET_KEYS = ['apiKey', 'secret', 'token', 'password', 'credential', 'key']
function sanitize(obj) { // 与 src/domain/state.js 同规则（主进程版，不依赖渲染层）
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(sanitize)
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (SECRET_KEYS.some((s) => k.toLowerCase().includes(s))) continue
    if (typeof v === 'string' && v.startsWith('data:')) continue
    out[k] = sanitize(v)
  }
  return out
}
// 写临时文件再重命名 + 备份（上一版 state.json.bak），防写一半损坏。
function saveState(state) {
  const clean = sanitize(state); const dir = dataDir(); const tmp = stateFile() + '.tmp'
  try {
    if (fs.existsSync(stateFile())) fs.copyFileSync(stateFile(), stateFile() + '.bak')
    fs.writeFileSync(tmp, JSON.stringify(clean, null, 1)); fs.renameSync(tmp, stateFile()); return { ok: true }
  } catch (e) { return { ok: false, error: String(e && e.message || e) } }
}
let win = null
function createWindow() {
  win = new BrowserWindow({ width: 1440, height: 920, minWidth: 1100, minHeight: 700, title: 'AI Listing Factory',
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false } })
  if (process.env.ALF_DEV) win.loadURL('http://localhost:5173'); else win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
ipcMain.handle('state:load', () => { try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')) } catch { return null } })
ipcMain.handle('state:save', (_e, state) => saveState(state))
ipcMain.handle('data:info', () => ({ dataDir: dataDir(), stateFile: stateFile(), platform: process.platform }))
ipcMain.handle('data:chooseDir', async () => {
  const r = await dialog.showOpenDialog(win, { properties: ['openDirectory', 'createDirectory'], title: '选择数据存储文件夹' })
  if (r.canceled || !r.filePaths.length) return { canceled: true }
  const s = readSettings(); s.dataDir = r.filePaths[0]; writeSettings(s); return { canceled: false, dataDir: dataDir() }
})
// safeStorage 占位接口：加密串只存 keys.enc.json；渲染层只能拿到“有无 + 尾号后 6 位”，拿不到明文。
function readKeys() { try { return JSON.parse(fs.readFileSync(keysFile(), 'utf8')) } catch { return {} } }
function writeKeys(k) { try { fs.mkdirSync(path.dirname(keysFile()), { recursive: true }); fs.writeFileSync(keysFile(), JSON.stringify(k)) } catch {} }
ipcMain.handle('key:status', () => {
  const out = {}; const keys = readKeys()
  for (const provider of ['dataler', 'apiniuma']) {
    if (!keys[provider] || !safeStorage.isEncryptionAvailable()) { out[provider] = { has: false }; continue }
    try { const plain = safeStorage.decryptString(Buffer.from(keys[provider], 'base64')); out[provider] = { has: true, tail6: plain.slice(-6) } }
    catch { out[provider] = { has: false } }
  }
  return out
})
ipcMain.handle('key:set', (_e, { provider, value }) => {
  if (!['dataler', 'apiniuma'].includes(provider)) return { ok: false, error: '未知站点' }
  if (!safeStorage.isEncryptionAvailable()) return { ok: false, error: '本机 safeStorage 不可用，Key 未保存' }
  const keys = readKeys(); keys[provider] = safeStorage.encryptString(String(value)).toString('base64'); writeKeys(keys); return { ok: true }
})
ipcMain.handle('key:clear', (_e, { provider }) => { const keys = readKeys(); delete keys[provider]; writeKeys(keys); return { ok: true } })
// AI 网关 stub：v1 不发真实请求（见 electron/aiGateway.cjs），渲染层只调本接口拿 stub 结果。
const gateway = require('./aiGateway.cjs')
ipcMain.handle('gateway:status', () => gateway.status())
ipcMain.handle('gateway:priceCatalog', () => gateway.priceCatalogPlaceholder())
ipcMain.handle('gateway:generate', (_e, req) => gateway.generateStub(req))
