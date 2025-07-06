import React from 'react'
import { Link, useNavigate } from 'react-router'
import useCartStore from '../stores/useCartStore'
import useAuthStore from '../stores/useAuthStore'
import { renderAlert } from '../utils/renderAlert'

function MainNavBar() {
    const navigate = useNavigate()
    const { showSignupSignin, setShowSignupSignin, token, userData, signout } = useAuthStore()
    const { cartCount, resetCart } = useCartStore()

    const handleSignUpSignIn = () => {
        if (!token && !userData) {
            setShowSignupSignin(true)
        } else {
            renderAlert("You are signing", "warning")
        }
    }

    const handleUserCarts = () => {
        if (userData) {
            navigate('user/my-cart')
        } else {
            setShowSignupSignin(true)
        }
    }

    const handleSignout = async () => {
        if (userData) {
            const results = await renderAlert("Are you sure to signout?", "question")
            console.log('results, renderAlert', results.params);

            if (results.isConfirmed) {
                await resetCart()
                await signout();  // WHEN PRESSED OK
                navigate("/")
            }
        } else {
            renderAlert("You've not signined yet", "warning")
        }
    }

    return (
        <div className='w-full h-[60px] bg-[#FA374A] px-4 py-1 text-white text-sm flex gap-10 justify-center'>
            <Link to='/'>
                <img src="https://i.ibb.co/qLVLRyB1/discount-shoppingcart-logo.png" alt="logo" className='h-full' />
            </Link>
            <div className='flex gap-6'>
                {/* Signin */}
                <button onClick={handleSignUpSignIn}
                    className='cursor-pointer h-full flex justify-center items-center hover:scale-115 hover:duration-500 hover:font-semibold'>
                    {
                        userData ? (<span>Hello, {userData.firstName}!</span>) : (<span>Welcome, Signin</span>)
                    }
                </button>
                {/* Signup */}
                <button onClick={handleSignUpSignIn}
                    className='cursor-pointer h-full flex justify-center items-center hover:scale-115 hover:duration-500 hover:font-semibold'>
                    <span>New? Signup</span>
                </button>
                <button onClick={handleUserCarts}
                    className='cursor-pointer h-full flex gap-2 justify-center items-center hover:scale-125 hover:duration-500 hover:font-semibold'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                    <span>Cart</span>
                    {/* cartCount NOTIFICATION*/}
                    {cartCount > 0 && (
                        <span className="absolute top-1 bg-white text-[#FA374A] text-xs font-bold px-1.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </button>
                <button onClick={handleSignout}
                    className='cursor-pointer h-full flex justify-center items-center hover:scale-115 hover:duration-500 hover:font-semibold'>
                    <span>Signout</span>
                </button>
            </div>
        </div>
    )
}

export default MainNavBar