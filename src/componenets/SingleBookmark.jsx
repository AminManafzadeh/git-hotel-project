import React, { useEffect } from 'react'
import { useBookmark } from '../context/BookmarkProvider'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from './Loader'
import { IoMdArrowRoundBack } from "react-icons/io";
import ReactCountryFlag from 'react-country-flag';

function SingleBookmark() {
    const { id } = useParams()
    const { getBookmark, currBookmark, isLoading } = useBookmark()
    const navigate = useNavigate()

    useEffect(() => {
        getBookmark(id)
    }, [id])

    if (isLoading || !currBookmark) return <Loader />

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className='py-1 px-3 rounded-lg border border-solid -border--text-400 flex items-center'
            >
                <IoMdArrowRoundBack /> Back
            </button>
            <h1 className='font-bold my-2'>{currBookmark?.cityName}</h1>
            <div className="mb-4 border border-solid -border--text-400 rounded-2xl p-4 flex items-center justify-between">
                <div className='flex items-center'><ReactCountryFlag svg countryCode={currBookmark.countryCode} />
                    &nbsp;<strong>{currBookmark.cityName}</strong></div> &nbsp; <span className='font-semibold'>{currBookmark.country}</span>
            </div>
        </div>
    )
}

export default SingleBookmark