import React, { memo } from 'react'
import classnames from 'classnames'

const Columns = ({ children, className }) => {
    const classes = classnames('columns', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default memo(Columns)