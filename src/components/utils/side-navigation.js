import React, { memo, Fragment } from 'react'
import { Button, Select, Column, Columns } from '..'
import { START_FROM, TO_DESTINATION, sanggarList } from '../../constants/index'

const SideNavigation = (props) => {
    const {
        handleResetForm,
        startFrom,
        toDestination,
        handleSubmit,
        handleChangeInput,
        path,
        totalJarak,
        bobot
    } = props

    return (
        <div className='side-nav'>
            <p className='has-text-weight-medium is-size-5 is-margin-bottom-smaller'>
                Greedy Algorithm
            </p>
            <form onSubmit={handleSubmit}>
                <Select
                    name='start_from'
                    label='Pilih titik awal'
                    placeholder='Pilih titik awal'
                    objectValue={sanggarList}
                    value={startFrom}
                    onChange={(e) =>
                        handleChangeInput(START_FROM, e.target.value)
                    }
                />
                <Select
                    name='to_destination'
                    label='Pilih Tujuan'
                    placeholder='Pilih Tujuan'
                    objectValue={sanggarList}
                    value={toDestination}
                    onChange={(e) =>
                        handleChangeInput(TO_DESTINATION, e.target.value)
                    }
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
                        <Button type='submit'>Cari</Button>
                    </div>
                </div>
            </form>
            {path && totalJarak ? (
                <Fragment>
                    <Columns>
                        <Column>
                            <div className='has-text-weight-medium'>
                                Path: <br/>{path}
                            </div>
                        </Column>
                    </Columns>
                    <Columns>
                        <Column>
                            <div className='has-text-weight-medium'>
                                Jarak: <br/>{bobot}
                            </div>
                        </Column>
                    </Columns>
                    <Columns>
                        <Column>
                            <div className='has-text-weight-medium'>
                                Total Jarak: {totalJarak}km
                            </div>
                        </Column>
                    </Columns>
                </Fragment>
            ) : (
                <div className='has-text-weight-medium is-margin-top'>
                    Tidak ada data.
                </div>
            )}
        </div>
    )
}

export default memo(SideNavigation)
