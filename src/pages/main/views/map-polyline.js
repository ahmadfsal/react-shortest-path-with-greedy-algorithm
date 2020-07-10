import React, { useState, useEffect, Fragment } from 'react'
import L from 'leaflet'
import { Marker, Polyline, Popup } from 'react-leaflet'
import { sortArray } from '../../../components'

L.Icon.Default.imagePath = '../node_modules/leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../../assets/images/sanggar.svg'),
    iconUrl: require('../../../assets/images/sanggar.svg'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const MapPolyline = (props) => {
    const { isShowPolyline, path, sanggarList } = props
    const [mappedPosition, setMappedPosition] = useState([])

    useEffect(() => {
        // Sort data by shortest path
        const sorted = sortArray(sanggarList, path, 'verteks')
        const filteredVerteks = sorted.filter((item) => {
            return path.includes(item.verteks)
        })
        // Get position to be displaying in map
        const mappedPosition = filteredVerteks.map((item) => [
            parseFloat(item.lat),
            parseFloat(item.lng)
        ])

        setMappedPosition(mappedPosition)
    }, [path, sanggarList])

    return (
        <Fragment>
            {sanggarList.map((item, index) => (
                <Marker
                    key={index}
                    position={[parseFloat(item.lat), parseFloat(item.lng)]}
                >
                    <Popup>
                        {`(${item.verteks}) ${item.name}`}
                        <br />
                        {item.short_description}
                    </Popup>
                </Marker>
            ))}
            {isShowPolyline && (
                <Polyline weight={5} positions={[mappedPosition]} />
            )}
        </Fragment>
    )
}

export default MapPolyline
