import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { pokemonsAll } from './redux/actions'
import Landing from './components/Landing'
import Home from './components/Home'
import Detail from './components/Detail'
import Create from './components/Create'
import NavBar from './components/NavBar'
import About from './components/About'
import './App.css'

function App() {
    // dispatch Hook
    const dispatch = useDispatch()
    // Load Pokemons Effect
    useEffect(() => {
        fetch('http://localhost:3001/pokemons')
            .then(response => response.json())
            .then(pokemons => dispatch(pokemonsAll(pokemons)))
    }, [dispatch])
    // App Render
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Switch>
                    <Route path='/home'><Home /></Route>
                    <Route path='/detail/:id'><Detail /></Route>
                    <Route path='/create'><Create /></Route>
                    <Route path='/about'><About /></Route>
                    <Route path='/'><Landing /></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
