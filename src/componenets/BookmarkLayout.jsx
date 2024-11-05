import React from 'react'
import Map from './Map'
import { Outlet } from 'react-router-dom'
import { useBookmark } from '../context/BookmarkProvider'

function BookmarkLayout() {
    const { bookmarks, isLoading } = useBookmark()


    return (
        <div id="appLayout" className='flex justify-between mt-4 items-stretch '>
            <div className='w-[35%] overflow-y-scroll pr-4 md:w-[50%]'>
                <Outlet />
            </div>
            <div className='w-full h-full'>
                <Map markerLocations={bookmarks} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default BookmarkLayout