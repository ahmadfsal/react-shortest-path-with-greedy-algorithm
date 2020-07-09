import { MapLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'lrm-google'
import 'lrm-graphhopper'
import { withLeaflet } from 'react-leaflet'

class Routing extends MapLayer {
    createLeafletElement() {
        const { map } = this.props

        const mp = JSON.parse(localStorage.getItem('MAPPED'))
        const newMp = mp.map(item => {
            return L.latLng(item[0], item[1])
        })

        let leafletElement = L.Routing.control({
            router: new L.Routing.graphHopper(
                '651ca67f-d38f-4bc0-bb2a-0b7b4eb79e84'
            ),
            lineOptions: {
                styles: [
                    {
                        color: 'blue',
                        opacity: 0.6,
                        weight: 4
                    }
                ]
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            showAlternatives: false,
        }).addTo(map.leafletElement)

        return leafletElement
            .getPlan()
            .setWaypoints(newMp)
    }
}
export default withLeaflet(Routing)
