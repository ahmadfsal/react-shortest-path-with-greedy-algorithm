import React, { Fragment, useState, useEffect } from 'react'
import LeftMenu from './views/left-menu'
import SanggarTable from './views/table-sanggar'
import StartingPointTable from './views/table-starting-point'
import ModalAddSanggar from './views/modal-add-sanggar'
import ModalStartingPoint from './views/modal-starting-point'
import ModalConfirmation from './views/modal-confirmation'
import { Header, Button } from 'components'
import { API_URL } from '../../constants'
import './style.scss'

const AdminPage = () => {
    const [sanggarList, setSanggarList] = useState([])
    const [startingPointList, setStartingPointList] = useState([])
    const [modalType, setModalType] = useState('')
    const [sanggarDetail, setSanggarDetail] = useState({})
    const [startingPointDetail, setStartingPointDetail] = useState({})
    const [menuActive, setMenuActive] = useState({
        isSanggar: false,
        isStartingPoint: false
    })
    const [showModalAddSanggar, setShowModalAddSanggar] = useState({
        isShow: '',
        sanggarId: ''
    })
    const [
        showModalAddEditStartingPoint,
        setShowModalAddEditStartingPoint
    ] = useState({
        isShow: false,
        startingPointId: null
    })
    const [showModalConfirmation, setShowModalConfirmation] = useState({
        isShow: false,
        type: ''
    })
    const defaultFormData = {
        name: '',
        verteks: '',
        lat: '',
        lng: '',
        address: '',
        distance: '',
        short_description: ''
    }
    const [formData, setFormData] = useState(defaultFormData)
    const [formStartingPoint, setFormStartingPoint] = useState(defaultFormData)

    const handleMenuActive = (type) => {
        switch (type) {
            case 'IS_MASTER':
                setMenuActive((prevValue) => ({
                    ...prevValue,
                    isSanggar: false,
                    isStartingPoint: false
                }))
                break
            case 'IS_SANGGAR':
                setMenuActive((prevValue) => ({
                    ...prevValue,
                    isSanggar: true,
                    isStartingPoint: false
                }))
                break
            case 'IS_STARTING_POINT':
                setMenuActive((prevValue) => ({
                    ...prevValue,
                    isStartingPoint: true,
                    isSanggar: false
                }))
                break
            default:
                break
        }
    }

    const handleChangeModalType = (type) => {
        setModalType(type)
    }

    const handleModalConfirmation = (type) => {
        setShowModalConfirmation((prevVal) => ({
            ...prevVal,
            isShow: !prevVal.isShow,
            type
        }))
    }

    const handleSubmit = (type) => {
        switch (type) {
            case 'SAVE':
                handleAddSanggar()
                break
            case 'SAVE_STARTING_POINT':
                handleAddStartingPoint()
                break
            case 'UPDATE':
                handleUpdateSanggar(showModalAddSanggar.sanggarId)
                break
            case 'UPDATE_STARTING_POINT':
                handleUpdateStartingPoint(showModalAddEditStartingPoint.startingPointId)
                break
            case 'DELETE':
                handleModalConfirmation('DELETE')
                break
            case 'DELETE_STARTING_POINT':
                handleModalConfirmation('DELETE_STARTING_POINT')
                break
            default:
                break
        }
    }

    // Sanggar
    const fetchSanggar = () => {
        fetch(`${API_URL}/sanggars`, { method: 'GET' })
            .then((res) => res.json())
            .then((resp) => setSanggarList(resp))
            .catch((err) => console.log(err))
    }

    const handleChangeInput = (e) => {
        const { value, name } = e.target
        setFormData((prevVal) => ({
            ...prevVal,
            [name]: value
        }))
    }

    const handleChangeUpdate = (e) => {
        const { value, name } = e.target
        setSanggarDetail((prevVal) => ({
            ...prevVal,
            [name]: value
        }))
    }

    const handleDeleteSanggar = () => {
        fetch(`${API_URL}/sanggars/${showModalAddSanggar.sanggarId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp) {
                    handleModalConfirmation()
                    alert('Successfully delete sanggar')
                    setShowModalAddSanggar(false)
                    fetchSanggar()
                }
            })
            .catch((err) => console.log(err))
    }

    const handleUpdateSanggar = (sanggarId) => {
        fetch(`${API_URL}/sanggars/${sanggarId}`, {
            method: 'PUT',
            body: JSON.stringify(sanggarDetail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp) {
                    alert('Successfully update sanggar')
                    setShowModalAddSanggar(false)
                    fetchSanggar()
                    setFormData(defaultFormData)
                }
            })
            .catch((err) => console.log(err))
    }

    const handleAddSanggar = () => {
        fetch(`${API_URL}/sanggars`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp) {
                    alert('Successfully add sanggar')
                    setShowModalAddSanggar(false)
                    fetchSanggar()
                    setFormData(defaultFormData)
                }
            })
            .catch((err) => console.log(err))
    }

    const handleModalAddSanggar = (sanggarId) => {
        setShowModalAddSanggar((prevValue) => ({
            ...prevValue,
            isShow: !prevValue.isShow,
            sanggarId
        }))
    }

    // Starting Point
    const fetchStartingPoint = () => {
        fetch(`${API_URL}/starting-point`, { method: 'GET' })
            .then((res) => res.json())
            .then((resp) => setStartingPointList(resp))
            .catch((err) => console.log(err))
    }

    const handleChangeStartingPoint = (e) => {
        const { value, name } = e.target
        setFormStartingPoint((prevVal) => ({
            ...prevVal,
            [name]: value
        }))
    }

    const handleChangeUpdateStartingPoint = (e) => {
        const { value, name } = e.target
        setStartingPointDetail((prevVal) => ({
            ...prevVal,
            [name]: value
        }))
    }

    const handleDeleteStartingPoint = () => {
        fetch(
            `${API_URL}/starting-point/${showModalAddEditStartingPoint.startingPointId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => res.json())
            .then((resp) => {
                if (resp) {
                    handleModalConfirmation()
                    alert('Successfully delete starting point')
                    setShowModalAddEditStartingPoint(false)
                    fetchStartingPoint()
                }
            })
            .catch((err) => console.log(err))
    }

    const handleUpdateStartingPoint = (startingPointId) => {
        fetch(`${API_URL}/starting-point/${startingPointId}`, {
            method: 'PUT',
            body: JSON.stringify(startingPointDetail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp) {
                    alert('Successfully update starting point')
                    setShowModalAddEditStartingPoint(false)
                    fetchStartingPoint()
                    setFormStartingPoint(defaultFormData)
                }
            })
            .catch((err) => console.log(err))
    }

    const handleAddStartingPoint = () => {
        fetch(`${API_URL}/starting-point`, {
            method: 'POST',
            body: JSON.stringify(formStartingPoint),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp) {
                    alert('Successfully add starting point')
                    setShowModalAddEditStartingPoint(false)
                    fetchStartingPoint()
                    setFormStartingPoint(defaultFormData)
                }
            })
            .catch((err) => console.log(err))
    }

    const handleModalAddEditStartingPoint = (startingPointId) => {
        setShowModalAddEditStartingPoint((prevValue) => ({
            ...prevValue,
            isShow: !prevValue.isShow,
            startingPointId
        }))
    }

    useEffect(() => {
        fetchSanggar()
        fetchStartingPoint()
    }, [])

    useEffect(() => {
        if (modalType === 'EDIT') {
            fetch(`${API_URL}/sanggars/${showModalAddSanggar.sanggarId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((resp) => setSanggarDetail(resp))
                .catch((err) => console.log(err))
        } else if (modalType === 'EDIT_STARTING_POINT') {
            fetch(`${API_URL}/starting-point/${showModalAddEditStartingPoint.startingPointId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((resp) => setStartingPointDetail(resp))
                .catch((err) => console.log(err))
        }
    }, [modalType])

    return (
        <Fragment>
            <Header
                title='Welcome, Admin!'
                buttonTitle='Logout'
                onClickButton={() => {
                    handleModalConfirmation('LOGOUT')
                }}
            />
            <LeftMenu
                handleMenuActive={handleMenuActive}
                menuActive={menuActive}
            />

            <div className='content-container-body'>
                {!menuActive.isSanggar && !menuActive.isStartingPoint && (
                    <div className='admin-content'>
                        <h4>Dashboard Admin</h4>
                    </div>
                )}

                {menuActive.isSanggar && (
                    <Fragment>
                        <div className='level admin-content'>
                            <div className='level-left has-text-weight-medium is-size-4'>
                                Sanggar
                            </div>
                            <div className='level-right'>
                                <Button
                                    onClick={() => {
                                        handleModalAddSanggar()
                                        handleChangeModalType('ADD')
                                    }}
                                >
                                    Add New Sanggar
                                </Button>
                            </div>
                        </div>
                        <SanggarTable
                            handleChangeModalType={handleChangeModalType}
                            handleModalAddSanggar={handleModalAddSanggar}
                            sanggarList={sanggarList}
                        />
                    </Fragment>
                )}

                {menuActive.isStartingPoint && (
                    <Fragment>
                        <div className='level admin-content'>
                            <div className='level-left has-text-weight-medium is-size-4'>
                                Starting Point
                            </div>
                            <div className='level-right'>
                                <Button
                                    onClick={() => {
                                        handleModalAddEditStartingPoint()
                                        handleChangeModalType('ADD_STARTING_POINT')
                                    }}
                                >
                                    Add New Starting Point
                                </Button>
                            </div>
                        </div>
                        <StartingPointTable
                            handleChangeModalType={handleChangeModalType}
                            handleModalAddEditStartingPoint={
                                handleModalAddEditStartingPoint
                            }
                            startingPointList={startingPointList}
                        />
                    </Fragment>
                )}
            </div>

            <ModalAddSanggar
                modalAttr={showModalAddSanggar}
                handleModalAddSanggar={handleModalAddSanggar}
                formData={formData}
                handleChangeInput={handleChangeInput}
                handleSubmit={handleSubmit}
                handleChangeUpdate={handleChangeUpdate}
                modalType={modalType}
                sanggarDetail={sanggarDetail}
            />

            <ModalStartingPoint
                formStartingPoint={formStartingPoint}
                handleChangeStartingPoint={handleChangeStartingPoint}
                handleChangeUpdateStartingPoint={handleChangeUpdateStartingPoint}
                handleModalAddEditStartingPoint={handleModalAddEditStartingPoint}
                handleSubmit={handleSubmit}
                modalAttr={showModalAddEditStartingPoint}
                modalType={modalType}
                startingPointDetail={startingPointDetail}
            />

            <ModalConfirmation
                handleDeleteSanggar={handleDeleteSanggar}
                handleDeleteStartingPoint={handleDeleteStartingPoint}
                handleModalConfirmation={handleModalConfirmation}
                modalAttr={showModalConfirmation}
            />
        </Fragment>
    )
}

export default AdminPage
