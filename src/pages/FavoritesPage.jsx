import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// ================================
import { fetchFavorites } from "../store/slices/favoritesSlice"
// ================================
import FavoritesList from "../components/FavoritesList"
import Footer from '../components/Footer'
// ================================
import Box from "@mui/material/Box"

function FavoritesPage() {
	const dispatch = useDispatch()
	const {items} = useSelector(state => state.favorites)

	useEffect(() => {
		dispatch(fetchFavorites())
	}, [dispatch])

	return (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh'
		}}
	>
		<Box sx={{ flex: 1 }}>
			<FavoritesList items={items} />
		</Box>

		<Footer />
	</Box>
)
}

export default FavoritesPage