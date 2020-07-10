import React, { memo } from 'react'
import classnames from 'classnames'

const Column = ({ children, className }) => {
    const classes = classnames('column', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default memo(Column)