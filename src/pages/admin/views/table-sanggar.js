import React from 'react'
import { Table } from 'components'

const SanggarTable = (props) => {
    const { handleChangeModalType, handleModalAddSanggar, sanggarList } = props

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
                {sanggarList.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <a
                                    href="#"
                                    className='has-text-info'
                                    onClick={() => {
                                        handleModalAddSanggar(item.id)
                                        handleChangeModalType('EDIT')
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
