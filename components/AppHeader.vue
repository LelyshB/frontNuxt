<template>
  <header :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300', isScrolled ? 'py-3' : 'py-4']">
    <nav class="container mx-auto px-4">
      <div
        :class="[
          'glass-surface glass-hover flex items-center justify-between gap-4 rounded-full px-6 py-3 transition-all duration-300 backdrop-blur-xl',
          isScrolled ? 'shadow-glass' : ''
        ]"
      >
        <a href="#hero" class="flex items-center gap-3 text-text-base focus-cosmic">
          <span class="sr-only">Cosmic home</span>
          <div class="relative flex h-10 w-10 items-center justify-center">
            <Star class="h-8 w-8 text-violet" fill="currentColor" />
            <div class="absolute inset-0 animate-pulse">
              <Star class="h-8 w-8 text-magenta opacity-50" />
            </div>
          </div>
          <span class="font-heading text-xl font-bold">Cosmic</span>
        </a>

        <div class="hidden items-center space-x-6 md:flex">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-300 ease-[var(--ease-cosmic)] focus-cosmic"
            :aria-current="activeSection === item.href ? 'page' : undefined"
            @click="handleNavSelect(item.href)"
          >
            <span
              class="relative inline-flex items-center justify-center px-1 text-current transition-colors duration-300 ease-[var(--ease-cosmic)] after:pointer-events-none after:absolute after:left-1/2 after:-bottom-2 after:h-[2.5px] after:w-[calc(100%+18px)] after:-translate-x-1/2 after:origin-center after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-[hsl(var(--amethyst))] after:via-[hsl(var(--rose))] after:to-[hsl(var(--aurora-teal))] after:opacity-0 after:transition-[transform,opacity] after:duration-400 after:ease-[var(--ease-cosmic)] after:content-['']"
              :class="[
                activeSection === item.href
                  ? 'text-transparent bg-clip-text bg-[linear-gradient(95deg,hsl(var(--amethyst)),hsl(var(--rose)))] after:scale-x-100 after:opacity-100'
                  : 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[linear-gradient(95deg,hsl(var(--amethyst)),hsl(var(--rose)))] group-hover:after:scale-x-100 group-hover:after:opacity-100'
              ]"
            >
              <span class="relative z-10">{{ item.name }}</span>
            </span>
          </a>
        </div>

        <div class="hidden md:block">
          <a href="#readings" class="btn-cosmic text-sm">
            Get Reading
          </a>
        </div>

        <button
          @click="toggleMenu"
          class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass-surface glass-hover focus-cosmic transition-transform duration-200 hover:scale-110"
          aria-label="Toggle menu"
        >
          <component :is="isMenuOpen ? XIcon : MenuIcon" class="h-5 w-5 text-text-base" />
        </button>
      </div>

      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="md:hidden mt-4 rounded-2xl glass-surface p-6 backdrop-blur-xl shadow-glass"
        >
          <nav class="space-y-4">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              class="block rounded-lg px-4 py-3 text-text-base transition-colors duration-200 hover:bg-surface/60 hover:text-white focus-cosmic"
              @click="handleNavSelect(item.href)"
            >
              {{ item.name }}
            </a>
            <div class="border-t border-white/10 pt-4">
              <a href="#readings" class="btn-cosmic w-full" @click="closeMenu">
                Get Reading
              </a>
            </div>
          </nav>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Menu as MenuIcon, Star, X as XIcon } from 'lucide-vue-next'

const navItems = [
  { name: 'Readings', href: '#readings' },
  { name: 'Zodiac', href: '#zodiac' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
]

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref(navItems[0]?.href ?? '#hero')
let scrollHandler: (() => void) | null = null
let sectionObserver: IntersectionObserver | null = null

function isSectionEntry(
  entry: IntersectionObserverEntry
): entry is IntersectionObserverEntry & { target: HTMLElement } {
  return entry.target instanceof HTMLElement
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function handleNavSelect(href: string) {
  activeSection.value = href
  closeMenu()
}

onMounted(() => {
  if (typeof window === 'undefined') return

  scrollHandler = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', scrollHandler)
  scrollHandler()

  const sections = navItems
    .map((item) => {
      const target = document.querySelector(item.href)
      return target instanceof HTMLElement ? target : null
    })
    .filter((section): section is HTMLElement => Boolean(section))

  if (sections.length) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(isSectionEntry)
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          const [topEntry] = visible
          if (topEntry) {
            activeSection.value = `#${topEntry.target.id}`
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.2, 0.4, 0.6] }
    )
    sections.forEach((section) => sectionObserver?.observe(section))
  }
})

onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  sectionObserver?.disconnect()
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
