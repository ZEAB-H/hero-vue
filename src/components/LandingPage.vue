<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-500"
  >
    <!-- Navigation -->
    <nav class="relative z-10 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="text-3xl">🦸‍♂️</div>
          <span
            class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400"
          >
            HeroVault
          </span>
        </div>

        <div class="flex items-center space-x-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg
              v-if="isDark"
              class="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <button
            @click="$emit('enterApp')"
            class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Enter App
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative px-6 py-20">
      <!-- Background Animation -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"
        ></div>
        <div
          class="absolute -bottom-40 -left-32 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"
        ></div>
        <div
          class="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto text-center">
        <div class="animate-fade-in-up">
          <h1 class="text-6xl md:text-8xl font-bold mb-6">
            <span
              class="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400"
            >
              HeroVault
            </span>
          </h1>
          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Manage your superhero collection with style. Create, edit, and organize your heroes with
            beautiful UI and smooth animations.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              @click="$emit('enterApp')"
              class="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              <span class="flex items-center space-x-2">
                <span>Get Started</span>
                <svg
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            <button
              @click="scrollToFeatures"
              class="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
            >
              Learn More
            </button>
          </div>
        </div>

        <!-- Hero Cards Preview -->
        <div class="mt-20 animate-fade-in-up animation-delay-500">
          <div class="relative">
            <div class="flex justify-center space-x-4 overflow-hidden">
              <div
                v-for="(hero, index) in previewHeroes"
                :key="hero.id"
                class="transform transition-all duration-1000 hover:scale-105"
                :class="`animate-float animation-delay-${index * 1000}`"
              >
                <div
                  class="w-64 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50"
                >
                  <div class="flex items-center space-x-3 mb-4">
                    <div
                      :class="`w-12 h-12 ${hero.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`"
                    >
                      {{ hero.name.charAt(0) }}
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-800 dark:text-gray-200">{{ hero.name }}</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ hero.secret_name }}</p>
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Age: {{ hero.age }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="relative px-6 py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Powerful Features
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to manage your superhero collection
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            :class="`animate-fade-in-up animation-delay-${(index + 1) * 200}`"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="relative px-6 py-20">
      <div class="max-w-7xl mx-auto text-center">
        <div class="grid md:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="animate-fade-in-up"
            :class="`animation-delay-${index * 100}`"
          >
            <div class="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-600 dark:text-gray-400 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()

defineEmits(['enterApp'])

const previewHeroes = [
  {
    id: 1,
    name: 'Superman',
    secret_name: 'Clark Kent',
    age: 35,
    gradient: 'bg-gradient-to-br from-blue-500 to-red-500',
  },
  {
    id: 2,
    name: 'Wonder Woman',
    secret_name: 'Diana Prince',
    age: 3000,
    gradient: 'bg-gradient-to-br from-yellow-500 to-red-500',
  },
  {
    id: 3,
    name: 'Batman',
    secret_name: 'Bruce Wayne',
    age: 42,
    gradient: 'bg-gradient-to-br from-gray-700 to-black',
  },
]

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Built with Vue 3 and Vite for incredible performance and smooth user experience.',
  },
  {
    icon: '🎨',
    title: 'Beautiful UI',
    description:
      'Dark/light themes, smooth animations, and a modern design that looks great on any device.',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description:
      'Works perfectly on desktop, tablet, and mobile devices with touch-friendly interactions.',
  },
  {
    icon: '💾',
    title: 'Local Storage',
    description:
      'Your data is stored locally in your browser. Upload images and manage heroes offline.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'No backend required. All your data stays in your browser for complete privacy.',
  },
  {
    icon: '🚀',
    title: 'Modern Tech',
    description: 'Built with TypeScript, Tailwind CSS, and modern web standards for reliability.',
  },
]

const stats = [
  { value: '100+', label: 'Heroes Supported' },
  { value: '2', label: 'Themes Available' },
  { value: '∞', label: 'Customization' },
  { value: '0ms', label: 'Backend Latency' },
]

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-1000 {
  animation-delay: 1000ms;
}

.animation-delay-2000 {
  animation-delay: 2000ms;
}

.animation-delay-4000 {
  animation-delay: 4000ms;
}

.animation-delay-100 {
  animation-delay: 100ms;
}
</style>
