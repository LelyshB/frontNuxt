<template>
  <!--
    A small card that displays the zodiac sign name, date range and
    description.  The card gently tilts towards the cursor on hover,
    emulating the interactive feel of the original React version.
  -->
  <div
    class="relative rounded-2xl glass-surface glass-hover p-6 transition-transform duration-200 ease-cosmic"
    @mousemove="handleMouseMove"
    @mouseleave="resetTilt"
    :style="{ transform: transformStyle }"
    data-zodiac-card
  >
    <!-- Icon slot; the parent can provide any SVG or component here -->
    <div class="mb-4 flex justify-center">
      <slot name="icon" />
    </div>
    <h3 class="text-xl font-heading font-bold mb-1">{{ name }}</h3>
    <p class="text-sm text-text-muted mb-2">{{ dateRange }}</p>
    <p class="text-sm text-text-muted">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props describing a zodiac sign.  The icon is provided via the named
// `icon` slot.
defineProps<{ name: string; dateRange: string; description: string }>()

// Inline reactive state for the tilt effect
const transformStyle = ref('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')

function handleMouseMove(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height
  transformStyle.value = `perspective(1000px) rotateX(${ -y * 4 }deg) rotateY(${ x * 4 }deg) scale(1.02)`
}

function resetTilt(event: MouseEvent) {
  transformStyle.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>