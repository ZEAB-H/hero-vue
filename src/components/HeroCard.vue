<script setup lang="ts">
import { useHeroImages } from '../composables/useHeroImages'
import { computed } from 'vue'

const props = defineProps<{
  hero: { id: number; name: string; age?: number; secret_name: string; imageUrl?: string }
}>()

const emit = defineEmits(['edit', 'delete'])

const { getImageUrl, generateAvatarUrl } = useHeroImages()

const heroImageUrl = computed(() => {
  return props.hero.imageUrl || getImageUrl(props.hero.id.toString())
})

const avatarGradient = computed(() => {
  return generateAvatarUrl(props.hero.name)
})
</script>

<template>
  <div
    class="group relative p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 overflow-hidden"
  >
    <!-- Background Gradient Effect -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-900/20 dark:via-transparent dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    ></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Hero Avatar/Image -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div
              v-if="heroImageUrl"
              class="w-16 h-16 rounded-full overflow-hidden border-3 border-white dark:border-gray-700 shadow-lg"
            >
              <img
                :src="heroImageUrl"
                :alt="hero.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div
              v-else
              :class="`w-16 h-16 ${avatarGradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-3 border-white dark:border-gray-700`"
            >
              {{ hero.name.charAt(0).toUpperCase() }}
            </div>
            <!-- Status Indicator -->
            <div
              class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"
            ></div>
          </div>

          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-1">
              <h2
                class="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
              >
                {{ hero.name }}
              </h2>
              <div
                class="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full font-medium"
              >
                #{{ hero.id }}
              </div>
            </div>
            <div class="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium">{{ hero.secret_name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Stats -->
      <div class="grid grid-cols-2 gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <div class="text-center">
          <div class="text-lg font-bold text-gray-800 dark:text-gray-200">
            {{ hero.age || '∞' }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Years</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-gray-800 dark:text-gray-200">
            {{ hero.name.length + hero.secret_name.length }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Fame Score</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button
          @click="emit('edit', hero)"
          class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-200 group/btn"
        >
          <svg
            class="w-4 h-4 transition-transform duration-200 group-hover/btn:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>Edit</span>
        </button>
        <button
          @click="emit('delete', hero.id)"
          class="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5 transition-all duration-200 group/btn"
        >
          <svg
            class="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>

    <!-- Hover Border Effect -->
    <div
      class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/20 dark:group-hover:border-indigo-400/20 transition-colors duration-300 pointer-events-none"
    ></div>
  </div>
</template>
