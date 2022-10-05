const initialUserState = {
    user: { username: "" }
}
export const loginReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                user: action.data
            }
        case "LOGOUT_USER":
            return {
                ...state,
                user: {}
            }
        default:
            return state
    }

}
