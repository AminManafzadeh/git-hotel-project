import React from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelProvider'
import Loader from './Loader'

function Hotels() {
    const { allData, isLoading, currHotel } = useHotel()

    console.log(allData)
    if (isLoading) return <Loader />

    return (
        <div className='flex flex-col gap-4'>
            <h2>Search Results ({allData.length})</h2>
            {allData.map?.(item => {
                return (
                    <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                        <div className={`flex gap-4 ${item.id === currHotel?.id ? "border-2 border-solid -border--primary-700 rounded-2xl" : ""}`}>
                            <img className='w-24 h-24 object-cover rounded-2xl' src={item.xl_picture_url} alt={item.name} />
                            <div>
                                <p className='-text--text-700 mb-1 font-medium'>{item.smart_location}</p>
                                <p className='mb-1 -text--text-400'>{item.name}</p>
                                <p className='font-medium flex items-center'>
                                    €&nbsp;{item.price}&nbsp; <span className='-text--text-700 font-normal'>Night</span>
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Hotels