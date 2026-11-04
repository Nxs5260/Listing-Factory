<template><div><h2>P8 导出页</h2><p class="purpose">导出前二次确认，交付通道不给选错的机会。唯一事实源：导出包。本页不改终稿内容。</p>
<div class="card"><h3>导出清单（默认全勾，溯源表建议必勾）</h3><p>☑ 文案纯文本（粘贴到 Seller Central 不带多余换行 / HTML / 空格） · ☑ 图片包 · ☑ 视频包 · ☑ 溯源表 · ☑ 版本号 + 时间 + 改了哪一句</p>
<h3>交付通道（只有两项）</h3><p><label><input type="radio" checked style="width:auto"> 用户本人 Google Drive</label><br><label><input type="radio" style="width:auto"> 聊天内分片附件</label></p>
<p class="red">界面不给“生成公开链接”选项。通道未选定时，导出包先本地归档，不自动选公开链接兜底。</p></div>
<div class="foot"><button class="btn ghost" @click="store.page='review'">← 回复核（新开修订版）</button><button class="btn primary" @click="done=true">{{ done ? '已二次确认并本地归档（v1 演示，未真导出）' : '二次确认并导出 → 回 P0' }}</button></div></div></template>
<script setup>import { ref } from 'vue'; const done = ref(false)</script>
