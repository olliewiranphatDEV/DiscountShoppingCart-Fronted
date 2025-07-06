import React, { useState } from 'react'
import useAuthStore from '../../stores/useAuthStore'
import { renderAlert } from '../../utils/renderAlert';
import { postCheckoutOrderPayment } from '../../api-server/cart';
import { useNavigate } from 'react-router';
import useCartStore from '../../stores/useCartStore';

function DiscountsSection({ discountsData, orderTotalPrice, userCarts, setIsLoading }) {
    const navigate = useNavigate()
    const { token, userData } = useAuthStore()
    const { resetCart } = useCartStore()
    // MAP TO SEPERATE CATEGORY - UI RENDER
    // console.log('discountsData >>', discountsData);
    // console.log('userCarts >>', userCarts);
    const productCateDiscount = userCarts.map((item) => {
        return item.ProductOnCart[0].product.productCate
    })
    // console.log('productCateDiscount >>', productCateDiscount);
    const openDiscount15percent = productCateDiscount.some(item => item === "Clothing" || item === "Accessories" || item === "Electronics")
    // console.log('openDiscount15percent >>', openDiscount15percent); //true/false
    let onTopDiscounts = []
    if (openDiscount15percent) { //true
        onTopDiscounts = discountsData.filter(d => d.category === 'onTop');
    } else { // false
        onTopDiscounts = discountsData.filter(d => d.category === 'onTop' && d.campaign === 'points');
    }
    // console.log('onTopDiscounts >>', onTopDiscounts);
    const couponDiscounts = discountsData.filter(d => d.category === 'coupon');
    const seasonalDiscounts = discountsData.filter(d => d.category === 'seasonal');

    // KEEP DATA - selectedDiscounts
    const [selectedDiscounts, setSelectedDiscounts] = useState({
        coupon: '',
        onTop: '',
        seasonal: ''
    })

    const [priceAfterCoupon, setPriceAfterCoupon] = useState(0)
    const [priceAfterOnTop, setPriceAfterOnTop] = useState(0)
    const [priceAfterSeasonal, setPriceAfterSeasonal] = useState(0)
    const [orderFinalPrice, setOrderFinalPrice] = useState(orderTotalPrice)

    // COUPON - CATEGORY
    const handleSelectCoupon = (e) => {
        const selectedID = parseInt(e.target.value);
        // FIND MATCHED DISCOUNT DATA - CAMPAIGN
        const discount = couponDiscounts.find(d => d.discountID === selectedID);
        console.log('handleSelectCoupon, discount :', discount);

        // RE-SELECT COUPON DISCOUNT AGAIN
        setSelectedDiscounts(prev => ({
            ...prev,
            coupon: selectedID,
            onTop: '',
            seasonal: ''
        }));
        setPriceAfterOnTop(0)
        setPriceAfterSeasonal(0)

        // CALCUALATE PRICE AFTER DISCOUNT
        let price = 0
        if (!discount) return priceAfterCoupon; // 0

        if (discount.campaign === 'percentage') {
            price = orderTotalPrice * (1 - discount.percentage / 100);

        } else if (discount.campaign === 'fixedAmount') {
            price = orderTotalPrice - discount.fixedAmount;
        }

        if (price > 0) {
            setPriceAfterCoupon(price);
            setOrderFinalPrice(price)
        } else {
            setPriceAfterCoupon(0);
            setOrderFinalPrice(0)
        }
    }
    console.log('priceAfterCoupon >>', priceAfterCoupon);

    // OnTop - CATEGORY
    const handleChangeOnTop = (e) => {
        const selectedID = parseInt(e.target.value);
        const discount = onTopDiscounts.find(d => d.discountID === selectedID);
        console.log('handleChangeOnTop, discount :', discount);

        // RE-SELECT OnTop DISCOUNT AGAIN
        setSelectedDiscounts(prev => ({ ...prev, onTop: selectedID, seasonal: '' }));
        setPriceAfterSeasonal(0)


        let price = priceAfterCoupon
        if (!discount) return priceAfterCoupon; // 0

        if (discount.campaign === 'percentageByProduct') {
            price = priceAfterCoupon * (1 - discount.percentage / 100);

        } else if (discount.campaign === 'points') {
            console.log('userData.points >>', userData?.points);

            price = priceAfterCoupon - userData?.points; // user.points
        }

        if (price > 0) {
            setPriceAfterOnTop(price);
            setOrderFinalPrice(price)
        } else {
            setPriceAfterOnTop(0);
            setOrderFinalPrice(0)
        }
    }
    console.log("priceAfterOnTop >>", priceAfterOnTop);

    // Seasonal - CATEGORY
    const handleChangeSeasonal = (e) => {
        const selectedID = parseInt(e.target.value);
        const discount = seasonalDiscounts.find(d => d.discountID === selectedID);
        console.log('handleChangeSeasonal, discount :', discount);

        // KEEP DATA - SELECTED DISCOUNT
        setSelectedDiscounts(prev => ({ ...prev, seasonal: selectedID }));

        if (!discount) return priceAfterOnTop; // 0

        let price = priceAfterOnTop
        let discountAmount = 0;

        if (discount.campaign === 'specialSeasonal') {
            const times = Math.floor(price / discount.everyX);
            console.log('times >>', times);

            discountAmount = times * discount.discountY;
            price -= discountAmount;
        }
        console.log('discountAmount >>', discountAmount);
        if (price > 0) {
            setPriceAfterSeasonal(price);
            setOrderFinalPrice(price)
        } else {
            setPriceAfterSeasonal(0);
            setOrderFinalPrice(0)
        }
    }
    console.log('priceAfterSeasonal >>', priceAfterSeasonal);

    console.log('selectedDiscounts >>', selectedDiscounts);




    const handleOrderToPayment = async () => {
        // VALIDATE ALL KEY DiscountsSelected
        const isAllDiscountsSelected = Object.values(selectedDiscounts).every(value => value !== '');
        if (!isAllDiscountsSelected) {
            renderAlert("Please select every discount", "error");
            return; // STOP PROCESS
        }

        // PREPARE DATA TO POST API
        const productsOrderData = userCarts.map(item => ({
            productID: item.ProductOnCart[0].product.productID,
            quantity: item.ProductOnCart[0].quantity,
            totalPriceItem: item.totalPriceItem
        }))
        const discountsOrderData = [
            { discountID: selectedDiscounts.coupon, category: "coupon", priceAfterDiscount: priceAfterCoupon },
            { discountID: selectedDiscounts.onTop, category: "onTop", priceAfterDiscount: priceAfterOnTop },
            { discountID: selectedDiscounts.seasonal, category: "seasonal", priceAfterDiscount: priceAfterSeasonal }
        ]

        console.log('productsOrderData >>', productsOrderData);
        console.log('discountsOrderData >>', discountsOrderData);
        console.log('orderFinalPrice >>', orderFinalPrice);
        const body = {
            productsOrderData,
            discountsOrderData,
            orderFinalPrice
        }

        try {
            setIsLoading(true)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            const response = await postCheckoutOrderPayment(token, body)
            console.log('postCheckoutOrderPayment, response', response);
            setIsLoading(false)
            await resetCart()
            navigate(`/user/order-summary/${response.data.results.orderID}`)
        } catch (error) {
            renderAlert("Cannot checkout to payment", "error")
        }

    }



    return (
        <div className='mt-10'>
            <h2 className="text-lg font-semibold text-red-500 mb-1">Choose Your Discounts</h2>
            <p className="text-gray-600">
                Select <span className="font-semibold">one discount</span> from each category below.
                Discounts will be applied in the following order: <strong>Coupon → On Top → Seasonal</strong>.
            </p>

            {/* STEP1 - Coupon Dropdown */}
            <div className='mt-5 flex gap-12 items-center'>
                <div className='w-[30%] flex flex-col gap-2'>
                    <label className="text-sm font-medium text-gray-700">Coupon Discount</label>
                    <select
                        className="cursor-pointer border border-red-500 rounded p-2"
                        onChange={handleSelectCoupon}
                        value={selectedDiscounts.coupon} // VALUE OD THIS SELECTION
                    >
                        {/* DEFAULT DISPLAY */}
                        <option value="">-- Select a coupon discount --</option>
                        {/* OPTIN DISPLAY */}
                        {couponDiscounts.map(d => (
                            <option key={d.discountID} value={d.discountID}>{d.label}</option>
                        ))}
                    </select>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    <span className="text-sm font-medium text-gray-500">Price After Discount</span>
                    <span className='font-semibold'>{priceAfterCoupon.toFixed(2)}</span>
                </div>
            </div>

            {/* STEP2 - On Top Discount */}
            <div className='mt-5 flex gap-12 items-center'>
                <div className='w-[30%] flex flex-col gap-2'>
                    <label className="text-sm font-medium text-gray-700">On Top Discount</label>
                    <select
                        disabled={!priceAfterCoupon}
                        className={`border rounded p-2 ${!priceAfterCoupon ? "border-gray-400 text-gray-400" : "border-red-500 cursor-pointer"}`}
                        onChange={handleChangeOnTop}
                        value={selectedDiscounts.onTop}
                    >
                        <option value="">-- Select an on top discount --</option>
                        {onTopDiscounts.map(d => (
                            <option key={d.discountID} value={d.discountID}>{d.label}</option>
                        ))}
                    </select>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    <span className="text-sm font-medium text-gray-500">Price After Discount</span>
                    <span className='font-semibold'>{priceAfterOnTop.toFixed(2)}</span>
                </div>
            </div>


            {/* STEP3 - Seasonal Discount */}
            <div className='mt-5 flex gap-12 items-center'>
                <div className='w-[30%] flex flex-col gap-2'>
                    <label className="text-sm font-medium text-gray-700">Seasonal Discount</label>
                    <select
                        disabled={!priceAfterOnTop}
                        className={`border rounded p-2 ${!priceAfterOnTop ? "border-gray-400 text-gray-400" : "border-red-500 cursor-pointer"}`}
                        onChange={handleChangeSeasonal}
                        value={selectedDiscounts.seasonal}
                    >
                        <option value="">-- Select a seasonal discount --</option>
                        {seasonalDiscounts.map(d => (
                            <option key={d.discountID} value={d.discountID}>{d.label}</option>
                        ))}
                    </select>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    <span className="text-sm font-medium text-gray-500">Price After Discount</span>
                    <span className='font-semibold'>{priceAfterSeasonal.toFixed(2)}</span>
                </div>
            </div>

            {/* FINAL-PRICE + ORDER PAYMENT */}
            <div className='my-8 flex items-center justify-center md:justify-end md:px-48 gap-3'>
                <span className='font-semibold text-gray-500'>Order Final Price :</span>
                <span className='font-bold'>{orderFinalPrice.toFixed(2)} THB</span>
                <button
                    onClick={handleOrderToPayment}
                    className='bg-[#FA374A] text-white font-semibold px-4 py-2 rounded-lg ml-12 cursor-pointer hover:bg-red-700 hover:duration-500 hover:scale-110'>
                    ORDER PAYMENT
                </button>
            </div>



        </div>
    )
}

export default DiscountsSection