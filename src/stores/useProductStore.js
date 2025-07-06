import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAllProductsDB } from '../api-server/product';

const useProductStore = create(persist(
    (set, get) => ({
        productsData: [],

        getProductData: async () => { //Update Account-ROLE
            const response = await getAllProductsDB()
            // console.log('getAllProductsDB', response);
            set({ productsData: response.data.results })
        },

        clearProductData: () => set({ productsData: [] })
    }),
    {
        name: 'product-storage',
    }
));

export default useProductStore;
