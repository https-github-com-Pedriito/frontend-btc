import { set } from "date-fns"

// catégories
const URL_BASE = import.meta.env.VITE_API_URL
const fetchCategories = async () => {
  try {
    const response = await fetch(`${URL_BASE}/categories`)
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des catégories')
    const data = await response.json() // Retirer 'const' ici
    return data // Renvoyer les données
  } catch (error) {
    console.error(error)
    return [] // Renvoyer un tableau vide en cas d'erreur
  }
}

// sub-categories 

const fetchSubCategories = async () => {
  try {
    const response = await fetch(`${URL_BASE}/sub-categories`)
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des sous-catégories')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

// Products

const fetchProducts = async () => {
  try {
    const response = await fetch(`${URL_BASE}/products`)
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des produits')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
export { fetchCategories, fetchSubCategories, fetchProducts, }

