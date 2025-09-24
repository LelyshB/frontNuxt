<template>
  <!--
    A full‑screen canvas rendering a simple animated starfield.
    This component ports the original React implementation to Vue 3.
  -->
  <canvas
    ref="canvas"
    class="absolute inset-0 w-full h-full"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const animationId = ref<number>()
const stars = ref<Star[]>([])
const prefersReducedMotion = ref(false)

onMounted(() => {
  if (!canvas.value) return
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  const handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches
  }
  mediaQuery.addEventListener('change', handleChange)

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const resizeCanvas = () => {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    // Generate stars based on viewport size
    const starCount = Math.min(
      50,
      Math.floor((canvas.value.width * canvas.value.height) / 20000)
    )
    stars.value = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.value!.width,
      y: Math.random() * canvas.value!.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.2 + 0.1,
      opacity: Math.random() * 0.8 + 0.2,
    }))
  }

  const animate = (timestamp: number) => {
    if (!canvas.value || !ctx) return
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    // Draw each star
    stars.value.forEach((star) => {
      ctx.save()
      ctx.globalAlpha = star.opacity
      ctx.fillStyle = '#ffffff'
      ctx.shadowBlur = star.size * 2
      ctx.shadowColor = '#ffffff'
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      // Animate star movement and pulsing if motion is allowed
      if (!prefersReducedMotion.value) {
        star.x -= star.speed
        if (star.x < -10) {
          star.x = canvas.value.width + 10
          star.y = Math.random() * canvas.value.height
        }
        // Subtle opacity pulse
        star.opacity += Math.sin(timestamp * 0.001 + star.x * 0.01) * 0.01
        star.opacity = Math.max(0.2, Math.min(0.8, star.opacity))
      }
    })
    if (!prefersReducedMotion.value) {
      animationId.value = window.requestAnimationFrame(animate)
    }
  }

  resizeCanvas()
  animate(0)
  window.addEventListener('resize', resizeCanvas)

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
    if (animationId.value !== undefined) {
      cancelAnimationFrame(animationId.value)
    }
    mediaQuery.removeEventListener('change', handleChange)
  })
})
</script>

<style scoped>
/* Ensure the canvas sits behind other elements */
canvas {
  pointer-events: none;
  z-index: 0;
}
</style>