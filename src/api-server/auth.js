import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL
import useAuthStore from "../stores/useAuthStore";
import useCartStore from "../stores/useCartStore";

const { setToken, setUserData } = useAuthStore.getState();
const { getUserCarts } = useCartStore.getState();

export const authSignUp = async (value) => {
    return await axios.post(`${BASE_URL}/auth/register`, value)
        .then(res => {
            const token = res.data.token;
            const userData = res.data.results;

            setToken(token);
            setUserData(userData);

            return res;
        })
        .catch(err => {
            console.error("Auth error", err);
            throw err;
        });
}

export const authSignIn = async (value) => {
    return await axios.post(`${BASE_URL}/auth/signin`, value)
        .then(res => {
            console.log('res >>', res);

            const token = res.data.token;
            const userData = res.data.results;

            setToken(token);
            setUserData(userData);

            return res;
        })
        .catch(err => {
            console.error("Auth error", err);
            throw err;
        });

};
