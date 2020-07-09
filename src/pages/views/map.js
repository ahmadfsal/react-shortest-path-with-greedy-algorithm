import React, { memo, Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import MapPolyline from './map-polyline'

class MapView extends Component {
    constructor() {
        super()
        this.state = { isMapInit: false }
    }

    saveMap = (map) => {
        this.map = map
        this.setState({
            isMapInit: true
        })
    }

    render() {
        const { currentPosition, showPolyline, path, bobot } = this.props
        return (
            <Map
                ref={this.saveMap}
                center={[-6.7252, 108.5662]}
                zoom={14}
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <MapPolyline
                    path={path}
                    bobot={bobot}
                    map={this.map}
                    isMapInit={this.state.isMapInit}
                    isShowPolyline={showPolyline}
                />
            </Map>
        )
    }
}

export default memo(MapView)
