import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchWeather } from "../store/slices/weatherSlice";
// ================================
import WeatherCard from '../components/WeatherCard'
import TemperatureChart from '../components/TemperatureChart'
import SearchBar from '../components/SearchBar'
// ================================
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const HomePage = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const {data, loading, error, cityName} = useSelector(state => state.weather)

	const [mode, setMode] = useState('24h')

	useEffect(() => {
		if (location.state) {
			dispatch(fetchWeather({
				lat: location.state.lat,
				lon: location.state.lon
			}))
		} else {
			dispatch(fetchWeather({lat: 47.8508, lon: 35.1183}))
		}
	}, [dispatch])

	if (error) {
		return (
			<Box sx={{p: 4, textAlign: 'center', color: 'error.main'}}>
				<Typography variant="h5">Помилка</Typography>
				<Typography>{error}</Typography>
			</Box>
		)
	}

	if (loading || !data?.forecast) {
		return <div style={{ textAlign: 'center', marginTop: '50px' }}>Завантаження...</div>
	}

	let chartData = []
	let chartTitle = ''

	if (mode === '24h') {
		chartData = data.forecast.slice(0, 8).map(item => ({
			dt: item.dt,
			temp: item.main.temp
		}))
		chartTitle = 'Температура на 24 години'
	} else {
		const daily = {}
		data.forecast.forEach(item => {
			const date = new Date(item.dt * 1000).toISOString().split('T')[0]
			if (!daily[date]) {
				daily[date] = {temps: [], dt: item.dt}
			}
			daily[date].temps.push(item.main.temp)
		})

		chartData = Object.values(daily).map(day => ({
			dt: day.dt,
			temp: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length)
		})).slice(0, 7)

		chartTitle = 'Температура на тиждень'
	}

	return (
		<>
			<SearchBar />
			<WeatherCard 
				current={data.current} 
				cityName={data.cityName || cityName || 'Запоріжжя'}
				lat={data.lat}
				lon={data.lon}
			/>
			
			<Box sx={{display: 'flex', justifyContent: 'center', mb: 3}}>
				<ButtonGroup variant="outlined" size='large'>
					<Button
						onClick={() => setMode('24h')} 
						variant={mode === '24h' ? 'contained' : 'outlined'}
					>
						На 24 години
					</Button>

					<Button
						onClick={() => setMode('week')}
						variant={mode === 'week' ? 'contained' : 'outlined'}
					>
						На тиждень
					</Button>
				</ButtonGroup>
			</Box>

			<TemperatureChart hourly={chartData} title={chartTitle} />
		</>
	)
}

export default HomePage