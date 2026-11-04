<template><div><h2>P1 产品档案页</h2><p class="purpose">一次建档，终身复用。唯一事实源：产品事实。素材与确认值分两个字段存，对照区并列显示。</p>
<div class="grid2"><div class="card"><label>品牌 *</label><input v-model="store.profile.brand"><label>产品类型 *</label><input v-model="store.profile.type"><label>站点 / 类目</label><input v-model="store.profile.site">
<label><input type="checkbox" v-model="store.profile.packIncludesBag" style="width:auto"> 包装含网袋（未勾选 = 不含）</label>
<p class="sample">新档案只提示“先填品牌和产品类型，其他可以后补”；必填是“生成时必填”，不是“建档时必填”。</p></div>
<div class="card"><h3>素材 vs 确认值对照</h3><table><tr><th>字段</th><th>素材识别值</th><th>确认值</th></tr><tr><td>颜色</td><td>{{ store.profile.colorMaterial }}</td><td>{{ store.profile.colorConfirmed }} <span class="amber-t">△ 不一致，以确认值为准</span></td></tr><tr><td>包装网袋</td><td>图片里有网袋</td><td>{{ store.profile.packIncludesBag ? '已勾选 = 含' : '未勾选 = 不含' }} <span v-if="!store.profile.packIncludesBag" class="red">! 去 P2 硬拦截</span></td></tr></table>
<p>认证只写勾选过的，证书扫描件为准；未传扫描件的勾选 → P2 硬拦截或取消勾选二选一。</p></div></div>
<div class="card"><h3>变体（每变体一行，颜色 / 数量 / 主图挂变体）</h3><table><tr><th>变体</th><th>颜色</th><th>数量</th><th>主图</th></tr><tr><td>变体 1</td><td>示例色 A</td><td>1</td><td>MAIN 已挂</td></tr></table></div>
<div class="foot"><button class="btn ghost" @click="store.page='p0'">← 回 P0</button><span><button class="btn ghost" @click="store.page='p3'">去卖点池 P3</button> <button class="btn primary" @click="store.page='p2'">去上传 P2 →</button></span></div></div></template>
<script setup>import { store } from '../store.js'</script>
