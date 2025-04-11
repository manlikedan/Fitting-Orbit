<template>
  <div @click="select" class="bg-white p-5 rounded-3xl shadow-md hover:shadow-lg hover:bg-blue-50 cursor-pointer transition flex flex-col items-center">
    <div class="w-full aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center border mb-4">
      <img :src="product.image_url || placeholderImage" class="object-cover w-full h-full" />
    </div>
    <h3 class="text-center text-lg font-semibold text-gray-800 mb-2">{{ product.product_name || 'Unnamed Product' }}</h3>

    <div class="flex flex-col items-center text-sm text-gray-500 space-y-1">
      <div>🔥 {{ kcal }} kcal / 100g</div>
      <div>🥑 {{ fat }} g fat</div>
      <div class="flex items-center space-x-2 mt-2">
        <span :class="synBadgeClass" class="px-3 py-1 rounded-full text-xs font-semibold text-white">
          {{ synLabel }}
        </span>
        <span class="text-gray-500 text-xs">{{ synCount }} Syns</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { calculateSyns, getServingSize, synLabelFromSyns, synBadgeClassFromSyns } from '@/utils/syns'

const props = defineProps({
  product: Object
})

const emit = defineEmits(['select'])
const placeholderImage = 'https://via.placeholder.com/150x150.png?text=No+Image'

const select = () => {
  emit('select', props.product)
}

const baseSyns = computed(() => calculateSyns(props.product))
const servingSize = computed(() => getServingSize(props.product))

const adjustedSyns = computed(() => {
  if (baseSyns.value <= 0) return 0
  return (baseSyns.value / 100) * servingSize.value
})

const synCount = computed(() => Math.max(0, adjustedSyns.value.toFixed(1)))
const synLabel = computed(() => synLabelFromSyns(adjustedSyns.value))
const synBadgeClass = computed(() => synBadgeClassFromSyns(adjustedSyns.value))

const kcal = computed(() => props.product?.nutriments?.['energy-kcal_100g'] || 'N/A')
const fat = computed(() => props.product?.nutriments?.['fat_100g'] || 'N/A')
</script>