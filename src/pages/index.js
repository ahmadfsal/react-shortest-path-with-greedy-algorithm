import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminPage from './admin'
import MainPage from './main'

const PagesRoute = () => {
    return (
        <Fragment>
            <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/admin' component={AdminPage} />
            </Switch>
        </Fragment>
    )
}

export default PagesRoute
