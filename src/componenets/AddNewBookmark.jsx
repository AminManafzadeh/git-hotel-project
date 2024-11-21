import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import useUrlLocation from '../Hooks/useUrlLocation'
import axios from 'axios'
import Loader from './Loader'
import ReactCountryFlag from 'react-country-flag'
import { useBookmark } from '../context/BookmarkProvider'

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function AddNewBookmark() {
    const navigate = useNavigate()
    const [lat, lng] = useUrlLocation()
    const [cityName, setCityName] = useState("")
    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
    const [geoCodingError, setGeoCodingError] = useState(null)
    const { createBookmark } = useBookmark()

    console.log(lat, lng)

    const handleBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        if (!lat || !lng) return;

        async function fetchLocationData() {
            setIsLoadingGeoCoding(true)
            setGeoCodingError(null)
            try {
                const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
                console.log(data)

                if (!data.countryName) throw new Error("this location is not a city! please click somewhere else")

                setCityName(data?.city || data?.locality || "")
                setCountry(data?.countryName)
                setCountryCode(data?.countryCode)
            } catch (error) {
                setGeoCodingError(error?.message)
            } finally {
                setIsLoadingGeoCoding(false)
            }
        }

        fetchLocationData()
    }, [lat, lng])

    if (isLoadingGeoCoding) return <Loader />
    if (geoCodingError) return <p className='font-bold text-red-700'>{geoCodingError}</p>

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!cityName || !country) return

        const newBookmark = {
            cityName,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + " " + country,
        }

        await createBookmark(newBookmark)
        navigate("/bookmark")
    }

    return (
        <div>
            <h2 className='font-bold my-2'>Bookmark New Location</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' htmlFor="cityName">CityName :</label>
                    <input
                        className='p-2 rounded-lg w-full border border-solid -text--text-700'
                        type="text"
                        name="cityName"
                        id="cityName"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                </div>
                <div className='mb-4 relative'>
                    <label className='block mb-1 font-semibold' htmlFor="country">Country :</label>
                    <input
                        className='p-2 rounded-lg w-full border border-solid -text--text-700'
                        type="text"
                        name="country"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <span><ReactCountryFlag className='absolute right-4 top-[60%]' svg countryCode={countryCode} /></span>
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        onClick={handleBack}
                        className='py-1 px-3 rounded-lg border border-solid -border--text-400 flex items-center'
                    >
                        <IoMdArrowRoundBack /> Back
                    </button>

                    <button
                        type='submit'
                        className='py-1 px-3 rounded-lg border border-solid -border--text-400 flex items-center -bg--primary-600 text-[#fff]'
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNewBookmark