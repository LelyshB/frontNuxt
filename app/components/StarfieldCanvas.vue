<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const el = ref<HTMLCanvasElement | null>(null)
let raf = 0, ctx: CanvasRenderingContext2D | null = null
let stars: {x:number;y:number;z:number}[] = []
const STAR_NUM = 200

function resize() {
  if (!el.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = el.value.clientWidth
  const h = el.value.clientHeight
  el.value.width = Math.floor(w * dpr)
  el.value.height = Math.floor(h * dpr)
  ctx = el.value.getContext('2d')
  ctx?.scale(dpr, dpr)
}

function init() {
  const w = el.value?.clientWidth || 1
  const h = el.value?.clientHeight || 1
  stars = Array.from({ length: STAR_NUM }, () => ({
    x: Math.random() * w - w/2,
    y: Math.random() * h - h/2,
    z: Math.random() * 0.9 + 0.1
  }))
}

function tick() {
  if (!ctx || !el.value) return
  const w = el.value.clientWidth, h = el.value.clientHeight
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(0,0,0,0)'
  stars.forEach(s => {
    s.z -= 0.002
    if (s.z <= 0.05) s.z = 1
    const sx = (s.x / s.z) + w/2
    const sy = (s.y / s.z) + h/2
    const r = Math.max(0.5, 2 * (1 - s.z))
    ctx!.beginPath()
    ctx!.arc(sx, sy, r, 0, Math.PI * 2)
    ctx!.fillStyle = 'rgba(0,0,0,0.0)'
    ctx!.fill()
    ctx!.fillStyle = 'rgba(255,255,255,0.9)'
    ctx!.fill()
  })
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  resize()
  init()
  tick()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas ref="el" class="absolute inset-0 -z-10"></canvas>
</template>