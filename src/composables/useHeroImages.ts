import { ref, onBeforeUnmount, readonly } from 'vue'

interface CachedImage {
  id: string
  file: File
  url: string
  uploadedAt: number
}

export function useHeroImages() {
  const imageCache = ref<Map<string, CachedImage>>(new Map())
  const uploading = ref(false)
  const error = ref<string>('')

  // Load existing cache from sessionStorage (cleared on browser close)
  const loadCache = () => {
    try {
      const cached = sessionStorage.getItem('hero-image-cache')
      if (cached) {
        const parsedCache = JSON.parse(cached)
        // Note: We can't restore File objects, so cache is session-only for URLs
        parsedCache.forEach((item: any) => {
          if (item.url && item.id) {
            imageCache.value.set(item.id, {
              id: item.id,
              file: null as any, // File objects can't be serialized
              url: item.url,
              uploadedAt: item.uploadedAt,
            })
          }
        })
      }
    } catch (err) {
      console.warn('Failed to load image cache:', err)
    }
  }

  // Save cache to sessionStorage
  const saveCache = () => {
    try {
      const cacheArray = Array.from(imageCache.value.entries()).map(([id, item]) => ({
        id,
        url: item.url,
        uploadedAt: item.uploadedAt,
      }))
      sessionStorage.setItem('hero-image-cache', JSON.stringify(cacheArray))
    } catch (err) {
      console.warn('Failed to save image cache:', err)
    }
  }

  const uploadImage = async (file: File, heroId: string): Promise<string | null> => {
    if (!file || !file.type.startsWith('image/')) {
      error.value = 'Please select a valid image file'
      return null
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      error.value = 'Image size must be less than 5MB'
      return null
    }

    uploading.value = true
    error.value = ''

    try {
      // Create blob URL for immediate display
      const url = URL.createObjectURL(file)

      const cachedImage: CachedImage = {
        id: heroId,
        file,
        url,
        uploadedAt: Date.now(),
      }

      // Remove old image if exists
      const oldImage = imageCache.value.get(heroId)
      if (oldImage?.url) {
        URL.revokeObjectURL(oldImage.url)
      }

      imageCache.value.set(heroId, cachedImage)
      saveCache()

      return url
    } catch (err) {
      error.value = 'Failed to upload image'
      console.error('Image upload error:', err)
      return null
    } finally {
      uploading.value = false
    }
  }

  const getImageUrl = (heroId: string): string | null => {
    return imageCache.value.get(heroId)?.url || null
  }

  const removeImage = (heroId: string) => {
    const image = imageCache.value.get(heroId)
    if (image?.url) {
      URL.revokeObjectURL(image.url)
    }
    imageCache.value.delete(heroId)
    saveCache()
  }

  const clearAllImages = () => {
    imageCache.value.forEach((image) => {
      if (image.url) {
        URL.revokeObjectURL(image.url)
      }
    })
    imageCache.value.clear()
    sessionStorage.removeItem('hero-image-cache')
  }

  const generateAvatarUrl = (name: string): string => {
    const colors = [
      'bg-gradient-to-br from-purple-500 to-pink-500',
      'bg-gradient-to-br from-blue-500 to-cyan-500',
      'bg-gradient-to-br from-green-500 to-emerald-500',
      'bg-gradient-to-br from-yellow-500 to-orange-500',
      'bg-gradient-to-br from-red-500 to-rose-500',
      'bg-gradient-to-br from-indigo-500 to-purple-500',
    ]

    const colorIndex = name.length % colors.length
    return colors[colorIndex]
  }

  // Cleanup on component unmount
  onBeforeUnmount(() => {
    // URLs will be cleaned up when page unloads, but we can be explicit
  })

  // Load cache on initialization
  loadCache()

  return {
    imageCache: readonly(imageCache),
    uploading: readonly(uploading),
    error: readonly(error),
    uploadImage,
    getImageUrl,
    removeImage,
    clearAllImages,
    generateAvatarUrl,
    clearError: () => {
      error.value = ''
    },
  }
}
