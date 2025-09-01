<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      @click="emit('close')"
    ></div>

    <!-- Modal -->
    <div class="relative w-full max-w-md transform transition-all duration-300 scale-100">
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <!-- Header -->
        <div class="relative p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold">
                {{ hero?.id ? 'Edit Hero' : 'Create Hero' }}
              </h2>
              <p class="text-indigo-100 text-sm mt-1">
                {{ hero?.id ? 'Update hero information' : 'Add a new superhero' }}
              </p>
            </div>
            <button
              @click="emit('close')"
              class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Image Upload Section -->
          <div class="text-center">
            <div class="mb-3">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >Hero Image</label
              >
            </div>

            <!-- Image Preview / Upload Area -->
            <div
              class="relative group"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
            >
              <div v-if="heroImageUrl" class="relative inline-block">
                <img
                  :src="heroImageUrl"
                  alt="Hero preview"
                  class="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <button
                  @click="removeHeroImage"
                  class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-else
                :class="`w-24 h-24 mx-auto rounded-full border-3 border-dashed transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  dragOver
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                }`"
                @click="$refs.fileInput?.click()"
              >
                <div class="text-center">
                  <svg
                    class="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Upload</div>
                </div>
              </div>
            </div>

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />

            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Drag & drop or click to upload (Max 5MB)
            </p>

            <!-- Upload Status -->
            <div v-if="uploadingFile || uploading" class="flex items-center justify-center mt-2">
              <div
                class="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"
              ></div>
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Uploading...</span>
            </div>

            <div v-if="imageError" class="mt-2 text-red-500 text-sm">
              {{ imageError }}
            </div>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >Hero Name *</label
              >
              <input
                v-model="name"
                v-auto-focus
                type="text"
                placeholder="Enter hero name"
                class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >Secret Identity *</label
              >
              <input
                v-model="secretName"
                type="text"
                placeholder="Enter secret identity"
                class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >Age</label
              >
              <input
                v-model="age"
                type="number"
                placeholder="Enter age (optional)"
                class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                min="1"
                max="10000"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
          <button
            @click="emit('close')"
            class="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-500 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Cancel
          </button>
          <button
            @click="save"
            :disabled="!name.trim() || !secretName.trim()"
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 disabled:cursor-not-allowed"
          >
            <span class="flex items-center space-x-2">
              <svg
                v-if="hero?.id"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>{{ hero?.id ? 'Update Hero' : 'Create Hero' }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useHeroImages } from '../composables/useHeroImages'
import type { Hero } from '../composables/useHeroes'

const props = defineProps<{
  hero: { id?: number; name: string; age?: number; secret_name: string; imageUrl?: string } | null
}>()

const emit = defineEmits(['close', 'saved'])

const { uploadImage, getImageUrl, removeImage, uploading, error: imageError } = useHeroImages()

const name = ref('')
const age = ref('')
const secretName = ref('')
const heroImageUrl = ref('')
const uploadingFile = ref(false)
const dragOver = ref(false)

watch(
  () => props.hero,
  (h) => {
    if (h) {
      name.value = h.name
      age.value = h.age?.toString() || ''
      secretName.value = h.secret_name
      heroImageUrl.value = h.imageUrl || (h.id ? getImageUrl(h.id.toString()) || '' : '')
    } else {
      name.value = ''
      age.value = ''
      secretName.value = ''
      heroImageUrl.value = ''
    }
  },
  { immediate: true },
)

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file && (props.hero?.id || name.value)) {
    uploadingFile.value = true
    const heroId = props.hero?.id?.toString() || Date.now().toString()
    const url = await uploadImage(file, heroId)
    if (url) {
      heroImageUrl.value = url
    }
    uploadingFile.value = false
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
}

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = false

  const files = event.dataTransfer?.files
  if (files?.length && (props.hero?.id || name.value)) {
    const file = files[0]
    if (file.type.startsWith('image/')) {
      uploadingFile.value = true
      const heroId = props.hero?.id?.toString() || Date.now().toString()
      const url = await uploadImage(file, heroId)
      if (url) {
        heroImageUrl.value = url
      }
      uploadingFile.value = false
    }
  }
}

const removeHeroImage = () => {
  if (props.hero?.id) {
    removeImage(props.hero.id.toString())
  }
  heroImageUrl.value = ''
}

const save = () => {
  if (!name.value.trim() || !secretName.value.trim()) {
    alert('Please fill in all required fields')
    return
  }

  const heroData: Hero = {
    id: props.hero?.id || Date.now(),
    name: name.value.trim(),
    age: age.value ? parseInt(age.value) : undefined,
    secret_name: secretName.value.trim(),
    imageUrl: heroImageUrl.value,
    createdAt: props.hero?.createdAt || Date.now(),
    updatedAt: Date.now(),
  }

  emit('saved', heroData)
}
</script>
