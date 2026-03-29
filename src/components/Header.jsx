import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// ==============================
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<AppBar position="static" sx={{bgcolor: '#08039c'}}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 700,
						fontFamily: 'Roboto, sans-serif',
						letterSpacing: 1,
						cursor: 'default',
						background: 'linear-gradient(90deg, #fff, #a5b4fc)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					Weather App
					<Typography variant="subtitle2" sx={{fontSize: 12, color: '#a5b4fc'}}>
						Погода у вас в кишені
					</Typography>
				</Typography>
				<Box>
					<Button color="inherit" component={Link} to='/'>Головна</Button>
					<Button color="inherit" component={Link} to='/favorites'>Обране</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}