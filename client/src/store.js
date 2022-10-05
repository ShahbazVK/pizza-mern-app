import { legacy_createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllPizzaReducer } from './reducers/pizzaReducer'
import { cartReducer } from './reducers/cartReducer'
import { userReducer } from './reducers/userReducer'
import { loginReducer } from './reducers/loginReducer'
import { orderReducer, getOrderReducer } from './reducers/orderReducer'
import { getAllOrdersReducer } from './reducers/getAllOrdersReducer'
import { getAllUsersReducer } from './reducers/getAllUsersReducer'

const rootReducer = combineReducers({ getAllPizzaReducer: getAllPizzaReducer, cartReducer: cartReducer, userReducer, loginReducer, orderReducer, getOrderReducer, getAllOrdersReducer, getAllUsersReducer })

const cartItem = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : []

const initialState = {
    cartReducer: {
        cartItem: cartItem
    }
}
const middleware = [thunk]

const store = legacy_createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

