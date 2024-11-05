import { createContext, useContext, useState } from "react"
import { useSearchParams } from 'react-router-dom'
import useFetch from '../Hooks/useFech'
import axios from "axios"
import toast from "react-hot-toast"

const HotelContext = createContext()

function HotelProvider({ children }) {

    const [serchParams, setSearchParams] = useSearchParams()
    const [currHotel, setCurrHotel] = useState(null)
    const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false)

    const destination = serchParams.get("destination")
    const room = JSON.parse(serchParams.get("options"))?.room

    const { allData, isLoading } = useFetch("http://localhost:5000/hotels", `
        q=${destination || ""}&accommodates_gte=${room || 1}
        `)

    async function getHotel(id) {
        setIsLoadingCurrHotel(true)
        try {
            const { data } = await axios.get(`http://localhost:5000/hotels/${id}`)
            setCurrHotel(data)
            setIsLoadingCurrHotel(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoadingCurrHotel(false)
        }
    }

    return (
        <HotelContext.Provider value={{ allData, isLoading, getHotel, currHotel, isLoadingCurrHotel }}>
            {children}
        </HotelContext.Provider>
    )
}

export default HotelProvider


export function useHotel() {
    return useContext(HotelContext)
}