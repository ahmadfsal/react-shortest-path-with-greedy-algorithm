import React, { Fragment, memo, useState, useEffect } from 'react'
import MapView from './views/map'
import { SideNavigation } from '../components'
import {
    START_FROM,
    TO_DESTINATION,
    LABEL,
    ADJACENCY_MATRIX,
    API_URL
} from '../constants'

const Main = () => {
    const [startFrom, setStartFrom] = useState(null)
    const [toDestination, setDestination] = useState(null)
    const [showPolyline, setShowPolyline] = useState(false)
    const [path, setPath] = useState([])
    const [bobot, setBobot] = useState([])
    const [totalJarak, setTotalJarak] = useState(null)
    const [objSanggarList, setObjSanggarList] = useState([])
    const [sanggarList, setSanggarList] = useState([])

    const handleChangeInput = (type, value) => {
        switch (type) {
            case START_FROM:
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
    }

    useEffect(() => {
        fetch(API_URL, { method: 'GET' })
            .then((res) => res.json())
            .then((resp) => {
                if (resp.length > 0) {
                    let initial = []

                    resp.map((item, index) => {
                        initial.push({
                            text: item.name,
                            value: index
                        })
                    })
                    setObjSanggarList(initial)
                }
                setSanggarList(resp)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <Fragment>
            <SideNavigation
                bobot={bobot}
                handleChangeInput={handleChangeInput}
                handleResetForm={handleResetForm}
                handleSubmit={handleSubmit}
                objSanggarList={objSanggarList}
                path={path}
                startFrom={startFrom}
                toDestination={toDestination}
                totalJarak={totalJarak}
            />
            <div className='content-container-body'>
                <MapView
                    path={path}
                    sanggarList={sanggarList}
                    showPolyline={showPolyline}
                />
            </div>
        </Fragment>
    )
}

export default memo(Main)
