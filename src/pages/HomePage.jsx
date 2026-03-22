import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";
// ================================
import WeatherCard from '../components/WeatherCard'
import TemperatureChart from '../components/TemperatureChart'
import SearchBar from '../components/SearchBar'

const HomePage = () => {
	const dispatch = useDispatch()
	const {data, loading} = useSelector(state => state.weather)

	useEffect(() => {
		dispatch(fetchWeather({lat: 47.8508, lon: 35.1183}))
	}, [])

	if (loading || !data) return <div>Загрузка...</div>

	const current = data.current;
	const hourly24 = data.hourly.slice(0, 9)

	return (
		<>
			<SearchBar />
			<WeatherCard current={current} city='Запоріжжя' />
			<TemperatureChart hourly={hourly24} />
		</>
	)
}

export default HomePage