import React, { useState, useEffect, Fragment } from 'react'
import L from 'leaflet'
import { Marker, Polyline, Popup } from 'react-leaflet'
import { sortArray } from 'components'

L.Icon.Default.imagePath = 'node_modules/leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('assets/images/sanggar.svg'),
    iconUrl: require('assets/images/sanggar.svg'),
})

let startingPointIcon = L.icon({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [24, 32],
})

const MapPolyline = (props) => {
    const { isShowPolyline, path, sanggarList, startingPointList } = props
    const [mappedPosition, setMappedPosition] = useState([])
    const [filteredVerteks, setFilteredVerteks] = useState([])
    const mergeList = [...sanggarList, ...startingPointList]

    useEffect(() => {
        // Sort data by shortest path
        const sorted = sortArray(mergeList, path, 'verteks')
        const filteredVerteks = sorted.filter((item) => {
            return path.includes(item.verteks)
        })
        setFilteredVerteks(filteredVerteks)
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

            {filteredVerteks.length > 0 &&
                filteredVerteks.map((item, index) => {
                    if (index === 0) {
                        return (
                            <Marker
                                key={index}
                                position={[
                                    parseFloat(item.lat),
                                    parseFloat(item.lng)
                                ]}
                                icon={startingPointIcon}
                            >
                                <Popup>
                                    {`(${item.verteks}) ${item.name}`}
                                    <br />
                                    {item.short_description}
                                </Popup>
                            </Marker>
                        )
                    }

                    return (
                        <Marker
                            key={index}
                            position={[
                                parseFloat(item.lat),
                                parseFloat(item.lng)
                            ]}
                        >
                            <Popup>
                                {`(${item.verteks}) ${item.name}`}
                                <br />
                                {item.short_description}
                            </Popup>
                        </Marker>
                    )
                })}

            {isShowPolyline && (
                <Polyline weight={5} positions={[mappedPosition]} />
            )}
        </Fragment>
    )
}

export default MapPolyline
