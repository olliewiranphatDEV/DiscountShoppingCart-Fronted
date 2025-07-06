import React from 'react'

function LoadingSkeleton() {
    return (
        <div className='absolute w-full top-[30%] flex flex-col justify-center items-center z-10 gap-4'>
            <div className='w-[40%] h-[20px] bg-gray-300 animate-pulse duration-300 rounded-xl'></div>
            <div className='w-[40%] h-[20px] bg-gray-300 animate-pulse duration-300 rounded-xl'></div>
            <div className='w-[40%] h-[20px] bg-gray-300 animate-pulse duration-300 rounded-xl'></div>
            <div className='w-[40%] h-[20px] bg-gray-300 animate-pulse duration-300 rounded-xl'></div>
        </div>
    )
}

export default LoadingSkeleton