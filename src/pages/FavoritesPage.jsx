import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// ================================
import { fetchFavorites } from "../store/slices/favoritesSlice"
// ================================
import FavoritesList from "../components/FavoritesList"

function FavoritesPage() {
	const dispatch = useDispatch()
	const {items} = useSelector(state => state.favorites)

	useEffect(() => {
		dispatch(fetchFavorites())
	}, [dispatch])

	return <FavoritesList items={items} />
}

export default FavoritesPage