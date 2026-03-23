import axios from 'axios'

const API_KEY = 'f8085a2ca4ab0438d36df8884da2ba89'

export const searchCities = async (query) => {
  const res = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
    params: { q: query, limit: 5, appid: API_KEY }
  })
  return res.data
}

export const getCurrentWeather = async (lat, lon) => {
  const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'uk'
    }
  })
  return res.data
}

export const getForecast = async (lat, lon) => {
  const res = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'uk'
    }
  })
  return res.data
}