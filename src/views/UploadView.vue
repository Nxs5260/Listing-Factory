<template><div><h2>P2 上传与缺口清单页</h2><p class="purpose">一次上传就知道缺什么。唯一事实源：上传文件 + 缺口清单。</p>
<div class="card" style="border-style:dashed;text-align:center;color:#6b7280">⬆ 拖拽图片 / 视频 / 关键词表 / 规格书 / 旧 Listing 到这里（v1 演示，不上传真实文件）<br><br><button class="btn ghost" @click="showModal=true">模板导入 → P13 弹窗</button></div>
<div class="block-red"><span class="red">! 硬拦截 {{ store.gaps.hard }}</span> · 本体实拍图缺失 —— 主图任务不启动；包装勾选缺失 —— 不能生成</div><br>
<div class="block-amber"><span class="amber-t">△ 降级 {{ store.gaps.warn }}</span> · 高优先级源缺失，用下一源并标 <span class="blue">↓</span> + 链位置</div><br>
<div class="block-grey">◇ AI 推断 {{ store.gaps.inferred }} · 无来源场景联想，默认不进终稿</div>
<div class="foot"><button class="btn ghost" @click="store.page='p1'">去档案勾选 P1</button><button class="btn disabled" disabled title="硬拦截未清，点击可看原因" @click="alert('硬拦截 1：本体实拍图缺失，先去 P1 / 补图')">去卖点池定稿并开始生成（置灰）</button></div>
<p class="sample">点置灰按钮 → 跳到第一个硬拦截项。按钮文案不许写成“点一下直接出成片”。旧 Listing 差异标红等人确认，不静默沿用。</p>
<div v-if="showModal" class="modal"><div class="modalbox"><h2>P13 模板导入弹窗</h2><p>列映射不过，停在弹窗里，不强行导入；不改系统字段定义。</p>
<table><tr><th>源表列</th><th>→ 系统字段</th><th>样例</th></tr><tr><td>关键词</td><td>→ 词形</td><td>示例词 1</td></tr><tr><td>排名</td><td>→ ABA 排名 min</td><td>128</td></tr></table>
<p class="sample">样例 5–10 行；三件套：来源 + 导出日期 + 统计周期，缺一件即降级。</p>
<div class="foot"><button class="btn ghost" @click="showModal=false">取消</button><button class="btn primary" @click="showModal=false">映射通过 → 回 P2</button></div></div></div>
</div></template>
<script setup>import { ref } from 'vue'; import { store } from '../store.js'; const showModal = ref(false)</script>
