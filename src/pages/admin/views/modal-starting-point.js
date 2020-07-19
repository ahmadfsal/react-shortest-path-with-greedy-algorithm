import React from 'react'
import { Modal, Column, Columns, Input, Button } from 'components'

const ModalStartingPoint = (props) => {
    const {
        formStartingPoint,
        handleChangeStartingPoint,
        handleChangeUpdateStartingPoint,
        handleModalAddEditStartingPoint,
        handleSubmit,
        modalAttr,
        modalType,
        startingPointDetail,
    } = props

    const isEdit = modalType === 'EDIT_STARTING_POINT'

    return (
        <Modal isShow={modalAttr.isShow} onClose={handleModalAddEditStartingPoint}>
            <form
                onSubmit={handleSubmit}
                className='is-margin-horizontal is-margin-vertical'
            >
                <div className='has-text-weight-medium is-size-5'>
                    {modalType === 'ADD_STARTING_POINT' ? 'Add Starting Point' : 'Edit Starting Point'}
                </div>
                <Columns className='is-margin-top-smaller'>
                    <Column>
                        <Input
                            label='Name'
                            name='name'
                            value={isEdit ? startingPointDetail.name : formStartingPoint.name}
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdateStartingPoint(e)
                                    : handleChangeStartingPoint(e)
                            }}
                        />
                    </Column>
                </Columns>
                <Columns>
                    <Column>
                        <Input
                            label='Latitude'
                            name='lat'
                            value={isEdit ? startingPointDetail.lat : formStartingPoint.lat}
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdateStartingPoint(e)
                                    : handleChangeStartingPoint(e)
                            }}
                        />
                    </Column>
                    <Column>
                        <Input
                            label='Longitude'
                            name='lng'
                            value={isEdit ? startingPointDetail.lng : formStartingPoint.lng}
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdateStartingPoint(e)
                                    : handleChangeStartingPoint(e)
                            }}
                        />
                    </Column>
                </Columns>
                <Columns>
                    <Column>
                        <Input
                            label='Verteks'
                            name='verteks'
                            value={
                                isEdit
                                    ? startingPointDetail.verteks
                                    : formStartingPoint.verteks
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdateStartingPoint(e)
                                    : handleChangeStartingPoint(e)
                            }}
                        />
                    </Column>
                    <Column>
                        <Input
                            label='Distance'
                            name='distance'
                            value={
                                isEdit
                                    ? startingPointDetail.distance
                                    : formStartingPoint.distance
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdateStartingPoint(e)
                                    : handleChangeStartingPoint(e)
                            }}
                        />
                    </Column>
                </Columns>
                <Columns>
                    <Column>
                        <Input
                            label='Address'
                            name='address'
                            value={
                                isEdit
                                    ? startingPointDetail.address
                                    : formStartingPoint.address
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdateStartingPoint(e)
                                    : handleChangeStartingPoint(e)
                            }}
                        />
                    </Column>
                </Columns>
                <Columns>
                    <Column>
                        <Input
                            label='Short Description'
                            name='short_description'
                            value={
                                isEdit
                                    ? startingPointDetail.short_description
                                    : formStartingPoint.short_description
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdateStartingPoint(e)
                                    : handleChangeStartingPoint(e)
                            }}
                        />
                    </Column>
                </Columns>
                <Columns>
                    {isEdit && (
                        <Column>
                            <Button
                                className='is-danger is-light'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleSubmit('DELETE_STARTING_POINT')
                                }}
                            >
                                Delete
                            </Button>
                        </Column>
                    )}
                    {isEdit ? (
                        <Column>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleSubmit('UPDATE_STARTING_POINT')
                                }}
                            >
                                Update
                            </Button>
                        </Column>
                    ) : (
                        <Column>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleSubmit('SAVE_STARTING_POINT')
                                }}
                            >
                                Save
                            </Button>
                        </Column>
                    )}
                </Columns>
            </form>
        </Modal>
    )
}

export default ModalStartingPoint
