import React, { useState } from 'react'
import { deleteCartIDByUserID, updateCartIDQuantity } from '../../api-server/cart';
import useAuthStore from '../../stores/useAuthStore';
import useCartStore from '../../stores/useCartStore';
import { renderAlert } from '../../utils/renderAlert';

function CartItemContainer({ cartItem, setIsLoading }) {
    const { ProductOnCart, cartID } = cartItem
    const { token } = useAuthStore()
    const { getUserCarts, userCarts } = useCartStore()
    console.log('userCarts >>', userCarts);


    const product = ProductOnCart[0]?.product
    const productID = product?.productID
    const unitPrice = parseFloat(product?.price)
    const currentQty = ProductOnCart[0]?.quantity;
    const totalPrice = unitPrice * currentQty;

    const [isUpdating, setIsUpdating] = useState(false);

    const handleQuantityChange = async (newQty) => {
        if (newQty < 1 || isUpdating) return;
        try {
            setIsUpdating(true);
            await updateCartIDQuantity(token, cartID, productID, newQty);
            await getUserCarts(token); // re-fetch updated data
        } catch (error) {
            renderAlert("Cannot update quantity", "error");
        } finally {
            setIsUpdating(false);
        }
    }

    const handleDeleteCartID = async () => {
        console.log(cartID);
        try {
            const response = await deleteCartIDByUserID(token, cartID)
            console.log("deleteCartIDByUserID, response", response);
            await getUserCarts(token)

        } catch (error) {

            renderAlert("Cannot delete this cart", "error")
        }
    }



    return (
        <div className="w-full md:w-[70%] bg-gray-300 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 p-4 hover:shadow-lg transition-all duration-300">
            {/* IMAGE */}
            <div className="h-[150px] w-[150px]">
                <img src={product?.imageUrl} alt="product-image" className="w-full h-full object-cover rounded-md" />
            </div>

            {/* NAME */}
            <div className="w-full md:w-[15%] text-center">
                <span className="font-semibold text-[#FA374A] block truncate">{product?.productName}</span>
            </div>

            {/* QUANTITY-COUNTER */}
            <div className="w-full md:w-auto flex flex-col items-center gap-2">
                <span className="text-sm text-gray-600">Quantity:</span>
                <div className="flex items-center h-[40px]">
                    <button
                        disabled={isUpdating}
                        onClick={() => handleQuantityChange(currentQty - 1)}
                        className="h-full text-xl px-2 py-1 border rounded-l-md cursor-pointer disabled:opacity-50"
                    >−</button>
                    <div className="h-full w-10 flex justify-center items-center font-semibold border-t border-b">{currentQty}</div>
                    <button
                        disabled={isUpdating}
                        onClick={() => handleQuantityChange(currentQty + 1)}
                        className="h-full text-xl px-2 py-1 border rounded-r-md cursor-pointer disabled:opacity-50"
                    >+</button>
                </div>
            </div>

            {/* TOTAL-PRICE */}
            <div className="w-full md:w-auto flex items-center justify-center gap-2 px-4">
                <span className="text-sm text-gray-600">Total Price:</span>
                <span className="text-[#FA374A] font-bold">{totalPrice.toFixed(2)} THB</span>
            </div>

            {/* DELETE-BUTTON */}
            <button
                onClick={handleDeleteCartID}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-all duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <span className="text-sm">Delete</span>
            </button>
        </div>
    )
}

export default CartItemContainer