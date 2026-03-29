import axios from 'axios'

const API = 'http://localhost:3000/favorites'

export const getFavorites = async () => {
	const res = await axios.get(API)
	return res.data
}

export const addFavorite = async (city) => {
	const res = await axios.post(API, city)
	return res.data
}

export const deleteFavorite = async (id) => {
	await axios.delete(`${API}/${id}`)
}