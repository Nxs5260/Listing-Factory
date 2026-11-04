// 任务队列（纯 JS）：任务 → 路 → 项；路间并行、项按资源排队。
// 文案可并行、图片限 2、视频限 1；失败只重跑失败项；每项完成立即写盘（由调用方传 onCheckpoint），支持断点续跑。
import { QUEUE_LIMITS } from './constants.js'
export class JobQueue {
  constructor({ onCheckpoint = () => {} } = {}) { this.onCheckpoint = onCheckpoint; this.running = { copy: 0, image: 0, video: 0 }; this.items = [] }
  add(item) { // item: { id, route: 'copy'|'image'|'video', run: async () => any }
    this.items.push({ ...item, status: 'queued', result: null, error: null, attempts: 0 })
    return item.id
  }
  async runAll() {
    const pending = this.items.filter((i) => i.status === 'queued' || i.status === 'failed')
    await Promise.all(pending.map((i) => this._runOne(i)))
    return this.items
  }
  async _runOne(item) {
    if (this.running[item.route] >= QUEUE_LIMITS[item.route]) {
      await new Promise((r) => setTimeout(r, 50))
      return this._runOne(item)
    }
    this.running[item.route]++; item.status = 'running'; item.attempts++
    try { item.result = await item.run(); item.status = 'done' }
    catch (e) { item.status = 'failed'; item.error = String(e && e.message || e) }
    finally { this.running[item.route]--; this.onCheckpoint(item) }
    return item
  }
  retryFailed() { // 只重跑失败项
    for (const i of this.items) if (i.status === 'failed') i.status = 'queued'
    return this.runAll()
  }
  get checkpoint() { // 断点续跑快照：只含 id/route/status，不含大文件与凭证
    return this.items.map(({ id, route, status, attempts }) => ({ id, route, status, attempts }))
  }
}
