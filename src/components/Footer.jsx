import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
	return (
		<Box sx={{bgcolor: '#f5f5f5',
							p: 3,
							mt: 5, 
							textAlign: 'center',
							borderTop: '1px solid #ddd'
						}}
		>
			<Typography variant="body2" color="text.secondary">
				{new Date().getFullYear()} Weather App | Всі права захищені
			</Typography>

			<Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
				Автор: Анастасія Антонова
			</Typography>

			<Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
				Support: {' '}
				<Link href="mailto:support@weatherapp.com" underline="hover">
					support@weatherapp.com
				</Link>
			</Typography>

			<Typography variant="body2" color="text.secondary" sx={{mt: 1, display: 'block'}}>
				React | Redux | MUI | OpenWeatherMap API
			</Typography>
		</Box>
	)
}