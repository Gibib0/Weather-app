import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getCurrentWeather, getForecast} from '../services/openWeatherApi'

export const fetchWeather = createAsyncThunk(
	'weather/fetch',
	async ({lat, lon}, {rejectWithValue}) => {
		try {
			const [currentRes, forecastRes] = await Promise.all([
				getCurrentWeather(lat, lon),
				getForecast(lat, lon)
			])

			return {
				current: currentRes,
				forecast: forecastRes.list,
				cityName: currentRes.name,
				lat: currentRes.coord.lat,
				lon: currentRes.coord.lon
			}
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Помилка завантаження погоди')
		}
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
		setCityName: (state, action) => {state.cityName = action.payload},
		clearError: (state) => {state.error = null}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.data = action.payload
				state.loading = false
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const {setCityName, clearError} = weatherSlice.actions
export default weatherSlice.reducer