import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getFavorites, addFavorite, deleteFavorite} from '../../services/favoritesApi'

export const fetchFavorites = createAsyncThunk(
	'favorites/fetch',
	async () => {
		return await getFavorites()
	}
)

export const createFavorite = createAsyncThunk(
	'favorites/create',
	async (city) => {
		return await addFavorite(city)
	}
)

export const removeFavorite = createAsyncThunk(
	'favorites/delete',
	async (id) => {
		await deleteFavorite(id)
		return id
	}
)

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: {
		items: [],
		loading: false,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavorites.fulfilled, (state, action) => {
				state.item = action.payload
			})
			.addCase(createFavorite.fulfilled, (state, action) => {
				state.items.push(action.payload)
			})
			.addCase(removeFavorite.fulfilled, (state, action) => {
				state.items = state.items.filter((item) => item.id !== action.payload)
			})
	}
})

export default favoritesSlice.reducer