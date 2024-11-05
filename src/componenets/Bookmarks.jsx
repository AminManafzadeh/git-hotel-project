import React from 'react'
import { useBookmark } from '../context/BookmarkProvider'
import Loader from './Loader'
import ReactCountryFlag from "react-country-flag"
import { Link } from 'react-router-dom'
import { IoTrashOutline } from "react-icons/io5";

function Bookmarks() {
    const { bookmarks, isLoading, currBookmark, deleteBookmark } = useBookmark()

    const handleClick = async (e, id) => {
        e.preventDefault()
        await deleteBookmark(id)
    }

    if (isLoading || !bookmarks) return <Loader />
    if (!bookmarks.length) return <p className='-text--rose-500 font-bold'>There is no Bookmarked Location !!!</p>

    return (
        <div>
            <h2 className='font-semibold'>Bookmark List ({bookmarks.length})</h2>
            <div className='mt-4'>
                {bookmarks?.map(item => {
                    return (
                        <Link to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`} key={item.id}>
                            <div className={`mb-4 border border-solid -border--text-400 rounded-2xl p-4 flex items-center justify-between ${item.id === currBookmark?.id ? "border-2 border-solid border-blue-800 rounded-2xl" : ""}`}>
                                <div className='flex items-center'><ReactCountryFlag svg countryCode={item.countryCode} />
                                    &nbsp;<strong>{item.cityName}</strong> &nbsp; <span>{item.country}</span>
                                </div>
                                <button onClick={(e) => handleClick(e, item.id)}>
                                    <IoTrashOutline className='w-4 h-4 -text--rose-500' />
                                </button>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Bookmarks