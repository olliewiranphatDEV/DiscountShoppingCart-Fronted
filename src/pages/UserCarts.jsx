import React, { useEffect, useState } from 'react'
import useCartStore from '../stores/useCartStore'
import CartItemContainer from '../components/carts/CartItemContainer'
import DiscountsSection from '../components/carts/DiscountsSection'
import useAuthStore from '../stores/useAuthStore'
import { useNavigate } from 'react-router'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { renderAlert } from '../utils/renderAlert'

function UserCarts() {
    const navigate = useNavigate();
    const { token, userData, getUserData } = useAuthStore()
    const { getUserCarts, userCarts, getDiscountsData, discountsData } = useCartStore()
    const [isLoading, setIsLoading] = useState(false)
    console.log('isLoading >>', isLoading);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                navigate('/');
                return;
            }
            try {
                setIsLoading(true)
                await getUserData(token)
                await getUserCarts(token)
                await getDiscountsData()
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                renderAlert("Cannot fetch your carts", "error")
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }

        }
        fetchData()
    }, [])
    console.log('discountsData >>', discountsData);
    console.log('userCarts >>', userCarts);

    let orderTotalPrice = 0
    if (userCarts.length > 0) {
        for (const cart of userCarts) {
            console.log(cart);
            orderTotalPrice += parseFloat(cart.totalPriceItem)
        }
    }
    console.log('orderTotalPrice >>', orderTotalPrice);


    return (
        <>
            {
                isLoading ? (
                    <LoadingSkeleton />
                ) : (<div className="min-h-screen px-8 text-[#FA374A] pb-20">

                    {
                        isLoading && <LoadingSkeleton />
                    }
                    <div className='flex items-center justify-between'>
                        <h1 className="text-2xl font-semibold my-6">My Carts</h1>
                        <div className='flex items-center gap-3 text-lg px-10'>
                            <span className='font-semibold text-gray-500'>Your Points :</span>
                            <span className='font-bold'>{userData?.points || 0}</span>
                        </div>
                    </div>
                    {/* Carts-Container */}
                    <div className="flex flex-col items-center gap-8">
                        {userCarts.length === 0 ? (
                            <p className="text-center text-gray-500">No items in cart.</p>
                        ) : (
                            userCarts.map((cartItem, inx) => (
                                // Cart-Item
                                <CartItemContainer
                                    key={inx}
                                    cartItem={cartItem}
                                    setIsLoading={setIsLoading}
                                />
                            ))
                        )}
                    </div>

                    {/* SUMMARY TOTAL-PRICE ORDER*/}
                    <div className='my-8 flex justify-center md:justify-end md:px-48 gap-3'>
                        <span className='font-semibold text-gray-500'>Order Total Price :</span>
                        <span className='font-bold'>{orderTotalPrice.toFixed(2)} THB</span>
                    </div>
                    {/* DISCOUNT SECTION */}
                    <DiscountsSection
                        discountsData={discountsData}
                        orderTotalPrice={orderTotalPrice}
                        userCarts={userCarts}
                        setIsLoading={setIsLoading}
                    />
                </div>)
            }
        </>
    )
}

export default UserCarts