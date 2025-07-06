import React from 'react'
import { deleteCartIDByUserID } from '../../api-server/cart';
import useAuthStore from '../../stores/useAuthStore';
import useCartStore from '../../stores/useCartStore';
import { renderAlert } from '../../utils/renderAlert';

function CartItemContainer({ cartItem, setIsLoading }) {
    const { ProductOnCart, cartID, customerID, totalPriceItem } = cartItem
    const { token } = useAuthStore()
    const { getUserCarts } = useCartStore()
    const handleDeleteCartID = async () => {
        setIsLoading(true)
        console.log(cartID);
        try {
            const response = await deleteCartIDByUserID(token, cartID)
            console.log("deleteCartIDByUserID, response", response);
            await getUserCarts(token)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            renderAlert("Cannot delete this cart", "error")
        }
    }



    return (
        <div

            className="w-full md:w-[70%] overflow-hidden bg-gray-300 rounded-lg flex sm:justify-between items-center gap-4 hover:shadow-lg transition-all duration-300"
        >
            <div className='w-[150px] h-[150px] bg-pink-500'>
                <img src={ProductOnCart[0].product.imageUrl} alt="product-image" className='w-full h-full object-cover' />
            </div>


            <span className='font-semibold'>{ProductOnCart[0].product.productName}</span>

            <div className='flex gap-2 items-center px-4'>
                <span className="text-sm text-gray-600">Quantity: </span>
                <span className='text-[#FA374A]'>{ProductOnCart[0].quantity}</span>
            </div>

            <div className='flex gap-2 items-center px-4'>
                <span className="text-sm text-gray-600">Total Price: </span>
                <span className='text-[#FA374A] font-bold'>{cartItem.totalPriceItem} THB</span>
            </div>

            <button onClick={handleDeleteCartID}
                className='flex gap-2 items-center px-4 cursor-pointer text-gray-600 hover:text-red-500 hover:duration-300 hover:scale-110'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <span className="text-sm ">Delete</span>
            </button>


        </div>
    )
}

export default CartItemContainer