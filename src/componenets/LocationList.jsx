import React from 'react'
import useFetch from '../Hooks/useFech'
import Loader from './Loader'


function LocationList() {
    const { allData, isLoading } = useFetch("http://localhost:5000/hotels", "")
    console.log(allData)



    console.log(allData)

    return (

        <div className='max-w-[1280px] my-8 mx-auto'>
            {
                isLoading ? <Loader /> : <div><h1 className='mb-4'>Nearby Lovations</h1>
                    <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8'>
                        {
                            allData?.map(item => {
                                return <div key={item.id}>
                                    <img className='w-full h-80 object-cover object-center rounded-lg mb-2' src={item.xl_picture_url} alt={item.name} />
                                    <div className='mb-1'>
                                        <p className='font-medium'>{item.smart_location}</p>
                                        <p className='-text--text-400'>{item.name}</p>
                                        <p className='font-medium flex items-center'>
                                            €&nbsp;{item.price}&nbsp; <span className='-text--text-400 font-normal'>Night</span>
                                        </p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default LocationList



