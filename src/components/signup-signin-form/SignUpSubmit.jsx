import React from 'react'
import { useForm } from 'react-hook-form';
import { renderAlert } from '../../utils/renderAlert';
import { useNavigate } from 'react-router';
import { authSignUp } from '../../api-server/auth';

function SignUpSubmit({ setLoading, setShowSignupSignin }) {
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm();


    const handleSignUp = async (value) => {
        setLoading(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log(value);
        try {
            const res = await authSignUp(value)
            console.log('res', res);
            reset() // CLEAR ALL INPUTS
            setLoading(false)
            renderAlert("Signup alredy!", "success")

            // NAVIGATE TO ANOTHER PAGE
            setTimeout(() => {
                setShowSignupSignin(false)
                navigate("/")
            }, 1000);

        } catch (error) {
            setLoading(false)
            console.log("ERROR", error.response.data.ERROR);
            renderAlert(error.response.data.ERROR, "error")
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col gap-6 justify-center h-full'>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FA374A] mb-6 text-center">Create Account</h2>

            <div className='flex flex-col'>
                <div className='flex flex-col xl:flex-row xl:gap-4 items-center'>
                    <input {...register("firstName", { required: true })} type="text" placeholder="Firstname" className="block w-full mb-4 px-4 py-2 border border-[#FA374A] rounded" />
                    <input {...register("lastName", { required: true })} type="text" placeholder="Lastname" className="block w-full mb-4 px-4 py-2 border border-[#FA374A] rounded" />
                </div>
                <input {...register("identity", { required: true })} type="text" placeholder="Email/Phone" className="block w-full mb-4 px-4 py-2 border border-[#FA374A] rounded" />
                <input {...register("password", { required: true })} type="password" placeholder="Password" className="block w-full mb-4 px-4 py-2 border border-[#FA374A] rounded" />
            </div>
            {/* SUBMIT - SIGN UP */}
            <button type='sumbit' className="cursor-pointer bg-[#FA374A] text-white font-semibold px-8 py-2 rounded-full w-full hover:scale-110 hover:duration-500">SIGN UP</button>
        </form>
    )
}

export default SignUpSubmit