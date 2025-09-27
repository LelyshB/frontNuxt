<script setup lang="ts">
import { useAttrs } from 'vue'
import GlowCard from '@/components/GlowCard.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <GlowCard
    v-bind="attrs"
    hover3d
    glowIntensity="high"
    class="w-full"
  >
    <slot />
  </GlowCard>
</template>
