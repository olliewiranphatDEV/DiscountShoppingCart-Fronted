import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL


export const getAllProductsDB = async () => {
    return await axios(`${BASE_URL}/product/all-products`)
}

export const postADDtoCart = async (token, productID, productIDPrice, productQuantity) => {
    return await axios.post(`${BASE_URL}/product/add-to-cart`,
        { productID, productIDPrice, productQuantity },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}