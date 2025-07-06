import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL

// ACCOUNT
export const getUserDataAccount = async (token) => {
    return await axios(`${BASE_URL}/user/my-account`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}


