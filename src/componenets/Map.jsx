import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import useGeoLocation from '../Hooks/useGeoLocation'
import useUrlLocation from '../Hooks/useUrlLocation'

function Map({ markerLocations, isLoading }) {
    const [lat, lng] = useUrlLocation()
    const [mapCenter, setMapCenter] = useState([20, 4])
    const { getPosition, isLoading: isLoadingPosition, posation: geoPosition } = useGeoLocation()

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng])
    }, [lat, lng])

    useEffect(() => {
        if (geoPosition?.lat && geoPosition?.lng) setMapCenter([geoPosition.lat, geoPosition.lng])
    }, [geoPosition])

    if (isLoading) return <Loader />

    return (
        <div className='flex-1 -bg--text-100 relative w-full h-full'>
            <button
                onClick={getPosition}
                className='px-2 py-1 text-xs font-bold rounded-lg absolute bottom-4 left-4 -bg--primary-600 shadow-md text-white z-[50000000]'>
                {isLoadingPosition ? "Loading ..." : "Use Your Location"}
            </button>
            <MapContainer className='w-full h-full' center={mapCenter} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <ChangeCenter position={mapCenter} />
                <DetectClick />
                {
                    markerLocations.map(item => <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.host_location}
                        </Popup>
                    </Marker>)
                }

            </MapContainer>
        </div>
    )
}

export default Map


function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}


function DetectClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: e => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })

    return null
}