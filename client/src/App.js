import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './styles/style.scss'
//importng Components
import HomePage from './components/HomePage'


const App = () => {

  return (
    < Router >
      <Switch>
        <Route exact path="/music" component={HomePage} />
      </Switch>
    </Router>
  )

}



export default App