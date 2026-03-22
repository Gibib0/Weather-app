import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
// ==============================
import {store} from './store'
// ==============================
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App