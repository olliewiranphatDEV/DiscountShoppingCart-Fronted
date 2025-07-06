import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { postADDtoCart } from '../api-server/product'
import { getAllDiscounts, getCartsByUserID } from '../api-server/cart'

const useCartStore = create(persist(
    (set, get) => ({
        cartCount: 0,
        userCarts: [],
        discountsData: [],


        addToCart: async (token, productID, productIDPrice, productQuantity, userID) => {
            set((state) => ({ cartCount: state.cartCount + 1 }))

            if (!token) return;
            const response = await postADDtoCart(token, productID, productIDPrice, productQuantity)
            console.log("postADDtoCart, response >>", response);
        },
        getUserCarts: async (token) => {
            if (!token) return;
            const response = await getCartsByUserID(token)
            // console.log("getCartsByUserID, response >>", response);
            set({ userCarts: response.data.results, cartCount: response.data.results.length })
        },
        getDiscountsData: async (params) => {
            const response = await getAllDiscounts()
            // console.log("getAllDiscounts, response >>", response);
            set({ discountsData: response.data.results })
        },

        resetCart: () => set({ cartCount: 0, userCarts: [] })
    }),
    {
        name: 'cart-storage',
    }
))

export default useCartStore
