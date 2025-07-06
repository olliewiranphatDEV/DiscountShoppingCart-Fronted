import { useState } from 'react'
import SignUpSubmit from '../../components/signup-signin-form/SignUpSubmit';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import SignInSubmit from '../../components/signup-signin-form/SignInSubmit';
import { motion } from 'framer-motion'

function SignupSigninForm({ setShowSignupSignin }) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log('loading >>', loading);


    return (
        <div onClick={() => setShowSignupSignin(false)}
            className="fixed top-0 left-0 min-w-screen h-full z-50 flex justify-center items-start min-h-screen bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 px-4 py-10 md:px-0"
            >

                <button
                    onClick={() => setShowSignupSignin(false)}
                    className="absolute w-[40px] h-[40px] cursor-pointer flex justify-center items-center top-20 right-[-20px] md:right-20 rounded-full bg-white text-[#FA374A] text-2xl font-bold hover:scale-125 hover:duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>


                <div onClick={(e) => e.stopPropagation()}
                    className="relative max-w-[90%] md:max-w-[60%] min-h-[700px] md:min-h-0 shadow-2xl overflow-hidden rounded-xl bg-white">

                    {/* Slide Panel */}
                    <div className={`md:absolute top-0 left-0 w-full md:w-1/2 h-[250px] md:h-full bg-[#FA374A] text-white p-8 md:p-12 transition-all duration-700 z-20 flex flex-col items-center justify-center
                    ${isSignUp ? 'md:translate-x-full' : ''}`}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                            {isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}
                        </h2>
                        <p className="mb-4 text-center text-sm">
                            {isSignUp
                                ? 'To keep connected with us please login with your personal info'
                                : 'Enter your personal details and start journey with us'}
                        </p>
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="cursor-pointer border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-red-700 hover:duration-500"
                        >
                            {isSignUp ? 'SIGN IN' : 'SIGN UP'}
                        </button>
                    </div>

                    {/* Forms Container */}
                    <div className="flex flex-col md:flex-row w-full md:relative z-10">

                        {/* Sign In Form */}
                        <div className={`w-full md:w-1/2 p-8 md:p-12 transition-all duration-700
    ${isSignUp ? 'opacity-0 pointer-events-none -translate-y-full md:-translate-y-0 md:-translate-x-full md:opacity-0'
                                : 'opacity-100 md:translate-x-full md:opacity-100'}`}
                        >
                            {/* CONTENT */}
                            <SignInSubmit setLoading={setLoading} setShowSignupSignin={setShowSignupSignin} />
                        </div>

                        {/* Sign Up Form */}
                        <div className={`w-full md:w-1/2 p-8 md:p-12 bg-white transition-all duration-700 absolute top-0 left-0 md:static
    ${isSignUp ? 'opacity-100 pointer-events-auto translate-y-60 md:-translate-y-0 md:-translate-x-full md:opacity-100'
                                : 'opacity-0 pointer-events-none md:translate-x-0 md:opacity-0'}`}
                        >
                            {/* CONTENT */}
                            <SignUpSubmit setLoading={setLoading} setShowSignupSignin={setShowSignupSignin} />
                        </div>

                    </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}
                    className='p-4 bg-white shadow-2xl rounded-2xl flex flex-col gap-4 items-center'>
                    <strong>A Test Account</strong>
                    <div className='flex flex-col gap-4'>
                        <span><strong>Email:</strong> discount.shoppingcart@mail.com</span>
                        <span><strong>Password:</strong> test101</span>
                    </div>
                </div>

                {
                    loading && (<LoadingSkeleton />)
                }
            </motion.div>
        </div>
    )
}

export default SignupSigninForm
