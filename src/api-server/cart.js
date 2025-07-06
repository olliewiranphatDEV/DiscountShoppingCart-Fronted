import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL


export const getCartsByUserID = async (token) => {
    return await axios(`${BASE_URL}/cart/my-carts`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const deleteCartIDByUserID = async (token, cartID) => {
    return await axios.delete(`${BASE_URL}/cart/delete/${cartID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const updateCartIDQuantity = async (token, cartID, productID, quantity) => {
    return await axios.patch(`${BASE_URL}/cart/update-quantity`, {
        cartID,
        productID,
        quantity
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getAllDiscounts = async () => {
    return await axios(`${BASE_URL}/discount/all-discounts`)
}


export const postCheckoutOrderPayment = async (token, body) => {
    return await axios.post(`${BASE_URL}/checkout/order-payment`,
        body,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}