<template>
  <div class="min-h-screen bg-background p-6 font-sans">
    <div class="max-w-2xl mx-auto">

      <img src="https://your-logo-link-here.png" class="w-32 mx-auto mb-6" alt="Fitting Orbit Logo" />
      <h1 class="text-3xl font-bold text-center text-brand mb-6">Fitting Orbit</h1>

      <SearchBar
          :searchTerm="searchTerm"
          @update:searchTerm="val => searchTerm = val"
          @search="searchProducts"
      />

      <div v-if="selectedProduct">
        <ProductDetails :product="selectedProduct" @back="backToSearch" />
      </div>

      <div v-else>
        <div class="flex justify-center gap-4 mb-6">
          <button
              @click="view = 'grid'"
              :class="['px-4 py-2 rounded-full transition', view === 'grid' ? 'bg-brand text-white' : 'bg-white border border-brand text-brand hover:bg-blue-50']">
            🟰 Grid
          </button>
          <button
              @click="view = 'list'"
              :class="['px-4 py-2 rounded-full transition', view === 'list' ? 'bg-brand text-white' : 'bg-white border border-brand text-brand hover:bg-blue-50']">
            📋 List
          </button>
        </div>

        <div v-if="loading" class="text-center text-brand mb-8 animate-pulse text-xl">
          🔎 Orbiting the database...
        </div>

        <ProductGrid v-if="view === 'grid'" :products="visibleProducts" @select="selectProduct" />
        <ProductList v-else :products="visibleProducts" @select="selectProduct" />

        <div v-if="canLoadMore" class="text-center mt-6">
          <button @click="loadMore" class="px-6 py-3 bg-brand hover:bg-blue-400 text-white rounded-full transition shadow-md">
            ➕ Load More
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const searchTerm = ref('')
const brandTerm = ref('')
const allProducts = ref([])
const visibleProducts = ref([])
const loading = ref(false)
const selectedProduct = ref(null)

let debounceTimer

const debounceSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchProducts()
  }, 500)
}

const searchProducts = async () => {
  if (!searchTerm.value) {
    allProducts.value = []
    visibleProducts.value = []
    return
  }

  loading.value = true

  const params = {
    search_simple: 1,
    action: 'process',
    json: 1,
    fields: 'product_name,brands,image_url,nutriments,code',
    page_size: 20
  }

  params.search_terms = searchTerm.value

  try {
    const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl`, { params })
    allProducts.value = response.data.products || []
    visibleProducts.value = allProducts.value.slice(0, 5)
  } catch (error) {
    console.error('Search failed', error)
    allProducts.value = []
    visibleProducts.value = []
  } finally {
    loading.value = false
  }
}


const loadMore = () => {
  const next = allProducts.value.slice(visibleProducts.value.length, visibleProducts.value.length + 5)
  visibleProducts.value.push(...next)
}

const selectProduct = (product) => {
  selectedProduct.value = product
}

const backToSearch = () => {
  selectedProduct.value = null
}

const canLoadMore = computed(() => visibleProducts.value.length < allProducts.value.length)
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}
</style>
