import React, { Fragment, memo, useState, useEffect } from 'react'
import MapView from './views/map'
import { SideNavigation } from '../components'
import {
    START_FROM,
    TO_DESTINATION,
    MY_LOCATION,
    LABEL,
    ADJACENCY_MATRIX
} from '../constants'

const Main = () => {
    const defaultCurrentPosition = { lat: null, lng: null }
    const geolocation = navigator.geolocation
    const [startFrom, setStartFrom] = useState(null)
    const [toDestination, setDestination] = useState(null)
    const [showPolyline, setShowPolyline] = useState(false)
    const [path, setPath] = useState([])
    const [bobot, setBobot] = useState([])
    const [totalJarak, setTotalJarak] = useState(null)
    const [currentPosition, setCurrentPosition] = useState(defaultCurrentPosition)

    const handleChangeInput = (type, value) => {
        switch (type) {
            case START_FROM:
                if (value === MY_LOCATION) getUserLocation()
                setStartFrom(value)
                break
            case TO_DESTINATION:
                setDestination(value)
                break
            default:
                break
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let visited = []
        let result = []
        let bobotArr = []

        for (let i = 0; i <= LABEL.length; i++) {
            visited.push(false)
        }

        let indexVerteksAwal = startFrom
        let indexVerteksAkhir = toDestination
        let totalBobot = 0
        let verteksAsal = indexVerteksAwal

        visited[verteksAsal] = true
        result.push(LABEL[verteksAsal])

        while (verteksAsal != indexVerteksAkhir) {
            let verteksTujuan = 1
            let MIN = Number.MAX_VALUE

            for (let i = 0; i < ADJACENCY_MATRIX[verteksAsal].length; i++) {
                let bobot = ADJACENCY_MATRIX[verteksAsal][i]
                let isVisited = visited[i]

                if (bobot > 0 && !isVisited && bobot < MIN) {
                    MIN = bobot
                    bobotArr.push(bobot)
                    verteksTujuan = i
                }
            }

            if (verteksTujuan != -1) {
                visited[verteksTujuan] = true
                result.push(LABEL[verteksTujuan])

                let bobot = ADJACENCY_MATRIX[verteksAsal][verteksTujuan]
                totalBobot += bobot
                verteksAsal = verteksTujuan
            } else {
                break
            }
        }

        const joinResult = result.join('-')
        const joinBobot = bobotArr.join('+')

        setBobot(joinBobot)
        setPath(joinResult)
        setTotalJarak(totalBobot)
        setShowPolyline(true)
    }

    const handleResetForm = () => {
        setPath([])
        setTotalJarak(null)
        setShowPolyline(false)
        setStartFrom('')
        setDestination('')
        setCurrentPosition(defaultCurrentPosition)
    }

    useEffect(() => {
        if (geolocation) getUserLocation()
    }, [geolocation])

    const getUserLocation = () => {
        // deteksi lokasi user
        geolocation.getCurrentPosition((position) => {
            setCurrentPosition((prevValue) => ({
                ...prevValue,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }))
        })
    }

    return (
        <Fragment>
            <SideNavigation
                startFrom={startFrom}
                toDestination={toDestination}
                handleSubmit={handleSubmit}
                handleChangeInput={handleChangeInput}
                handleResetForm={handleResetForm}
                path={path}
                totalJarak={totalJarak}
                bobot={bobot}
            />
            <div className='content-container-body'>
                <MapView
                    currentPosition={currentPosition}
                    showPolyline={showPolyline}
                    path={path}
                    bobot={bobot}
                />
            </div>
        </Fragment>
    )
}

export default memo(Main)
