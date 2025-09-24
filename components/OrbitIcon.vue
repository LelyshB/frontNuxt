<template>
  <div class="relative inline-flex transition-transform duration-500 ease-[var(--ease-cosmic)] group/orbit">
    <div
      class="orbit-ring pointer-events-none absolute inset-0 rounded-full border border-violet/30 opacity-80 transition-opacity duration-500 group-hover/orbit:opacity-100"
      :style="ringStyle"
    >
      <div
        class="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet to-magenta shadow-glow-violet"
      />
    </div>

    <div
      class="relative flex items-center justify-center rounded-full glass-surface glass-hover transition-all duration-500 ease-[var(--ease-cosmic)] transform-gpu ring-1 ring-transparent group-hover/orbit:-translate-y-[1px] group-hover/orbit:scale-[1.08] group-hover/orbit:ring-[color:var(--border-hover)] group-hover/orbit:shadow-[0_18px_32px_rgba(128,90,255,0.4)] motion-reduce:transition-none motion-reduce:transform-none"
      :class="sizeClass"
    >
      <div
        class="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/orbit:opacity-100"
        style="background: radial-gradient(circle at 30% 20%, hsla(var(--violet), 0.25), transparent 60%);"
      />
      <component
        :is="icon"
        :size="iconPixelSize"
        class="transition-all duration-500 ease-[var(--ease-cosmic)] text-text-base group-hover/orbit:text-violet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

const sizeMap = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
} as const

const iconSizeMap = {
  sm: 20,
  md: 24,
  lg: 28,
} as const

type OrbitSize = keyof typeof sizeMap

const props = withDefaults(
  defineProps<{
    icon: Component
    size?: OrbitSize
  }>(),
  {
    size: 'md' as OrbitSize,
  }
)

const sizeClass = computed(() => sizeMap[props.size])
const iconPixelSize = computed(() => iconSizeMap[props.size])

const ringStyle = computed(() => ({
  width: 'calc(100% + 16px)',
  height: 'calc(100% + 16px)',
  left: '-8px',
  top: '-8px',
}))
</script>
