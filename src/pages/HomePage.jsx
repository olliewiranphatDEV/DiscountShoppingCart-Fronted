import React, { useEffect, useState } from 'react'
import useProductStore from '../stores/useProductStore'
import ProductItemCard from "../components/products/ProductItemCard"
import SignupSigninForm from '../components/signup-signin-form/SignupSigninForm'
import { AnimatePresence } from "framer-motion";
import useAuthStore from '../stores/useAuthStore';
import useCartStore from '../stores/useCartStore';
import LoadingSkeleton from '../components/LoadingSkeleton';

function HomePage() {
    const { showSignupSignin, setShowSignupSignin, token, userData } = useAuthStore()
    const { getProductData, productsData } = useProductStore()
    const { getUserCarts } = useCartStore()

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await getProductData()
            if (token && userData) {
                await getUserCarts(token)
            }
            setIsLoading(false)
        }

        fetchData()
    }, [token, userData])

    console.log('showSignupSignin >>', showSignupSignin);
    // console.log('HomePage, productsData >>', productsData);


    return (
        <div className='relative min-h-screen px-8 pb-20 text-[#FA374A]'>
            <h1 className="text-2xl font-semibold my-6">All Products</h1>

            {isLoading ? (
                <LoadingSkeleton />
            ) : productsData.length === 0 ? (
                <div className="flex justify-center items-center text-gray-700">
                    <span>No products found or loading failed.</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productsData.map((productItem) => (
                        <ProductItemCard
                            key={productItem.productID}
                            productItem={productItem}
                            setShowSignupSignin={setShowSignupSignin}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {
                    showSignupSignin && (<SignupSigninForm setShowSignupSignin={setShowSignupSignin} />)
                }
            </AnimatePresence>
        </div>
    )
}

export default HomePage