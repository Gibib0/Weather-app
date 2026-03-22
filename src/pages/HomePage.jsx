import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";
// ================================
import WeatherCard from '../components/WeatherCard'
import TemperatureChart from '../components/TemperatureChart'
import SearchBar from '../components/SearchBar'
// ================================
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HomePage = () => {
	const dispatch = useDispatch()
	const {data, loading, error, cityName} = useSelector(state => state.weather)

	useEffect(() => {
		dispatch(fetchWeather({lat: 47.8508, lon: 35.1183}))
	}, [dispatch])

	if (error) {
		return (
			<Box sx={{p: 4, textAlign: 'center', color: 'error.main'}}>
				<Typography variant="h5">Помилка</Typography>
				<Typography>{error}</Typography>
			</Box>
		)
	}

	if (loading || !data) {
		return <div style={{ textAlign: 'center', marginTop: '50px' }}>Завантаження...</div>
	}

	const hourly24 = data.hourly.slice(0, 9) || []

	const adaptedHourly = hourly24.map(item => ({
		dt: item.dt,
		temp: item.main.temp
	}))

	return (
		<>
			<SearchBar />
			<WeatherCard 
				current={data.current} 
				cityName={cityName || data.current?.name || 'Місто'}
				lat={data.lat}
				lon={data.lon}
			/>
			<TemperatureChart hourly={adaptedHourly} />
		</>
	)
}

export default HomePage