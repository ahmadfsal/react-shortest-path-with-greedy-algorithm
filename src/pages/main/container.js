import React, { Fragment, memo, useState, useEffect } from 'react'
import MapView from './views/map'
import ModalLogin from './views/modal-login'
import MapFilter from './views/map-filter'
import { useHistory } from 'react-router-dom'
import { Header } from 'components'
import {
    START_FROM,
    TO_DESTINATION,
    LABEL,
    ADJACENCY_MATRIX,
    USERNAME,
    PASSWORD,
    API_URL
} from '../../constants'

const Main = () => {
    const history = useHistory()
    const [startFrom, setStartFrom] = useState(null)
    const [toDestination, setDestination] = useState(null)
    const [showPolyline, setShowPolyline] = useState(false)
    const [path, setPath] = useState([])
    const [bobot, setBobot] = useState([])
    const [totalJarak, setTotalJarak] = useState(null)
    const [objSanggarList, setObjSanggarList] = useState([])
    const [sanggarList, setSanggarList] = useState([])
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChangeInput = (type, value) => {
        switch (type) {
            case START_FROM:
                setStartFrom(value)
                break
            case TO_DESTINATION:
                setDestination(value)
                break
            case USERNAME:
                setUsername(value)
                break
            case PASSWORD:
                setPassword(value)
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

    const handleSubmitLogin = (e) => {
        e.preventDefault()

        if (username === '') {
            alert('Username or Password cannot be empty')
        } else if (password === '') {
            alert('Username or Password cannot be empty')
        } else if (username !== 'admin' || password !== 'admin') {
            alert('Incorrect Username or Password')
        } else {
            localStorage.setItem('isLogin', true)
            history.push('/admin')
        }
    }

    const handleModalLogin = () => setShowModalLogin(!showModalLogin)

    const handleResetForm = () => {
        setPath([])
        setTotalJarak(null)
        setShowPolyline(false)
        setStartFrom('')
        setDestination('')
    }

    const fetchSanggarList = () => {
        fetch(API_URL, { method: 'GET' })
            .then((res) => res.json())
            .then((resp) => {
                if (resp.length > 0) {
                    let initial = []

                    resp.map((item, index) => {
                        initial.push({
                            text: `${item.verteks}. ${item.name}`,
                            value: index
                        })
                    })
                    setObjSanggarList(initial)
                }
                setSanggarList(resp)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchSanggarList()
    }, [])

    return (
        <Fragment>
            <Header
                buttonTitle='Login'
                title='Greedy Algorithm'
                onClickButton={handleModalLogin}
            />
            <MapFilter
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

            <ModalLogin
                errorMessage={errorMessage}
                handleChangeInput={handleChangeInput}
                handleModalLogin={handleModalLogin}
                handleSubmitLogin={handleSubmitLogin}
                isShow={showModalLogin}
                password={password}
                username={username}
            />
        </Fragment>
    )
}

export default memo(Main)
