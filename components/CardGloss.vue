<script setup lang="ts">
const onEnter = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement | null
  if (!target) return
  if (typeof window === 'undefined') return
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
  const rect = target.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height
  target.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(1.02)`
}

const onLeave = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement | null
  if (!target) return
  if (typeof window === 'undefined') return
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    target.style.transform = 'none'
    return
  }
  target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
}
</script>

<template>
  <div
    class="group cursor-pointer transform-gpu transition-transform duration-200 ease-out motion-reduce:transform-none"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="glass-surface gloss p-6">
      <slot />
    </div>
  </div>
</template>
