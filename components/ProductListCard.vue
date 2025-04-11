<template>
  <div @click="select" class="flex bg-white p-5 rounded-3xl shadow-md hover:shadow-lg hover:bg-blue-50 cursor-pointer transition items-center space-x-4">
    <div class="w-24 h-24 bg-white rounded-2xl overflow-hidden flex items-center justify-center border">
      <img :src="product.image_url || placeholderImage" class="object-cover w-full h-full" />
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ product.product_name || 'Unnamed Product' }}</h3>
      <div class="text-sm text-gray-500 flex flex-col">
        <div>🔥 {{ kcal }} kcal / 100g</div>
        <div>🥑 {{ fat }} g fat</div>
      </div>
    </div>
    <div class="flex flex-col items-end">
      <span :class="synBadgeClass" class="px-3 py-1 rounded-full text-xs font-semibold text-white">
        {{ synLabel }}
      </span>
      <span class="text-xs text-gray-500">{{ synCount }} Syns</span>
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
