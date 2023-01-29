import './App.css'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom"
import Landing from './components/Landing'
import Home from './components/Home'
import Detail from './components/Detail'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/home'><Home /></Route>
                    <Route path='/detail/:id'><Detail /></Route>
                    <Route path='/'><Landing /></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App
