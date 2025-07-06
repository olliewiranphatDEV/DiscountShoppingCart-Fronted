import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getOrderPaymentSummary } from '../api-server/checkout';
import useAuthStore from '../stores/useAuthStore';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { renderAlert } from '../utils/renderAlert';

function OrderSummary() {
    const { userData } = useAuthStore()
    console.log('userData >>', userData);

    const { orderID } = useParams()
    console.log("orderID", orderID);

    const [orderIDPaymentSummary, setOrderIDPaymentSummary] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { token } = useAuthStore()
    const fetchOrderIDPaymentSummary = async () => {
        try {
            setIsLoading(true)
            const response = await getOrderPaymentSummary(token, orderID)
            console.log('getOrderPaymentSummary, response >>', response);
            setOrderIDPaymentSummary(response.data.results[0])
            setIsLoading(false)
        } catch (error) {
            renderAlert("Cannot fetch you order")
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchOrderIDPaymentSummary()
    }, [])

    console.log('orderIDPaymentSummary >>', orderIDPaymentSummary);
    let totalDiscount = 0
    const priceDiscountedArry = orderIDPaymentSummary?.DiscountOnOrder?.map(item => item.priceAfterDiscount) || []
    console.log('priceDiscountedArry >>', priceDiscountedArry);
    for (const price of priceDiscountedArry) {
        totalDiscount += parseFloat(price)
    }
    console.log('totalDiscount >>', totalDiscount);

    return (
        <>
            {
                isLoading ? (<LoadingSkeleton />) : !orderIDPaymentSummary ? (<div className='flex justify-center items-center min-h-screen'>
                    <div className='w-[90%] md:w-[50%] flex flex-col gap-8 text-[#FA374A] p-6 border border-[#FA374A] rounded-2xl'>
                        <span className='font-semibold text-center text-2xl'>Order Summary</span>

                        <span>No have data</span>
                    </div>
                </div>)
                    : (
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='w-[90%] md:w-[50%] flex flex-col gap-8 text-[#FA374A] p-6 border border-[#FA374A] rounded-2xl'>
                                <span className='font-semibold text-center text-2xl'>Order Summary</span>

                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 items-center'>
                                        <span className='text-gray-500 font-semibold'>Order ID : </span>
                                        <span>{orderIDPaymentSummary?.orderID}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className='text-gray-500 font-semibold'>Customer Name : </span>
                                        <span>{userData?.firstName || ""}</span>
                                        <span>{userData?.lastName || ""}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className='text-gray-500 font-semibold'>Product Order List: </span>
                                        <span>{orderIDPaymentSummary?.ProductOnOrder?.length}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className='text-gray-500 font-semibold'>Total Discount : </span>
                                        <span>{totalDiscount.toFixed(2)} THB</span>
                                    </div>
                                    <div className='flex gap-2 items-center mt-1'>
                                        <span className='text-gray-500 font-semibold'>Order Final Price Net : </span>
                                        <span className='font-bold'>{parseFloat(orderIDPaymentSummary?.orderFinalPrice).toFixed(2)} THB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default OrderSummary