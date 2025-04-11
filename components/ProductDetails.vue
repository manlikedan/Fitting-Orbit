<template>
  <div class="bg-white p-6 rounded-3xl shadow-lg space-y-8">

    <div class="flex flex-col items-center text-center">
      <div class="w-48 h-48 bg-white rounded-2xl overflow-hidden border mb-4">
        <img :src="product.image_url || placeholderImage" class="object-cover w-full h-full" />
      </div>
      <h2 class="text-2xl font-bold text-gray-800">{{ product.product_name || 'Unnamed Product' }}</h2>
      <p class="text-gray-500 mt-2">{{ product.brands || 'Unknown Brand' }}</p>
      <p class="text-gray-400 text-sm">Barcode: {{ product.code }}</p>
    </div>

    <!-- Syns Badge -->
    <div class="text-center mt-4">
      <span :class="synBadgeClass" class="px-4 py-2 rounded-full font-semibold text-white text-lg">
        {{ synLabel }}
      </span>
      <p class="text-sm text-gray-500 mt-2">{{ synCount }} Syns</p>
    </div>

    <!-- Nutrition Info -->
    <div class="bg-gray-50 p-4 rounded-2xl space-y-4">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Health & Nutrition</h3>
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <p class="text-sm text-gray-500">Calories</p>
          <p class="font-bold text-lg">{{ kcal }} kcal</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Fat</p>
          <p class="font-bold text-lg">{{ fat }} g</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Carbs</p>
          <p class="font-bold text-lg">{{ carbs }} g</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-8">
      <button @click="$emit('back')" class="px-6 py-3 bg-brand hover:bg-blue-400 text-white rounded-full transition shadow-md">
        🔙 Back
      </button>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { calculateSyns, synLabelFromSyns, synBadgeClassFromSyns } from '@/utils/syns'

const props = defineProps({
  product: Object
})

const placeholderImage = 'https://via.placeholder.com/150x150.png?text=No+Image'

const kcal = computed(() => props.product?.nutriments?.['energy-kcal_100g'] || 'N/A')
const fat = computed(() => props.product?.nutriments?.['fat_100g'] || 'N/A')
const carbs = computed(() => props.product?.nutriments?.['carbohydrates_100g'] || 'N/A')

const synValue = computed(() => calculateSyns(props.product))
const synCount = computed(() => Math.max(0, synValue.value.toFixed(1)))
const synLabel = computed(() => synLabelFromSyns(synValue.value))
const synBadgeClass = computed(() => synBadgeClassFromSyns(synValue.value))
</script>
