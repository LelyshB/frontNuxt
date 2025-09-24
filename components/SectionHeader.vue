<template>
  <!--
    Generic section header used throughout the site.  It accepts a title,
    subtitle and optional description and can apply a gradient effect to
    the title text.  Additional markup may be provided via the default
    slot, which is rendered below the description.
  -->
  <div :class="['text-center mb-8', className]">
    <p
      v-if="subtitle"
      class="text-sm uppercase tracking-wide text-aurora-teal mb-2"
    >
      {{ subtitle }}
    </p>
    <h2
      :class="['mb-4', titleGradient ? 'gradient-text' : '']"
      class="text-3xl md:text-4xl font-heading font-bold"
    >
      {{ title }}
    </h2>
    <p v-if="description" class="max-w-2xl mx-auto text-text-muted">
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  description?: string
  className?: string
  titleGradient?: boolean
}>()
</script>