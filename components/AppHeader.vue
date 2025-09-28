<template>
  <header class="relative z-50 pt-6">
    <nav
      ref="navRef"
      data-header-pill
      class="sticky top-6 z-50 mx-auto w-[min(1200px,92%)] rounded-full bg-black/60 backdrop-blur px-6 py-4 transition-all motion-safe:duration-300 motion-reduce:transition-none data-[scrolled=true]:py-2 data-[scrolled=true]:ring-1 data-[scrolled=true]:ring-white/10 data-[scrolled=true]:shadow-md"
    >
      <div class="flex items-center justify-between gap-4">
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

        <ul class="hidden flex-1 items-center justify-center gap-3 md:flex">
          <li v-for="item in navItems" :key="item.name">
            <NuxtLink
              :to="item.href"
              class="group relative px-4 py-2 text-sm font-medium text-slate-200 transition-colors motion-safe:transition-colors motion-safe:duration-300 hover:text-white focus-visible:outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-pink-500/60 after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-fuchsia-400 after:to-pink-500 motion-safe:after:transition-transform motion-safe:after:duration-300 group-hover:after:scale-x-100 focus-visible:after:scale-x-100"
              :class="{
                'text-white after:scale-x-100': activeSection === item.href,
              }"
              :aria-current="activeSection === item.href ? 'page' : undefined"
              @click="handleNavSelect(item.href)"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>

        <div class="hidden md:block">
          <a href="#readings" class="btn-cosmic text-sm">
            Get Reading
          </a>
        </div>

        <button
          @click="toggleMenu"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60 md:hidden"
          aria-label="Toggle menu"
        >
          <component :is="isMenuOpen ? XIcon : MenuIcon" class="h-5 w-5" />
        </button>
      </div>

      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="mt-4 rounded-2xl bg-black/70 p-6 text-text-base backdrop-blur md:hidden"
        >
          <nav class="space-y-4">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              class="block rounded-lg px-4 py-3 text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60"
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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Menu as MenuIcon, Star, X as XIcon } from 'lucide-vue-next'

const navItems = [
  { name: 'Readings', href: '#readings' },
  { name: 'Zodiac', href: '#zodiac' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
]

const navRef = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)
const activeSection = ref<string | null>(null)
let sectionObserver: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null
let windowResizeHandler: (() => void) | null = null

const setHeaderHeight = () => {
  if (typeof window === 'undefined') return
  requestAnimationFrame(() => {
    const nav = navRef.value
    if (!nav) return
    const styles = window.getComputedStyle(nav)
    const topOffset = Number.parseFloat(styles.top ?? '0') || 0
    const height = nav.offsetHeight + topOffset
    document.documentElement.style.setProperty('--header-height', `${height}px`)
  })
}

function isSectionEntry(
  entry: IntersectionObserverEntry,
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

watch(isMenuOpen, () => setHeaderHeight())

onMounted(() => {
  if (typeof window === 'undefined') return

  setHeaderHeight()
  const nav = navRef.value
  if (typeof ResizeObserver !== 'undefined' && nav) {
    resizeObserver = new ResizeObserver(() => setHeaderHeight())
    resizeObserver.observe(nav)
  }

  windowResizeHandler = () => setHeaderHeight()
  window.addEventListener('resize', windowResizeHandler)

  const initialHash = window.location.hash
  if (initialHash && navItems.some((item) => item.href === initialHash)) {
    activeSection.value = initialHash
  }

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
        } else if (window.scrollY <= 20) {
          activeSection.value = null
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.2, 0.4, 0.6] },
    )
    sections.forEach((section) => sectionObserver?.observe(section))
  }
})

onBeforeUnmount(() => {
  if (windowResizeHandler) {
    window.removeEventListener('resize', windowResizeHandler)
  }
  sectionObserver?.disconnect()
  resizeObserver?.disconnect()
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--header-height')
  }
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
