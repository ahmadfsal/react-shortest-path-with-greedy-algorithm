import React from 'react'
import { Table } from 'components'

const SanggarTable = (props) => {
    const { 
        handleChangeModalType,
        handleModalAddEditStartingPoint,
        startingPointList
    } = props

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Verteks</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Address</th>
                    <th>Short Description</th>
                </tr>
            </thead>
            <tbody>
                {startingPointList.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <a
                                    href='#'
                                    className='has-text-info'
                                    onClick={() => {
                                        handleModalAddEditStartingPoint(item.id)
                                        handleChangeModalType('EDIT_STARTING_POINT')
                                    }}
                                >
                                    {item.name}
                                </a>
                            </td>
                            <td>{item.verteks}</td>
                            <td>{item.lat}</td>
                            <td>{item.lng}</td>
                            <td>{item.address}</td>
                            <td>{item.short_description}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default SanggarTable
