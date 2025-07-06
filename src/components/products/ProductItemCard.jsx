import React from 'react'
import useCartStore from '../../stores/useCartStore';
import useAuthStore from '../../stores/useAuthStore';

function ProductItemCard({ productItem, setShowSignupSignin }) {
    // console.log("productItem >>", productItem);
    const { imageUrl, productName, price, productCate, productID } = productItem

    const { token, userData } = useAuthStore()
    const { addToCart } = useCartStore()

    const hdlAddToCart = async () => {
        if (!token) {
            console.log('No have token! Signup-Signin');
            setShowSignupSignin(true)
        } else if (token && userData) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            console.log("productID", productID);
            console.log("productIDPrice", price);
            console.log("default productQuantity 1");
            console.log('userID', userData.userID);

            await addToCart(token, productID, price, 1)
        }
    }

    return (
        <div className="rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col gap-4 bg-gray-300">
            <img src={imageUrl} alt="product-image" />
            <div className='flex flex-col gap-3 px-4'>
                <h1 className="text-xl font-semibold text-center">{productName}</h1>
                <div className='flex justify-between mt-1'>
                    <span className="text-sm text-gray-500">{productCate}</span>
                    <span className="text-[#FA374A] font-bold">{price} THB</span>
                </div>
            </div>
            <button onClick={hdlAddToCart}
                className="cursor-pointer w-full px-4 py-1 bg-[#FA374A] text-white rounded hover:bg-[rgb(228,18,18)] hover:duration-500 hover:font-semibold">
                Add to Cart
            </button>
        </div>
    )
}

export default ProductItemCard