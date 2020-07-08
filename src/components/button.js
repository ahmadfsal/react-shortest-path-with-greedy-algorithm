import React, { memo } from 'react'
import classnames from 'classnames'

const Button = props => {
    const { children, onClick, className } = props

    const classes = classnames('button is-success is-fullwidth', className)

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
}

export default memo(Button)