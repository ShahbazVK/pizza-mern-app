export const loginAction = (data) => {
    return {
        type: "LOGIN_USER",
        data
    }
}
export const logoutAction = () => {
    return {
        type: "LOGOUT_USER",
    }
}