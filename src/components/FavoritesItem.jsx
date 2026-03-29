import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
// ================================
import {removeFavorite} from "../store/slices/favoritesSlice"
// ================================
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

function FavoritesItem({item}) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/', { state: { lat: item.lat, lon: item.lon } })
	}

	const handleDelete = (e) => {
		e.stopPropagation()
		dispatch(removeFavorite(item.id))
	}

	return (
		<ListItem
			onClick={handleClick}
			sx={{
				cursor: 'pointer',
				borderBottom: '1px solid #eee',
				'&:hover': {bgcolor: '#f5f5f5'}
			}}
			secondaryAction={
				<IconButton edge='end' onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemText
				primary={item.cityName}
				secondary={`lat: ${item.lat.toFixed(2)}, lon: ${item.lon.toFixed(2)}`}
			/>
		</ListItem>
	)
}

export default FavoritesItem