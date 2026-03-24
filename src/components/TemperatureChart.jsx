import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title, 
	Tooltip,
	Legend,
} from 'chart.js'
// =================================
import {format} from 'date-fns'
import uk from 'date-fns/locale/uk'
// =================================
import { Box, padding } from "@mui/system";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function TemperatureChart({hourly, title}) {
	if (!hourly || hourly.length === 0) {
		return (
			<Box sx={{textAlign: 'center', py: 4, color: 'text.secondary'}}>
				Немає даних для графіка
			</Box>
		)
	}

	const labels = hourly.map(h => 
    format(new Date(h.dt * 1000), 'HH:mm', { locale: uk })
  )

	const isWeekMode = title.includes('тиждень')
	if (isWeekMode) {
		labels.forEach((_, i) => {
			labels[i] = format(new Date(hourly[i].dt * 1000), 'd MMM', {locale: uk})
		})
	}

	const data = {
		labels,
		datasets: [
			{
				label: 'Температура *С',
				data: hourly.map(h => Math.round(h.temp)),
				borderColor: '#064300',
				backgroundColor: 'rgba(78, 26, 0, 0.2)',
				tension: 0.4,
				pointRadius: 4,
				pointHoverRadius: 8,
				borderWidth: 3,
			}
		]
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {display: false},
			title: {
				display: true,
				text: title,
				font: {size: 20, weight: 'bold'},
				padding: {bottom: 20}
			},
			tooltip: {
				mode: 'index',
				intersect: false,
			}
		},
		scales: {
			y: {
				title: {display: true, text: '*C'},
				ticks: {stepSize: 2},
				grid: {color: 'rgba(0,0,0,0.1)'}
			},
			x: {
				grid: {color: 'rgba(0,0,0,0.1)'}
			}
		},
	}

	return (
		<Box sx={{ height: 400, px: 2 }}>
      <Line data={data} options={options} />
    </Box>
	)
}