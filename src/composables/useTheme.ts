import { ref, computed, watch, readonly } from 'vue'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')
const systemPreference = ref<Theme>('light')

// Check system preference
if (typeof window !== 'undefined') {
  systemPreference.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  // Load saved theme or use system preference
  const savedTheme = localStorage.getItem('hero-app-theme') as Theme
  theme.value = savedTheme || systemPreference.value

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    systemPreference.value = e.matches ? 'dark' : 'light'
    if (!localStorage.getItem('hero-app-theme')) {
      theme.value = systemPreference.value
    }
  })
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  const resetToSystem = () => {
    theme.value = systemPreference.value
    localStorage.removeItem('hero-app-theme')
  }

  // Apply theme to document
  watch(
    theme,
    (newTheme) => {
      if (typeof document !== 'undefined') {
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('hero-app-theme', newTheme)
      }
    },
    { immediate: true },
  )

  return {
    theme: readonly(theme),
    isDark,
    isLight,
    systemPreference: readonly(systemPreference),
    toggleTheme,
    setTheme,
    resetToSystem,
  }
}
