<template>
  <!--
    Responsive application header. It sticks to the top of the page and
    changes its background opacity when the page is scrolled. The
    navigation collapses into a mobile menu on smaller breakpoints.
  -->
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-bg-900/70 backdrop-blur-md shadow-glass' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto flex justify-between items-center py-4">
      <!-- Logo / Title -->
      <a href="#" class="flex items-center space-x-2 gradient-text text-2xl font-bold">
        <span>Cosmic</span>
      </a>
      <!-- Desktop navigation -->
      <nav class="hidden md:flex space-x-8">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          class="text-text-muted hover:text-white transition-colors duration-200"
        >
          {{ item.name }}
        </a>
      </nav>
      <!-- Desktop CTA button -->
      <a
        href="#readings"
        class="hidden md:inline-flex btn-cosmic ml-6"
      >
        Get Reading
      </a>
      <!-- Mobile menu toggle -->
      <button
        @click="toggleMenu"
        class="md:hidden p-2 rounded-full glass-surface glass-hover focus-cosmic transform-gpu transition-transform duration-200 hover:scale-110"
        aria-label="Toggle menu"
      >
        <component :is="isMenuOpen ? XIcon : MenuIcon" class="w-6 h-6 text-text-base" />
      </button>
    </div>
    <!-- Mobile navigation dropdown -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-bg-900/90 backdrop-blur-md shadow-glass absolute top-full left-0 w-full py-4"
      >
        <nav class="flex flex-col space-y-4 items-center">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click="closeMenu"
            class="text-text-muted hover:text-white transition-colors duration-200"
          >
            {{ item.name }}
          </a>
          <a
            href="#readings"
            class="btn-cosmic mt-2"
            @click="closeMenu"
          >
            Get Reading
          </a>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// Import icon components from lucide for Vue.  Users must install the
// `lucide-vue-next` package to use these icons.  If the package is
// unavailable the icons can be swapped for custom SVGs.
import { Menu as MenuIcon, X as XIcon } from 'lucide-vue-next'

// Navigation items used in both desktop and mobile menus.
const navItems = [
  { name: 'Readings', href: '#readings' },
  { name: 'Zodiac', href: '#zodiac' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
]

// Reactive state for menu toggling and scroll detection
const isMenuOpen = ref(false)
const isScrolled = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>