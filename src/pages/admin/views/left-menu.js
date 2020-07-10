import React from 'react'
import { SideNavigation } from 'components'

const LeftMenu = (props) => {
    return (
        <SideNavigation className='side-nav-bordered-right'>
            <aside className='menu'>
                <ul className='menu-list'>
                    <li>
                        <a href='#' className='has-text-weight-bold'>Master</a>
                        <ul>
                            <li>
                                <a href='#' className='is-active'>
                                    Sanggar
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
