export const getAllOrdersReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_ORDERS":
            return {
                ...state,
                data: action.data
            }
        default: return state
    }
}