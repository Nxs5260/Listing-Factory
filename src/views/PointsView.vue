<template><div><h2>P3 卖点池页</h2><p class="purpose">每个卖点都有证据，AI 不能凭空编卖点；三路共用同一卖点池原句。唯一事实源：卖点池。</p>
<div class="card"><table><tr><th>卖点句</th><th>证据</th><th>强度</th><th>能进位置</th></tr><tr v-for="p in store.points" :key="p.text"><td>{{ p.text }}</td><td>{{ p.evidence }}</td><td>{{ p.strength }}</td><td>{{ p.places }}</td></tr></table>
<p><label>新增卖点句（演示校验：禁词 / 绝对化拦截）</label><input v-model="draft" placeholder="示例：不要写“永不”“第一”等绝对化表述"><span v-if="banned" class="red">! 禁词拦截：该句不进标题 / 五点</span></p>
<p class="sample">卖点 &lt; 3 条降级标黄；强度低于规格书的卖点只能进 A+ 长解释，不能进标题；卖点错回 P1 改事实，再回 P3 改句。</p></div>
<div class="foot"><button class="btn ghost" @click="store.page='p2'">← 回上传 P2</button><button class="btn primary" @click="store.page='p5'">卖点池定稿 → 生成 P5</button></div></div></template>
<script setup>import { ref, computed } from 'vue'; import { store } from '../store.js'; const draft = ref(''); const banned = computed(() => /永不|第一|最好|绝对/.test(draft.value))</script>
