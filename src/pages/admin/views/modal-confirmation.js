import React from 'react'
import { Modal, Button } from 'components'
import { useHistory } from 'react-router-dom'

const ModalConfirmation = (props) => {
    const {
        handleDeleteSanggar,
        handleDeleteStartingPoint,
        handleModalConfirmation,
        modalAttr
    } = props
    const { isShow, type } = modalAttr
    const history = useHistory()

    const handleConfirmation = () => {
        if (type === 'DELETE') {
            handleDeleteSanggar()
        } else if (type === 'LOGOUT') {
            localStorage.setItem('isLogin', false)
            history.replace('/')
        } else if (type === 'DELETE_STARTING_POINT') {
            handleDeleteStartingPoint()
        }
    }

    return (
        <Modal isShow={isShow} onClose={handleModalConfirmation}>
            <div className='has-text-weight-medium is-size-4'>Confirmation</div>

            {type === 'DELETE' && (
                <p className='is-margin-top-smaller'>
                    Are you sure want to delete this sanggar?
                </p>
            )}

            {type === 'DELETE_STARTING_POINT' && (
                <p className='is-margin-top-smaller'>
                    Are you sure want to delete this starting point?
                </p>
            )}

            {type === 'LOGOUT' && (
                <p className='is-margin-top is-margin-top-smaller'>
                    Are you sure want to logout?
                </p>
            )}

            <div className='buttons is-right is-margin-top'>
                <Button
                    className='is-danger is-light'
                    onClick={handleModalConfirmation}
                >
                    No
                </Button>
                <Button onClick={handleConfirmation}>Yes</Button>
            </div>
        </Modal>
    )
}

export default ModalConfirmation
