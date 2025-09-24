<template>
  <div class="relative inline-flex group">
    <div
      class="orbit-ring pointer-events-none absolute inset-0 rounded-full border border-violet/30"
      :style="ringStyle"
    >
      <div
        class="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet to-magenta shadow-glow-violet"
      />
    </div>

    <div
      class="relative flex items-center justify-center rounded-full glass-surface glass-hover transition-all duration-200 ease-cosmic transform-gpu group-hover:scale-110 group-hover:shadow-glow-violet"
      :class="sizeClass"
    >
      <component
        :is="icon"
        :size="iconPixelSize"
        class="transition-colors duration-200 text-text-base group-hover:text-violet"
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
