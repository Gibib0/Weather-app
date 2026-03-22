import axios from 'axios'

const API_KEY = '9bf4773fb593f012dfa6f7b862628576'
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall'
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';

export const getWeatherByCoords = async (lat, lon) => {
	const res = await axios.get(BASE_URL, {
		params: {
			lat,
			lon,
			appid: API_KEY,
			units: 'metric',
			lang: 'ua',
		}
	})
	return res.data
}

export const searchCities = async (query) => {
	const res = await axios.get(GEO_URL, {
		params: {q: query, limit: 5, appid: API_KEY}
	})
	return res.data
}