<template>
  <!-- Canvas element used to render a simple starfield animation.  The
       canvas fills its container and is positioned absolutely by
       whichever parent uses this component. -->
  <canvas ref="el" class="absolute inset-0 w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// A lightweight starfield implementation.  It creates a set of
// points with x/y/z coordinates and animates them by moving them
// towards the viewer.  When a star reaches a near‑zero z value it
// wraps back to the far plane.  This gives a subtle twinkling
// background effect without dragging down frame rates.
const el = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ctx: CanvasRenderingContext2D | null = null
let stars: { x: number; y: number; z: number }[] = []
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
    x: Math.random() * w - w / 2,
    y: Math.random() * h - h / 2,
    z: Math.random() * 0.9 + 0.1
  }))
}

function tick() {
  if (!ctx || !el.value) return
  const w = el.value.clientWidth
  const h = el.value.clientHeight
  ctx.clearRect(0, 0, w, h)
  stars.forEach((s) => {
    s.z -= 0.002
    if (s.z <= 0.05) s.z = 1
    const sx = s.x / s.z + w / 2
    const sy = s.y / s.z + h / 2
    const r = Math.max(0.5, 2 * (1 - s.z))
    ctx!.beginPath()
    ctx!.arc(sx, sy, r, 0, Math.PI * 2)
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