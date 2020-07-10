import React, { memo, Fragment, useEffect } from 'react'
import classnames from 'classnames'

const Modal = (props) => {
    const { isShow = false, children, onClose } = props

    const modalClass = classnames('modal', isShow && 'is-active')

    useEffect(() => {
        if (isShow) {
            document.getElementsByTagName('html')[0].classList.add('is-clipped')
        } else {
            document
                .getElementsByTagName('html')[0]
                .classList.remove('is-clipped')
        }
    }, [isShow])

    return (
        <Fragment>
            <div className={modalClass} style={{ zIndex: 1000 }}>
                <div className='modal-background'></div>
                <div className='modal-content'>{children}</div>
                <button className='modal-close is-large' aria-label='close' onClick={onClose} />
            </div>
        </Fragment>
    )
}

export default memo(Modal)
