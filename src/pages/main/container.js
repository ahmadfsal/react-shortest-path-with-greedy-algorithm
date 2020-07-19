import React, { Fragment, memo, useState, useEffect } from 'react'
import MapView from './views/map'
import ModalLogin from './views/modal-login'
import MapFilter from './views/map-filter'
import { useHistory } from 'react-router-dom'
import { Header } from 'components'
import {
    ADJACENCY_MATRIX,
    ADJACENCY_MATRIX_START,
    API_URL,
    LABEL,
    LABEL_STARTING_POINT,
    PASSWORD,
    START_FROM,
    TO_DESTINATION,
    USERNAME
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
    const [objStartFrom, setObjStartFrom] = useState([])
    const [sanggarList, setSanggarList] = useState([])
    const [startingPointList, setStartingPointList] = useState([])
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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

        if (startFrom && toDestination) {
            let visited = []
            let result = []

            let verteksAsal = startFrom
            let indexVerteksAkhir = toDestination
            let totalBobot = 0

            const matrixStartingPoint = ADJACENCY_MATRIX_START[verteksAsal]
            const mergeMatrix = [...ADJACENCY_MATRIX, matrixStartingPoint]

            const labelStartingPoint = LABEL_STARTING_POINT[verteksAsal]
            const mergeLabel = [...LABEL, labelStartingPoint]

            let findMatrixIndex = mergeMatrix.indexOf(matrixStartingPoint)
            let findLabelIndex = mergeLabel.indexOf(labelStartingPoint)

            for (let i = 0; i <= mergeLabel.length; i++) {
                visited.push(false)
            }

            visited[findMatrixIndex] = true
            result.push(mergeLabel[findLabelIndex])

            while (findMatrixIndex != indexVerteksAkhir) {
                let verteksTujuan = 1
                let MIN = Number.MAX_VALUE

                for (let i = 0; i < mergeMatrix[findMatrixIndex].length; i++) {
                    let bobot = mergeMatrix[findMatrixIndex][i]
                    let isVisited = visited[i]

                    if (bobot > 0 && !isVisited && bobot < MIN) {
                        MIN = bobot
                        verteksTujuan = i
                    }
                }

                if (verteksTujuan != -1) {
                    visited[verteksTujuan] = true
                    result.push(mergeLabel[verteksTujuan])

                    let bobot = mergeMatrix[findMatrixIndex][verteksTujuan]
                    totalBobot += bobot
                    findMatrixIndex = verteksTujuan
                } else {
                    break
                }
            }

            const joinResult = result.join('-')

            setPath(joinResult)
            setTotalJarak(totalBobot)
            setShowPolyline(true)
        }
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
        fetch(`${API_URL}/sanggars`, { method: 'GET' })
            .then((res) => res.json())
            .then((resp) => {
                setSanggarList(resp)
                let initialSanggar = []

                resp.map((item, index) => {
                    initialSanggar.push({
                        text: `${item.verteks}. ${item.name}`,
                        value: index
                    })
                })
                setObjSanggarList(initialSanggar)
            })
            .catch((err) => console.log(err))
    }

    const fetchStartingPoint = () => {
        fetch(`${API_URL}/starting-point`, { method: 'GET' })
            .then((res) => res.json())
            .then((resp) => {
                setStartingPointList(resp)
                let initialStartFrom = []

                resp.map((item, index) => {
                    initialStartFrom.push({
                        text: `${item.verteks}. ${item.name}`,
                        value: index
                    })
                })
                setObjStartFrom(initialStartFrom)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchSanggarList()
        fetchStartingPoint()
    }, [])

    return (
        <Fragment>
            <Header
                buttonTitle='Login'
                title='Greedy Algorithm'
                onClickButton={handleModalLogin}
            />
            <MapFilter
                handleChangeInput={handleChangeInput}
                handleResetForm={handleResetForm}
                handleSubmit={handleSubmit}
                objSanggarList={objSanggarList}
                objStartFrom={objStartFrom}
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
                    startingPointList={startingPointList}
                />
            </div>

            <ModalLogin
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
