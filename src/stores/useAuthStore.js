import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getUserDataAccount } from '../api-server/user';

const useAuthStore = create(
    persist(
        (set) => ({
            // STATE
            token: null,
            userData: null, // { id, email, firstName, lastName }
            showSignupSignin: false,
            // ACTIONS 
            setShowSignupSignin: (bool) => {
                set({ showSignupSignin: bool })
            },
            setToken: (token) => set({ token }),
            setUserData: (userData) => set({ userData }), // firstName, lastName, email

            signout: () => {
                localStorage.removeItem("auth-user-storage");
                set({
                    token: null,
                    userData: null,
                });
            },

            getUserData: async (token) => {
                const response = await getUserDataAccount(token)
                console.log('getUserDataAccount, response >>', response);
                set({ userData: response.data.results })
            }

        }),
        {
            name: 'auth-user-storage', // key in localStorage
            getStorage: () => localStorage, // default localStorage 
        }
    )
)

export default useAuthStore
