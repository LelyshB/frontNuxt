<template>
  <!--
    A small card that displays the zodiac sign name, date range and
    description.  The card gently tilts towards the cursor on hover,
    emulating the interactive feel of the original React version.
  -->
  <div
    ref="cardRef"
    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-[0_26px_60px_rgba(10,8,35,0.45)] backdrop-blur-lg transition-all duration-500 ease-[var(--ease-cosmic)] transform-gpu ring-1 ring-transparent before:pointer-events-none before:absolute before:inset-px before:rounded-[inherit] before:bg-[radial-gradient(120%_140%_at_50%_-10%,hsla(var(--violet)/0.16),transparent_72%)] before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(125deg,hsla(var(--magenta)/0.12),hsla(var(--aurora-teal)/0.08)_55%,transparent)] after:opacity-0 after:transition-opacity after:duration-700 after:content-[''] hover:-translate-y-[2px] hover:scale-[1.01] hover:shadow-[0_32px_70px_rgba(10,8,35,0.55)] hover:ring-[color:var(--border-hover)] focus-within:ring-2 focus-within:ring-[color:hsl(var(--violet)/0.45)] focus-within:ring-offset-2 focus-within:ring-offset-bg-950 group-hover:before:opacity-100 group-hover:after:opacity-100 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:transition-none"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
    data-zodiac-card
  >
    <div
      ref="contentRef"
      class="relative z-10 flex flex-col text-center transition-transform duration-500 ease-[var(--ease-cosmic)]"
      :style="{ transform: transformStyle }"
    >
      <div class="mb-6 flex justify-center">
        <div
          class="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent shadow-[0_16px_32px_rgba(128,90,255,0.25)] transition-transform duration-500 ease-[var(--ease-cosmic)] group-hover:rotate-[12deg] group-hover:scale-110 group-hover:shadow-[0_24px_46px_rgba(128,90,255,0.35)] motion-reduce:group-hover:transform-none"
        >
          <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style="background: radial-gradient(circle at 30% 20%, hsla(var(--violet), 0.25), transparent 55%);" />
          <slot name="icon" />
        </div>
      </div>
      <h3 class="mb-1 font-heading text-xl font-bold text-text-base">{{ name }}</h3>
      <p class="mb-2 text-sm font-medium tracking-wide text-text-muted/80">{{ dateRange }}</p>
      <p class="text-sm leading-relaxed text-text-muted">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props describing a zodiac sign.  The icon is provided via the named
// `icon` slot.
defineProps<{ name: string; dateRange: string; description: string }>()

const cardRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const transformStyle = ref('perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)')

function handleMouseMove(event: MouseEvent) {
  if (typeof window === 'undefined') return
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (media.matches) return
  const target = cardRef.value
  const content = contentRef.value
  if (!target || !content) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height
  transformStyle.value = `perspective(1100px) rotateX(${ -y * 5 }deg) rotateY(${ x * 5 }deg) scale(1.02)`
}

function resetTilt() {
  transformStyle.value = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>