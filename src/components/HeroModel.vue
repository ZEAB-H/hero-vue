<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  hero: { id?: number; name: string; age?: number; secret_name: string } | null
}>()

const emit = defineEmits(['close', 'saved'])

const name = ref('')
const age = ref('')
const secretName = ref('')

watch(
  () => props.hero,
  (h) => {
    if (h) {
      name.value = h.name
      age.value = h.age?.toString() || ''
      secretName.value = h.secret_name
    } else {
      name.value = ''
      age.value = ''
      secretName.value = ''
    }
  },
  { immediate: true },
)

const save = async () => {
  const payload = {
    name: name.value,
    age: age.value ? parseInt(age.value) : undefined,
    secret_name: secretName.value,
  }

  try {
    let response
    if (props.hero && props.hero.id) {
      response = await fetch(`http://localhost:8000/heroes/${props.hero.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      response = await fetch('http://localhost:8000/heroes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    if (!response.ok) throw new Error('Failed to save')

    const result = await response.json()
    emit('saved', result)
  } catch (e) {
    alert('Error: ' + (e as Error).message)
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
      <h2 class="text-2xl font-bold mb-2 text-indigo-700">
        {{ hero?.id ? 'Edit Hero' : 'Add Hero' }}
      </h2>

      <input v-model="name" type="text" placeholder="Name" class="w-full p-2 border rounded" />
      <input
        v-model="age"
        type="number"
        placeholder="Age (optional)"
        class="w-full p-2 border rounded"
      />
      <input
        v-model="secretName"
        type="text"
        placeholder="Secret Name"
        class="w-full p-2 border rounded"
      />

      <div class="flex justify-end gap-3 pt-2">
        <button @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button
          @click="save"
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {{ hero?.id ? 'Update' : 'Create' }}
        </button>
      </div>
    </div>
  </div>
</template>
