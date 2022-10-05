export const getAllUsersReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_USERS":
            return {
                ...state,
                data: action.data
            }
        default: return state
    }
}