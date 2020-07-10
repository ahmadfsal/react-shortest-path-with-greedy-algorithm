import React, { memo } from 'react'

const Header = props => {
    const { onClickButton, buttonTitle, title } = props
    
    return (
        <nav className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-start'>
                <p className='navbar-item has-text-weight-medium has-text-white is-size-5'>
                    {title}
                </p>
            </div>
            <div className='navbar-end'>
                <div className='navbar-item'>
                    <div className='buttons'>
                        <button
                            className='button is-light'
                            onClick={onClickButton}
                        >
                            {buttonTitle}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default memo(Header)