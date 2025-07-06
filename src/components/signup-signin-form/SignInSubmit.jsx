import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { authSignIn } from '../../api-server/auth';
import { renderAlert } from '../../utils/renderAlert';
import useCartStore from '../../stores/useCartStore';
import useAuthStore from '../../stores/useAuthStore';

function SignInSubmit({ setLoading, setShowSignupSignin }) {
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm();


    const handleSignIn = async (value) => {
        setLoading(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log(value);
        try {
            const res = await authSignIn(value)
            // console.log('res', res);
            reset() // CLEAR ALL INPUTS
            setLoading(false)
            renderAlert("Signin alredy!", "success")

            // NAVIGATE TO ANOTHER PAGE
            setTimeout(() => {
                setShowSignupSignin(false)
                navigate("/")
            }, 1000)
        } catch (error) {
            setLoading(false)
            console.log("ERROR", error.response.data.ERROR);
            renderAlert(error.response.data.ERROR, "error")
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col gap-6 justify-center h-full'>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FA374A] mb-6 text-center">Sign in to ToDoList</h2>
            <div className='flex flex-col'>
                <input {...register("identity", { required: true })} type="text" placeholder="Email/Phone" className="block w-full mb-4 px-4 py-2 border border-[#FA374A] rounded" />
                <input {...register("password", { required: true })} type="password" placeholder="Password" className="block w-full mb-4 px-4 py-2 border border-[#FA374A] rounded" />
                <p className="text-sm text-gray-400 mb-4 text-right">Forgot your password?</p>
            </div>

            {/* SUBMIT - SIGN IN */}
            <button type='submit' className="cursor-pointer bg-[#FA374A] text-white font-semibold px-8 py-2 rounded-full w-full hover:scale-110 hover:duration-500">SIGN IN</button>
        </form>
    )
}

export default SignInSubmit