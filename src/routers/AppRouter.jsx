import React from 'react'
import { Route, Routes } from 'react-router'
import NotFoundPage from '../pages/NotFoundPage'
import PublicLayout from '../layouts/PublicLayout'
import HomePage from '../pages/HomePage'
import UserCarts from '../pages/UserCarts'
import UserCheckoutDiscount from '../pages/UserCheckoutDiscount'
import OrderSummary from '../pages/OrderSummary'

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path='user/my-cart' element={<UserCarts />} />
                <Route path='user/checkout-discount' element={<UserCheckoutDiscount />} />
                <Route path='user/order-summary/:orderID' element={<OrderSummary />} />
            </Route>

            {/* NOT FOUND PAGE*/}
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter