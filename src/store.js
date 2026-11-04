import { reactive } from 'vue'
// v1 示例状态：明确标注“示例，非真实产品档案”。正式数据走主进程 state.json（只存索引/状态/相对路径）。
export const store = reactive({
  page: 'p0', drawer: null, // drawer: 'config' | 'gateway' | 'logs' | 'archive'（原 P9/P12/P10/P11，不占侧边）
  products: [
    { id: 'sample-a', brand: '示例品牌 A', type: '通用消费品', status: '待复核 · 黄标 3', note: '示例，非真实产品档案' },
    { id: 'sample-b', brand: '示例品牌 B', type: '通用消费品', status: '硬拦截 1 · 缺本体实拍图', note: '示例，非真实产品档案' },
  ],
  currentId: 'sample-a',
  profile: { brand: '示例品牌 A', type: '通用消费品', site: '美国站', category: '通用类目', material: '', colorConfirmed: '深灰', colorMaterial: '浅灰（识别）', packIncludesBag: false },
  gaps: { hard: 1, warn: 1, inferred: 1 },
  points: [
    { text: '示例卖点 1', evidence: '规格书', strength: '高', places: '标题 / 五点 / 视频' },
    { text: '示例卖点 2', evidence: '实拍', strength: '中', places: 'A+ / 视频' },
  ],
  review: [
    { item: '颜色漂移：示例部位', type: '语境 / 颜色', state: '待确认' },
    { item: '标题一致性：示例句', type: '一致性', state: '待确认' },
    { item: 'AI 人物写实与否', type: '合规', state: '待确认' },
  ],
  gatewayNote: 'v1 stub：未发真实请求。',
})
export const currentProduct = () => store.products.find((p) => p.id === store.currentId) || store.products[0]
