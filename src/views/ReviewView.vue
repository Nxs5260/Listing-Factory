<template><div><h2>复核页（P6 对比分栏 + P7 黄标队列，合并页）</h2><p class="purpose">P6 与 P7 合并为一页内的两个分栏（用户：有一些功能可以不放在页面里面 —— 对比不单独成页）。唯一事实源：一致性检查结果 + 复核记录。</p>
<h3>对比分栏（P6）</h3><div class="card"><table><tr><th>卖点</th><th>文案</th><th>图片文字</th><th>视频字幕</th><th>对版</th></tr><tr><td>示例卖点 1</td><td>原句一致</td><td>原句一致</td><td>原句一致</td><td>✓ 通过</td></tr><tr><td>示例卖点 2</td><td>原句一致</td><td>文字超出版式</td><td>原句一致</td><td><span class="amber-t">△ 黄标，进下栏</span></td></tr></table><p class="sample">质检三关顺序固定：规格 → 合规 → 对版，前关硬拦截后关不跑。本栏不直接改终稿，点单项进黄标队列改。</p></div>
<h3>黄标队列（P7）</h3><div class="card"><p class="sample">过滤：硬拦截直接排除；程序能算的直接通过；只剩黄标逐项看；事实回溯只看“宣称句”。100 条结果里队列目标 6–10 项。</p>
<table><tr><th>黄标项</th><th>类型</th><th>状态 / 操作</th></tr><tr v-for="r in store.review" :key="r.item"><td>{{ r.item }}</td><td>{{ r.type }}</td><td>{{ r.state }} <button class="btn ghost" @click="r.state='已通过'">通过</button> <button class="btn ghost" @click="r.state='已打回'">打回</button></td></tr></table>
<p class="red">黄标没有“批量通过”按钮；“全部通过”只对无黄标项有效。</p></div>
<div class="card"><h3>签字栏</h3><p>签字只批终稿，<b>不等于上架</b>。签字后版本冻结，改了须新开修订版，不直接改已冻结终稿。</p><button class="btn disabled" disabled>签字（黄标未清，置灰）</button></div>
<div class="foot"><button class="btn ghost" @click="store.page='p5'">← 回生成 P5</button><button class="btn primary" @click="store.page='p8'">签字后 → 导出 P8</button></div></div></template>
<script setup>import { store } from '../store.js'</script>
