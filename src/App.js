import './App.css'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginPage from './Components/LoginPage'
import Home from './Components/Home'
import QuizeGame from './Components/QuizeGame'
import GameResult from './Components/GameResult'
import GameReport from './Components/GameReport'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/Quiz-Game" component={QuizeGame} />
      <ProtectedRoute exact path="/Game-Result" component={GameResult} />
      <ProtectedRoute exact path="/Game-Report" component={GameReport} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
