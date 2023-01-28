import './App.css'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom"
import Landing from './components/Landing'
import Home from './components/Home'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/home'><Home /></Route>
                    <Route path='/'><Landing /></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App
