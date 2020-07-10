import React, { memo } from 'react'
import classnames from 'classnames'

const Table = (props) => {
    const { children, className } = props
    const classes = classnames(
        'table is-bordered is-striped is-narrow is-hoverable is-fullwidth',
        className
    )
    return <table className={classes}>{children}</table>
}

export default memo(Table)
