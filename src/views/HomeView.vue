<template><div><h1>AI Listing Factory</h1><p class="purpose">一次上传、一个产品档案，文案 / 图片 / 视频三路自动出结果。人工只剩 3 步：上传 → 复核 → 导出。30 秒内进入今天要做的产品。</p>
<div class="grid3"><div class="card"><h3>📝 文案路</h3><p>标题 ≤75 · 亮点 ≤125 · 后台词 ≤249 字节</p></div><div class="card"><h3>🖼️ 图片路</h3><p>纯白 255 · 占框 ≥85% · 普通 970 / Premium 1464</p></div><div class="card"><h3>🎬 视频路</h3><p>SBV 6–45 秒 · 项目规则每条 ≤20 秒 · 16:9</p></div></div>
<div class="grid2"><div class="card" v-for="p in store.products" :key="p.id"><h3>{{ p.brand }}</h3><p>{{ p.type }} · {{ p.status }}</p><p class="sample">{{ p.note }}</p><button class="btn primary" @click="go(p.id)">进入</button></div></div>
<div class="foot"><span>空态：0 个产品时只显示 [建新产品]，不显示假卡片。</span><button class="btn primary" @click="store.page='p1'">＋ 建新产品 → P1</button></div></div></template>
<script setup>import { store } from '../store.js'; const go=(id)=>{store.currentId=id; store.page='p1'}</script>
