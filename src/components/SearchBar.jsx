import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
// ============================
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
// ============================
import {fetchWeather, setCityName} from '../store/slices/weatherSlice'
import { searchCities } from '../services/openWeatherApi'
import {createFavorite} from '../store/slices/favoritesSlice'

export default function SearchBar() {
	const [query, setQuery] = useState('')
	const dispatch = useDispatch()
	const favorites = useSelector(state => state.favorites.items)

	const handleSearch = async () => {
		if (!query.trim()) return

		try {
			const cities = await searchCities(query)
			if (cities.lenght === 0) {
				console.log('Місто не знайдено');
				return
			}

			const city = cities[0]
			const cityFullName = `${city.name}, ${city.country}`

			dispatch(setCityName(cityFullName))
			dispatch(fetchWeather({lat: city.lat, lon: city.lon}))

			const exists = favorites.some(
				f => f.lat === city.lat && f.lon === city.lon
			)

			if (!exists) {
				dispatch(createFavorite({
					cityName: cityFullName,
					lat: city.lat,
					lon: city.lon
				}))
			}

		} catch (error) {
			console.log(error.message);
		}
	}

	

	return (
		<Box sx={{display: 'flex', gap: 2, mb: 4, maxWidth: 600, mx: 'auto'}}>
			<TextField 
				fullWidth
				label='Введіть назву міста...'
				variant='outlined'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
				color='white'
			/>
			<Button variant='contained' onClick={handleSearch} sx={{px: 4}}>
				Шукати
			</Button>
		</Box>
	)
}