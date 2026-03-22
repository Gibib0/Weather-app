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
import { Box } from "@mui/system";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function TemperatureChart({hourly}) {
	if (!hourly || hourly.lenght === 0) return null

	const labels = hourly.map((h) => 
		format(new Date(h.dt * 1000), 'HH:mm', {locale: uk})
	)

	const data = {
		labels,
		datasets: [
			{
				label: 'Температура *С',
				data: hourly.map((h) => Math.round(h.temp)),
				borderColor: '#1976d2',
				backgroundColor: 'rgba(25, 118, 210, 0.2',
				tension: 0.4,
				pointRadius: 4,
				pointHoverRadius: 8,
			}
		]
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {display: false},
			title: {display: true, text: 'Температура на 24 години', font: {size: 18}},
		},
		scales: {
			y: {
				title: {display: true, text: '*C'},
				ticks: {stepSize: 2},
			},
		},
	}

	return (
		<Box sx={{height: 320, width: '100%', mt: 3}}>
			<Line data={data} options={options} />
		</Box>
	)
}