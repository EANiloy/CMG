import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import burgerReducer from './Store/reducers/burgerReducer';
import pizzaReducer from './Store/reducers/pizzaReducer';
import cartReducer from './Store/reducers/cartReducer';
import AuthReducer from './Store/reducers/Auth';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    brg:burgerReducer,
    pizz:pizzaReducer,
    cart:cartReducer,
    auth:AuthReducer
})
const composeEnhancers = (process.env.NODE_ENV ==="development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null)|| compose;
const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store ={store}    >
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
