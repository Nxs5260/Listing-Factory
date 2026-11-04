<template><div><h2>P5 生成进度页</h2><p class="purpose">按项算进度，失败只重跑失败项。路间并行、路内串行；本页不改档案 / 卖点 / 词链。</p>
<div class="grid3"><div class="card"><h3>文案路 · 并行</h3><p>标题 100%</p><div class="bar"><i style="width:100%"></i></div><p>五点 100% · 描述 80%</p><div class="bar"><i style="width:80%"></i></div></div>
<div class="card"><h3>图片路 · 限 2，路内串行</h3><p>本体锚定 ✓ → 场景 / 副图 / A+ 才解锁</p><p>主图 100%</p><div class="bar"><i style="width:100%"></i></div></div>
<div class="card"><h3>视频路 · 限 1，路内串行</h3><p>脚本定稿 ✓ → 按镜头生成才解锁</p><p>镜头 1/5</p><div class="bar"><i style="width:20%"></i></div></div></div>
<div class="card"><p><span class="red">! 失败 1 项：视频镜头 3（演示）</span> <button class="btn ghost" @click="retried=true">{{ retried ? '已重跑（演示）' : '只重跑该项' }}</button> · 已完成项保留。</p><p class="sample">v1 骨架：此处为演示进度，真实生成未接通（AI 网关 stub）。校验演示见下方：</p>
<p>标题校验演示：<input v-model="title" placeholder="输入标题，超 75 字符或含禁用符号即拦截"><span v-if="issues.length" class="red"> {{ issues.map(i=>i.message).join('；') }}</span><span v-else-if="title" style="color:#0f766e"> ✓ 通过</span></p></div>
<div class="foot"><button class="btn ghost" @click="store.page='p3'">← 回卖点池 P3</button><button class="btn primary" @click="store.page='review'">去复核（含对比） →</button></div></div></template>
<script setup>import { ref, computed } from 'vue'; import { store } from '../store.js'; import { checkTitle } from '../domain/validate.js'; const title = ref(''); const retried = ref(false); const issues = computed(() => title.value ? checkTitle(title.value).issues : [])</script>
