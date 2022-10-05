export const orderAction = (token, currentuser, cartItem, subtotal) => {
    return {
        type: "PLACE_ORDER",
        token,
        currentuser,
        cartItem,
        subtotal
    }
}

export const getOrderAction = (data) => {
    return {
        type: "GET_ORDER",
        data
    }
}
