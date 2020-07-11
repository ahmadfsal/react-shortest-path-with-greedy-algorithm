import React, { Fragment, useState, useEffect } from 'react'
import LeftMenu from './views/left-menu'
import SanggarTable from './views/table'
import ModalAddSanggar from './views/modal-add-sanggar'
import ModalConfirmation from './views/modal-confirmation'
import { Header, Button,  } from 'components'
import { API_URL } from '../../constants'

const AdminPage = () => {
    const [sanggarList, setSanggarList] = useState([])
    const [modalType, setModalType] = useState('ADD')
    const [sanggarDetail, setSanggarDetail] = useState({})
    const [showModalAddSanggar, setShowModalAddSanggar] = useState({
        isShow: '',
        sanggarId: ''
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

    const handleChangeModalType = (type) => {
        setModalType(type)
    }

    const handleDeleteSanggar = () => {
        fetch(`${API_URL}/${showModalAddSanggar.sanggarId}`, {
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
        fetch(`${API_URL}/${sanggarId}`, {
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

    const handleSubmit = (type) => {
        switch (type) {
            case 'SAVE':
                handleAddSanggar()
                break
            case 'UPDATE':
                handleUpdateSanggar(showModalAddSanggar.sanggarId)
                break
            case 'DELETE':
                handleModalConfirmation('DELETE')
                break
            default:
                break
        }
    }

    const handleModalConfirmation = (type) => {
        setShowModalConfirmation(prevVal => ({
            ...prevVal,
            isShow: !prevVal.isShow,
            type
        }))
    }

    const handleAddSanggar = () => {
        fetch(API_URL, {
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

    const fetchSanggar = () => {
        fetch(API_URL, { method: 'GET' })
            .then((res) => res.json())
            .then((resp) => {
                setSanggarList(resp)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchSanggar()
    }, [])

    useEffect(() => {
        if (modalType === 'EDIT') {
            fetch(`${API_URL}/${showModalAddSanggar.sanggarId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((resp) => {
                    setSanggarDetail(resp)
                })
                .catch((err) => console.log(err))
        }
    }, [modalType])

    return (
        <Fragment>
            <Header
                title='Welcome, Admin!'
                buttonTitle='Logout'
                onClickButton={() => {handleModalConfirmation('LOGOUT')}}
            />
            <LeftMenu />
            <div className='content-container-body'>
                <div className='level' style={{ marginTop: '3.5rem' }}>
                    <div className='level-left has-text-weight-medium is-size-4'>
                        List Sanggar
                    </div>
                    <div className='level-right'>
                        <Button
                            onClick={() => {
                                handleModalAddSanggar()
                                handleChangeModalType('ADD')
                            }}
                        >
                            Add Sanggar
                        </Button>
                    </div>
                </div>
                <SanggarTable
                    handleChangeModalType={handleChangeModalType}
                    handleModalAddSanggar={handleModalAddSanggar}
                    sanggarList={sanggarList}
                />
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

            <ModalConfirmation
                handleDeleteSanggar={handleDeleteSanggar}
                handleModalConfirmation={handleModalConfirmation}
                modalAttr={showModalConfirmation}
            />
        </Fragment>
    )
}

export default AdminPage
