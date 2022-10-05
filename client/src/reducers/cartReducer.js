export const cartReducer = (state = { cartItem: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cartItem: action.data
            }
        case "SEND_CART":
            return {
                ...state,
                cartItem: [...action.data]
            }
        // case "UPDATE_CART":
        //     state.cartItem.findIndex((key)=>key===action.key)
        //     return {
        //         ...state,
        //         cartItem: [...action.data]
        //     }
        default:
            return state
    }

}
