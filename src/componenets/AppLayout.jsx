import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from "./Map"
import { useHotel } from '../context/HotelProvider'



function AppLayout() {
    const { isLoading, allData } = useHotel()

    return (
        <div id="appLayout" className='flex justify-between  mt-4 items-stretch '>
            <div className='w-[35%] overflow-y-scroll pr-4 md:w-[50%]'>
                <Outlet />
            </div>
            <div className='w-full h-full'>
                <Map markerLocations={allData} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default AppLayout