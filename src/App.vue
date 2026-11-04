<template><div class="window">
<div class="topbar"><span><b>AI Listing Factory</b> v1 骨架</span><span class="pill amber">任务：待复核 · 黄标 3</span><span class="pill grey">数据根目录：本地（Electron 内）</span>
<span style="margin-left:auto"><button class="btn ghost" @click="store.drawer='config'">设置 ▾（配置 / 中转站 / 日志 / 归档）</button></span></div>
<div class="layout"><aside class="side"><h4>主线</h4>
<button class="nav" :class="{active:store.page==='p0'}" @click="store.page='p0'">P0 首页</button>
<button class="nav" :class="{active:store.page==='p1'}" @click="store.page='p1'">P1 产品档案</button>
<button class="nav" :class="{active:store.page==='p2'}" @click="store.page='p2'">P2 上传缺口</button>
<button class="nav" :class="{active:store.page==='p3'}" @click="store.page='p3'">P3 卖点池</button>
<button class="nav" :class="{active:store.page==='p5'}" @click="store.page='p5'">P5 生成进度</button>
<button class="nav" :class="{active:store.page==='review'}" @click="store.page='review'">复核（P6 对比 + P7 黄标）</button>
<button class="nav" :class="{active:store.page==='p8'}" @click="store.page='p8'">P8 导出</button>
<h4>说明</h4><p style="font-size:12px;color:#9ca3af;line-height:1.7;padding:0 8px">侧边只放主线。原 P9 / P12 / P10 / P11 不占侧边，收进顶栏“设置”抽屉（功能保留，可恢复成页）。校验、AI 网关、任务队列、成本、ffprobe 在主进程 / 领域层，不进 Vue 页面。</p></aside>
<main class="main"><HomeView v-if="store.page==='p0'"/><ProfileView v-if="store.page==='p1'"/><UploadView v-if="store.page==='p2'"/><PointsView v-if="store.page==='p3'"/><ProgressView v-if="store.page==='p5'"/><ReviewView v-if="store.page==='review'"/><ExportView v-if="store.page==='p8'"/></main></div>
<div class="statusbar"><span>v1 骨架 · 示例数据，非真实产品档案 · AI 生成未接通（网关 stub）</span><span>交付通道：Drive / 聊天内分片 · 不给公开链接选项</span></div>
<div v-if="store.drawer"><div class="overlay" @click="store.drawer=null"></div><SettingsDrawer/></div>
</div></template>
<script setup>import { store } from './store.js'; import HomeView from './views/HomeView.vue'; import ProfileView from './views/ProfileView.vue'; import UploadView from './views/UploadView.vue'; import PointsView from './views/PointsView.vue'; import ProgressView from './views/ProgressView.vue'; import ReviewView from './views/ReviewView.vue'; import ExportView from './views/ExportView.vue'; import SettingsDrawer from './components/SettingsDrawer.vue'</script>
