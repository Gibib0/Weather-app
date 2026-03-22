import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getWeatherByCoords} from '../services/openWeatherApi'

export const fetchWeather = createAsyncThunk(
	'weather/fetch',
	async ({lat, lon}) => {
		const data = await getWeatherByCoords(lat, lon)
		return data
	}
)

const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		data: null,
		loading: false,
		error: null,
		cityName: 'Запоріжжя'
	},
	reducers: {
		setCityName: (state, action) => {state.cityName = action.payload}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {state.loading = true})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.data = action.payload
				state.loading = false
			})
	}
})

export const {setCityName} = weatherSlice.actions
export default weatherSlice.reducer