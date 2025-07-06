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