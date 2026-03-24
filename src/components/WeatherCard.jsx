import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid";
// =================================
import {format} from 'date-fns'
import uk from 'date-fns/locale/uk'

const getWindDirection = (deg) => {
	const directions = [
		'Північ',
		'Північний схід', 
		'Схід',
		'Південний схід',
		'Південь',
		'Північ',
		'Південний захід',
		'Захід',
		'Північний захід'
	]
	return directions[Math.round(deg / 45) % 8]
}

export default function WeatherCard({current, cityName, lat, lon}) {
	if (!current) return null

	const weather = current.weather[0]
	const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`

	return (
		<Card sx={{mb: 3, borderRadius: 3, boxShadow: 4, overflow: 'visible'}}>
			<CardContent sx={{p: 4}}>
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
					<Box>
						<Typography variant="h4" component='div' fontWeight='bold'>
							{cityName}
						</Typography>
						<Typography variant="subtitle1" color="text.secondary">
							{current.dt
									? format(new Date(current.dt * 1000), 'EEEE, d, MMMM', {locale: uk})
									: ''}
						</Typography>
					</Box>

					<Box sx={{textAlign: 'center'}}>
						<img src={iconUrl} alt={weather.description} style={{width: 120, height: 120}} />
						<Typography variant="body2" color="text.secondary" sx={{mt: -1}}>
							{weather.description}
						</Typography>
					</Box>
				</Box>

				<Typography variant="h1" component="div" fontWeight="bold" sx={{textAlign: 'center', my: 2}}>
					{Math.round(current.temp)}*C
				</Typography>

				<Typography variant="h6" color="text.secondary" sx={{textAlign: 'center', mb: 3}}>
					Відчувається як {Math.round(current.feels_like)}*C
				</Typography>

				<Grid container spacing={2} justifyContent='center'>
					<Grid size={{xs: 6, sm: 3}}>
						<Box textAlign='center'>
							<Typography variant="subtitle2" color="text.secondary">Вологість</Typography>
							<Typography variant="h6">{current.humidity}%</Typography>
						</Box>
					</Grid>

					<Grid size={{xs: 6, sm: 3}}>
						<Box textAlign='center'>
							<Typography variant="subtitle2" color="text.secondary">Вітер</Typography>
							<Typography variant="h6">
								{Math.round(current.wind_speed)} м/с, {getWindDirection(current.wind_deg)}
							</Typography>
						</Box>
					</Grid>

					<Grid size={{xs: 6, sm: 3}}>
						<Box textAlign='center'>
							<Typography variant="subtitle2" color="text.secondary">Хмарність</Typography>
							<Typography variant="h6">{current.clouds?.all}%</Typography>
						</Box>
					</Grid>

					<Grid size={{xs: 6, sm: 3}}>
						<Box textAlign='center'>
							<Typography variant="subtitle2" color="text.secondary">Видимість</Typography>
							<Typography variant="h6">{(current.visibility / 1000).toFixed(1)} км</Typography>
						</Box>
					</Grid>
				</Grid>

				<Box sx={{mt: 4, display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
					<Box>
						<Typography variant="subtitle2" color="text.secondary">Схід сонця</Typography>
						<Typography variant="body1">
							{current.sunrise
									? format(new Date(current.sunrise * 1000), 'HH:mm', {locale: uk})
									: '--:--'}
						</Typography>
					</Box>

					<Box>
						<Typography variant="subtitle2" color="text.secondary">Захід сонця</Typography>
						<Typography variant="body1">
							{current.sunset
									? format(new Date(current.sunset * 1000), 'HH:mm', {locale: uk})
									: '--:--'}
						</Typography>
					</Box>
				</Box>

				<Typography variant="caption" color="text.secondary" sx={{display: 'block', mt: 3, textAlign: 'center'}}>
					Координати: {lat ? lat.toFixed(5) : 0}, {lon ? lon.toFixed(5) : 0}
				</Typography>
			</CardContent>
		</Card>
	)
}