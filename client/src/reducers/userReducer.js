const initialUserState = {}
export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                user: action.data
            }
        default:
            return state
    }

}
