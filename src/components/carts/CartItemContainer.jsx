import React from 'react'

function CartItemContainer({ cartItem }) {
    const { ProductOnCart, cartID, customerID, totalPriceItem } = cartItem

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




        </div>
    )
}

export default CartItemContainer