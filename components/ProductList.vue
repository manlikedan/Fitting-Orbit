<template>
  <div class="flex flex-col gap-4">
    <ProductListCard
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