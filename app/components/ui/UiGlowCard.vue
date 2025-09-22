<script setup lang="ts">
import { ref } from 'vue'
const r = ref<HTMLElement | null>(null)
function onMove(e: PointerEvent) {
  const el = r.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  el.style.setProperty('--mx', x + 'px')
  el.style.setProperty('--my', y + 'px')
}
</script>

<template>
  <div ref="r" @pointermove="onMove"
       class="group relative rounded-2xl border p-5 transition bg-white hover:shadow-xl overflow-hidden">
    <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
         style="background:
           radial-gradient(240px 180px at var(--mx) var(--my),
             rgba(99,102,241,.12), transparent 55%),
           radial-gradient(380px 220px at var(--mx) var(--my),
             rgba(45,212,191,.08), transparent 60%);"></div>
    <slot />
  </div>
</template>