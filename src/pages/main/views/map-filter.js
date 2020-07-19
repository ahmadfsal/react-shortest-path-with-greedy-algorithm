import React, { Fragment } from 'react'
import { Button, Select, Column, Columns, SideNavigation } from 'components'
import { START_FROM, TO_DESTINATION } from '../../../constants'

const MapFilter = (props) => {
    const {
        handleChangeInput,
        handleResetForm,
        handleSubmit,
        objSanggarList,
        objStartFrom,
        path,
        startFrom,
        toDestination,
        totalJarak
    } = props

    return (
        <SideNavigation>
            <form onSubmit={handleSubmit}>
                <Select
                    name='start_from'
                    label='Starting Point'
                    placeholder='Starting Point'
                    objectValue={objStartFrom}
                    value={startFrom}
                    onChange={(e) => {
                        handleChangeInput(START_FROM, e.target.value)
                    }}
                />
                <Select
                    name='to_destination'
                    label='Destination'
                    placeholder='Destination'
                    objectValue={objSanggarList}
                    value={toDestination}
                    onChange={(e) => {
                        handleChangeInput(TO_DESTINATION, e.target.value)
                    }}
                />
                <div className='columns is-margin-top-smaller'>
                    <div className='column'>
                        <Button
                            type='reset'
                            className='is-danger is-light'
                            onClick={handleResetForm}
                        >
                            Reset
                        </Button>
                    </div>
                    <div className='column'>
                        <Button type='submit'>Search</Button>
                    </div>
                </div>
            </form>
            {path && totalJarak ? (
                <Fragment>
                    <Columns>
                        <Column>
                            <div className='has-text-weight-medium'>
                                Path: <br />
                                <b>{path}</b>
                            </div>
                        </Column>
                    </Columns>
                    <Columns>
                        <Column>
                            <div className='has-text-weight-medium'>
                                Total Distance: <b>{parseInt(totalJarak).toFixed(1)}KM</b>
                            </div>
                        </Column>
                    </Columns>
                </Fragment>
            ) : (
                <div className='has-text-weight-medium is-margin-top'>
                    No data to be displayed.
                </div>
            )}
        </SideNavigation>
    )
}

export default MapFilter
