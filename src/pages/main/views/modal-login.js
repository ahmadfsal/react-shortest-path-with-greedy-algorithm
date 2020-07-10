import React, { memo } from 'react'
import { Modal, Input, Button, Column, Columns } from '../../../components'
import { USERNAME, PASSWORD } from '../../../constants/general'

const ModalLogin = (props) => {
    const {
        errorMessage,
        handleChangeInput,
        handleModalLogin,
        handleSubmitLogin,
        isShow,
        username,
        password
    } = props

    return (
        <Modal isShow={isShow} onClose={handleModalLogin}>
            <form
                onSubmit={handleSubmitLogin}
                className='is-margin-horizontal is-margin-vertical'
            >
                <div className='has-text-weight-medium is-size-5'>
                    Admin Login
                </div>
                <Columns className='is-margin-top-smaller'>
                    <Column>
                        <Input
                            label='Username'
                            name='username'
                            value={username}
                            onChange={(e) => {
                                handleChangeInput(USERNAME, e.target.value)
                            }}
                        />
                    </Column>
                    <Column>
                        <Input
                            type="password"
                            label='Password'
                            name='password'
                            value={password}
                            onChange={(e) => {
                                handleChangeInput(PASSWORD, e.target.value)
                            }}
                        />
                    </Column>
                </Columns>
                <Columns>
                    <Column>
                        <Button>Login</Button>
                    </Column>
                </Columns>
            </form>
            {errorMessage && (
                <p className='is-danger is-size-6 is-margin-horizontal'>
                    {errorMessage}
                </p>
            )}
        </Modal>
    )
}

export default memo(ModalLogin)
