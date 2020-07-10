import React, { memo } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import MapPolyline from './map-polyline'

const MapView = (props) => {
    const { path, sanggarList, showPolyline } = props

    return (
        <Map
            center={[-6.7252, 108.5662]}
            zoom={13}
            style={{ height: '80vh', width: '100%', marginTop: '3.5rem' }}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <MapPolyline
                isShowPolyline={showPolyline}
                path={path}
                sanggarList={sanggarList}
            />
        </Map>
    )
}

export default memo(MapView)
