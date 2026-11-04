<template><div class="drawer"><h2>设置抽屉</h2><p class="sample">原 P9 / P12 / P10 / P11 在此抽屉内分栏，功能保留；用户要恢复成独立页时，把本抽屉分栏提升为侧边页即可，组件与数据结构不变。</p>
<div style="display:flex;gap:8px;flex-wrap:wrap"><button v-for="t in tabs" :key="t.k" class="btn" :class="tab===t.k?'primary':'ghost'" @click="tab=t.k">{{ t.label }}</button><button class="btn ghost" @click="store.drawer=null">关闭</button></div>
<div v-if="tab==='config'"><h3>配置（原 P9）</h3><p>四层：全局 → 站点 → 产品 → 单次任务，低层只存差异项。每项显示生效值 + 来源层 + ● 改动 + 恢复默认。</p>
<table><tr><th>项</th><th>生效值</th><th>状态</th></tr><tr><td>数据新鲜度</td><td>30 天</td><td>内控建议，待配置锁定</td></tr><tr><td>DY 分类</td><td>—</td><td class="amber-t">待用户定：6 还是 8</td></tr><tr><td>DX 阈值 / 兜底</td><td>—</td><td class="amber-t">待用户定</td></tr><tr><td>排名聚合</td><td>—</td><td class="amber-t">待用户定：min 还是 first_seen</td></tr><tr><td>颜色阈值</td><td>—</td><td class="amber-t">待实拍校准（15 为示例，未校准）</td></tr><tr><td>Safe Zone 精确尺寸</td><td>—</td><td class="amber-t">待登录核实</td></tr></table>
<p class="red">硬规则不在此页当可选项：标题 ≤75、亮点 ≤125、后台词 ≤249 字节、纯白 255、占框 ≥85% 等。</p></div>
<div v-if="tab==='gateway'"><h3>中转站（原 P12）</h3><p>{{ gw }}</p><p>Dataler（主）/ Apiniuma（备），令牌不互通；Key 只显示尾号后 6 位，走 safeStorage，绝不明文存 state.json。</p>
<p><label>Dataler Key（演示输入，不会真发送；Electron 内才走 safeStorage）</label><input type="password" v-model="keyInput" placeholder="留空 = 未填，v1 不发真实请求"></p>
<button class="btn primary" @click="saveKey">保存到 safeStorage（Electron 内）</button><p class="sample">{{ keyMsg }}</p></div>
<div v-if="tab==='logs'"><h3>日志（原 P10）</h3><table><tr><th>时间</th><th>事件</th><th>结果</th></tr><tr><td>示例</td><td>调用中转站模型（Key ***）</td><td>stub，未发请求</td></tr><tr><td>示例</td><td>401 熔断</td><td>立即停，不切备站</td></tr></table></div>
<div v-if="tab==='archive'"><h3>归档（原 P11）</h3><p>state.json 只存索引 / 状态 / 相对路径；生成与导出按版本文件夹，不覆盖旧版。本页不设“导出包含 Key”选项。</p><p class="sample">数据根目录：Electron userData 内（见 README）；目录不可读时显示原因，不自动换目录、不建空档案。</p></div>
</div></template>
<script setup>import { ref, onMounted } from 'vue'; import { store } from '../store.js'; const tabs=[{k:'config',label:'配置 P9'},{k:'gateway',label:'中转站 P12'},{k:'logs',label:'日志 P10'},{k:'archive',label:'归档 P11'}]; const tab=ref(store.drawer||'config'); const gw=ref('加载中…'); const keyInput=ref(''); const keyMsg=ref('');
onMounted(async()=>{ try{ const s=await window.alf?.gatewayStatus?.(); gw.value=s?JSON.stringify(s):'浏览器预览模式：无 Electron，网关 stub 不可用（属正常，正式桌面端内可用）。' }catch{ gw.value='浏览器预览模式：无 Electron。' } });
async function saveKey(){ if(!window.alf){ keyMsg.value='浏览器预览模式：不保存。'; return } if(!keyInput.value){ keyMsg.value='未填 Key，未保存。'; return } const r=await window.alf.keySet('dataler', keyInput.value); keyMsg.value=r.ok?'已保存到 safeStorage（渲染层拿不到明文）。':'保存失败：'+(r.error||''); keyInput.value='' }</script>
