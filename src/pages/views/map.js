import React, { useEffect, memo, Fragment, useState } from 'react'
import Leaflet from 'leaflet'
import TextPath from 'react-leaflet-textpath'
import { sortArray } from '../../utils/sort-array'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { mapDataList } from '../../constants/index'

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet'
delete Leaflet.Icon.Default.prototype._getIconUrl

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const ShowMap = (props) => {
    const { path, cirebon } = props
    const [sortedArray, setSortedArray] = useState([])
    const [mappedPosition, setMappedPosition] = useState([])

    useEffect(() => {
        const sorted = sortArray(mapDataList, path, 'verteks')
        const filteredVerteks = sorted.filter((item) => {
            return path.includes(item.verteks)
        })
        const mappedPosition = filteredVerteks.map((item) => [
            parseFloat(item.lat),
            parseFloat(item.lng)
        ])
        setMappedPosition(mappedPosition)
        setSortedArray(filteredVerteks)
    }, [path])

    console.log(mappedPosition)

    return (
        <Fragment>
            {sortedArray.map((item, index) => {
                const lat = parseFloat(item.lat)
                const lng = parseFloat(item.lng)
                const distance = `${item.distance.toString()}km`
                let position = [lat, lng]

                return (
                    <Fragment key={index}>
                        {/* <TextPath
                            positions={[mappedPosition]}
                            text={distance}
                            center
                            offset={10}
                            attributes={{ 'font-size': 13 }}
                        /> */}
                        <Marker position={position}>
                            <Popup>
                                {item.name} ({item.verteks})
                            </Popup>
                        </Marker>
                    </Fragment>
                )
            })}
            <Polyline weight={5} positions={[mappedPosition]} />
        </Fragment>
    )
}

const MapView = (props) => {
    const { currentPosition, showPolyline, path, bobot } = props
    const cirebon = [-6.7137, 108.5607]

    return (
        <Map
            center={cirebon}
            zoom={13}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {/* show polyline after filtering */}
            {showPolyline && (
                <ShowMap path={path} cirebon={cirebon} bobot={bobot} />
            )}
        </Map>
    )
}

export default memo(MapView)
