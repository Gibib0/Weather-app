import FavoritesItem from "./FavoritesItem"
// ================================
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"

function FavoritesList({items}) {
	if (!items.length) {
		return (
			<Typography align="center" sx={{mt: 4}}>
				У вас немає обраних міст. Додайте їх через пошук
			</Typography>
		)
	}

	return (
		<List sx={{maxWidth: '100%', bgcolor: '#fff', borderRadius: 2}}>
			{items.map(item => (
				<FavoritesItem key={item.id} item={item} />
			))}
		</List>
	)
}

export default FavoritesList