<template>
  <!--
    A small card that displays the zodiac sign name, date range and
    description.  The card gently tilts towards the cursor on hover,
    emulating the interactive feel of the original React version.
  -->
  <div
    ref="cardRef"
    tabindex="0"
    class="group relative overflow-hidden rounded-2xl border border-[color:var(--border-default)] bg-surface/80 p-6 shadow-[0_26px_60px_rgba(10,8,35,0.45)] backdrop-blur-lg transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-cosmic)] transform-gpu ring-1 ring-transparent before:pointer-events-none before:absolute before:inset-px before:rounded-[inherit] before:bg-[radial-gradient(120%_120%_at_50%_-8%,hsla(var(--violet)/0.18),hsla(var(--magenta)/0.12)_55%,transparent)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-[var(--ease-cosmic)] before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(85%_120%_at_50%_0%,hsla(var(--mint)/0.14),transparent)] after:opacity-0 after:transition-opacity after:duration-500 after:ease-[var(--ease-cosmic)] after:content-[''] hover:-translate-y-[3px] hover:scale-[1.01] hover:border-[color:hsl(var(--violet)/0.35)] hover:shadow-[0_38px_88px_rgba(27,18,56,0.55)] hover:ring-[color:hsl(var(--violet)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:hsl(var(--violet)/0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950 focus-visible:border-[color:hsl(var(--violet)/0.35)] group-hover:before:opacity-100 group-hover:after:opacity-100 group-focus-visible:before:opacity-100 group-focus-visible:after:opacity-100 motion-reduce:hover:transform-none motion-reduce:hover:shadow-[0_26px_60px_rgba(10,8,35,0.45)] motion-reduce:transition-none"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
    @focus="handleFocus"
    @blur="resetTilt"
    data-zodiac-card
  >
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-6 top-4 h-24 rounded-[999px] bg-[radial-gradient(120%_80%_at_50%_0%,hsla(var(--violet)/0.28),hsla(var(--magenta)/0.16)_55%,transparent)] opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
    />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-8 h-[2px] w-[68%] -translate-x-1/2 rounded-full bg-gradient-to-r from-white/70 via-white/30 to-transparent opacity-0 transition-all duration-500 ease-[var(--ease-cosmic)] group-hover:translate-y-[-2px] group-hover:opacity-80 group-focus-visible:translate-y-[-2px] group-focus-visible:opacity-80 motion-reduce:transition-none"
    />
    <div
      ref="contentRef"
      class="relative z-10 flex flex-col text-center transition-transform duration-500 ease-[var(--ease-cosmic)] motion-reduce:transition-none"
      :style="{ transform: transformStyle }"
    >
      <div class="mb-6 flex justify-center">
        <div
          class="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[color:var(--border-default)] bg-gradient-to-br from-white/5 via-white/10 to-transparent shadow-[0_16px_32px_rgba(128,90,255,0.25)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-cosmic)] group-hover:border-[color:hsl(var(--violet)/0.45)] group-hover:shadow-[0_26px_52px_rgba(128,90,255,0.35)] group-focus-visible:border-[color:hsl(var(--violet)/0.45)] group-focus-visible:shadow-[0_26px_52px_rgba(128,90,255,0.35)] motion-reduce:transition-none"
          :style="{ transform: iconTransform }"
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-cosmic)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            style="background: linear-gradient(135deg, hsla(var(--violet), 0.32), hsla(var(--magenta), 0.18) 55%, transparent);"
          />
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
const iconTransform = ref('translate3d(0, 0, 0) scale(1)')

let motionQuery: MediaQueryList | null = null

const ensureMotionQuery = () => {
  if (typeof window === 'undefined') return null
  if (!motionQuery) {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  }
  return motionQuery
}

const prefersReducedMotion = () => ensureMotionQuery()?.matches ?? false

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const setIconPose = (angle = 0, lift = 0, scale = 1) => {
  iconTransform.value = `translate3d(0, ${lift}px, 0) scale(${scale}) rotate(${angle}deg)`
}

function handleMouseEnter() {
  if (prefersReducedMotion()) return
  transformStyle.value = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1.02)'
  setIconPose(0, -6, 1.06)
}

function handleMouseMove(event: MouseEvent) {
  if (prefersReducedMotion()) return
  const target = cardRef.value
  const content = contentRef.value
  if (!target || !content) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height
  transformStyle.value = `perspective(1100px) rotateX(${ -y * 6 }deg) rotateY(${ x * 6 }deg) scale(1.02)`
  const rotation = clamp(x * 14, -8, 8)
  setIconPose(rotation, -8, 1.08)
}

function handleFocus() {
  if (prefersReducedMotion()) return
  transformStyle.value = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1.02)'
  setIconPose(0, -6, 1.06)
}

function resetTilt() {
  transformStyle.value = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
  setIconPose(0, 0, 1)
}
</script>
