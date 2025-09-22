<script setup lang="ts">
defineProps<{ hover?: boolean }>()
</script>

<template>
  <div
    class="rounded-2xl border p-5 transition bg-white"
    :class="hover !== false ? 'hover:shadow-lg hover:-translate-y-0.5' : ''"
  >
    <slot />
  </div>
</template>