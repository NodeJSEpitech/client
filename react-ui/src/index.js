




import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import Home from './pages/home/home';
import PostDetail from './pages/post_detail/post_detail';
import Signin from './pages/signin/signin';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import authentication_reducer from './modules/authentication/reducer' // Or wherever you keep your reducers
import registerServiceWorker from './registerServiceWorker';
//ReactDOM.render(<App />, document.getElementById('root'));

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        authentication_reducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
    <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} history={history}/>
        <Route path="/post/:postId" component={PostDetail}/>
        <Route path="/signin" component={Signin}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();