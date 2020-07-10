import React, { memo } from 'react'
import classnames from 'classnames'

const SideNavigation = (props) => {
    const { children, className } = props
    const classes = classnames('side-nav', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default memo(SideNavigation)
