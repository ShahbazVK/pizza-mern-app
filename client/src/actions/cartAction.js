export const cartAction = (data) => {
    return {
        type: "ADD_TO_CART",
        data
    }
}

export const sendCartAction = (data) => {
    return {
        type: "SEND_CART",
        data
    }
}

// export const updateCartAction = (key, quantity) => {
//     return {
//         type: "UPDATE_CART",
//         key,
//         quantity
//     }
// }