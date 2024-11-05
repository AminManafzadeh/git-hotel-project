import React from 'react'
import { Oval } from 'react-loader-spinner'

function Loader() {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <Oval
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                className="flex items-center justify-items-center"
            />
        </div>
    )
}

export default Loader