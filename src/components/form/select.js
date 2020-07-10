import React, { memo } from 'react'

const Select = (props) => {
    const {
        label,
        className,
        name,
        placeholder,
        objectValue,
        defaultValue,
        value,
        ...rest
    } = props

    return (
        <div className='field'>
            {label && <label className='label has-text-weight-medium'>{label}</label>}
            <div className='control'>
                <div className='select'>
                    <select name={name} value={value ? value : ''} {...rest}>
                        {placeholder && (
                            <option value='' disabled defaultValue>
                                {placeholder}
                            </option>
                        )}

                        {objectValue.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.text}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default memo(Select)
