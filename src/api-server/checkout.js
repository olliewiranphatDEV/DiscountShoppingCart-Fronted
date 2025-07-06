import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL

// ACCOUNT
export const getOrderPaymentSummary = async (token, orderID) => {
    return await axios(`${BASE_URL}/checkout/order-summary/${orderID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}
