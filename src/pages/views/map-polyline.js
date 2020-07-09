import React, { useState, useEffect, Fragment } from 'react'
import L from 'leaflet'
import TextPath from 'react-leaflet-textpath'
import { Marker, Polyline, Popup } from 'react-leaflet'
import { sortArray } from '../../components'

L.Icon.Default.imagePath = '../node_modules/leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
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
    }, [path])

    return (
        <Fragment>
            {sanggarList.map((item, index) => (
                <Fragment key={index}>
                    <Marker
                        position={[parseFloat(item.lat), parseFloat(item.lng)]}
                    >
                        <Popup>{`${item.name} (${item.verteks})`}</Popup>
                    </Marker>
                </Fragment>
            ))}
            {isShowPolyline && (
                <Fragment>
                    {/* <TextPath
                        positions={[mappedPosition]}
                        text={'tes'}
                        attributes={{
                            'font-size': 20
                        }}
                    /> */}
                    <Polyline weight={5} positions={[mappedPosition]} />
                </Fragment>
            )}
        </Fragment>
    )
}

export default MapPolyline
