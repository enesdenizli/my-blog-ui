import React from'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './containers/Main'

const AppContainer = () => {
    return (
        <BrowserRouter>
            <Route component={Main} exact path='/' />
        </BrowserRouter>
    )
}

ReactDOM.render(< AppContainer />, document.querySelector('#root'))