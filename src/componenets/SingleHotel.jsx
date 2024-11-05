import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHotel } from '../context/HotelProvider'
import Loader from './Loader'


function SingleHotel() {
    const { id } = useParams()
    const { getHotel, currHotel, isLoadingCurrHotel } = useHotel()

    useEffect(() => {
        getHotel(id)
    }, [id])

    if (isLoadingCurrHotel || !currHotel) return <Loader />


    return (
        <div className='flex items-center justify-between gap-4 max-w-[1280px] my-8 mx-auto'>
            <div className=''>
                <h2 className='mb-1 text-lg font-bold'>{currHotel?.name}</h2>
                <div className='mb-4'>{currHotel?.number_of_reviews} &bull; {currHotel?.smart_location}</div>
                <img className='w-full h-auto object-cover rounded-xl' src={currHotel?.xl_picture_url} alt={currHotel?.name} />
            </div>
        </div>
    )
}

export default SingleHotel