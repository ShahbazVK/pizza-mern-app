const initialState = {}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PLACE_ORDER":
            return {
                ...state,
                token: action.token,
                currentuser: action.currentuser,
                cartItem: action.cartItem,
                subtotal: action.subtotal
            }
        default: return state
    }
}

export const getOrderReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case "GET_ORDER":
            return {
                ...state,
                data: action.data
            }
        default: return state
    }
}