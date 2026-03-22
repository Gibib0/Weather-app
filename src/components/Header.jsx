import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// ==============================
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<AppBar position="static" sx={{bgcolor: '#1976d2'}}>
			<Toolbar sx={{justifyContent: 'space-between'}}>
				Weather App
			</Toolbar>
			<div>
				<Button color="inherit" component={Link} to='/'>Головна</Button>
				<Button color="inherit" component={Link} to='/favorites'>Обране</Button>
			</div>
		</AppBar>
	)
}