import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router'
import MainNavBar from '../components/MainNavBar'

function PublicLayout() {



    return (
        <div className="min-h-screen flex flex-col">

            <MainNavBar />
            <Outlet />

        </div>
    )
}

export default PublicLayout