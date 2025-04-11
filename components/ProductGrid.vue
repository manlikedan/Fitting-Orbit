<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <ProductGridCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        @select="select"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array
})
const emit = defineEmits(['select'])

const select = (product) => {
  emit('select', product)
}
</script>