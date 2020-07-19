import React from 'react'
import classnames from 'classnames'
import { SideNavigation } from 'components'

const LeftMenu = (props) => {
    const { handleMenuActive, menuActive } = props
    const sanggarClass = classnames(menuActive.isSanggar && 'is-active')
    const startingPointClass = classnames(
        menuActive.isStartingPoint && 'is-active'
    )
    const masterClass = classnames(
        'has-text-weight-bold',
        !menuActive.isSanggar && !menuActive.isStartingPoint && 'is-active'
    )

    return (
        <SideNavigation className='side-nav'>
            <aside className='menu'>
                <ul className='menu-list'>
                    <li>
                        <a
                            className={masterClass}
                            onClick={() => handleMenuActive('IS_MASTER')}
                        >
                            Master
                        </a>
                        <ul>
                            <li>
                                <a
                                    className={sanggarClass}
                                    onClick={() =>
                                        handleMenuActive('IS_SANGGAR')
                                    }
                                >
                                    Sanggar
                                </a>
                            </li>
                            <li>
                                <a
                                    className={startingPointClass}
                                    onClick={() =>
                                        handleMenuActive('IS_STARTING_POINT')
                                    }
                                >
                                    Starting Point
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>
        </SideNavigation>
    )
}

export default LeftMenu
