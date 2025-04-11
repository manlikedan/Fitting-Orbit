// utils/syns.js

export function calculateSyns(product) {
    const nutriments = product?.nutriments || {}

    const fat = parseFloat(nutriments['fat_100g']) || 0
    const carbs = parseFloat(nutriments['carbohydrates_100g']) || 0
    const kcal = parseFloat(nutriments['energy-kcal_100g']) || 0

    if (fat > 0 || carbs > 0) {
        return (fat + carbs) / 5
    } else if (kcal > 0) {
        return kcal / 20
    } else {
        return 0
    }
}

// NEW FUNCTION
export function getServingSize(product) {
    const name = (product.product_name || '').toLowerCase()

    if (name.includes('sauce') || name.includes('dressing') || name.includes('ketchup') || name.includes('mayonnaise') || name.includes('dip')) {
        return 15 // sauces, dressings, dips = 15g (1 tbsp)
    }

    return 100 // default serving = 100g
}

export function synLabelFromSyns(syns) {
    if (syns <= 0) return '🍏 Free'
    if (syns <= 5) return '🍯 Low Syns'
    return '🍔 High Syns'
}

export function synBadgeClassFromSyns(syns) {
    if (syns <= 0) return 'bg-green-400'
    if (syns <= 5) return 'bg-yellow-400'
    return 'bg-red-400'
}