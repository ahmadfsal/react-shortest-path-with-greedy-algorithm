import React from 'react'
import { Modal, Column, Columns, Input, Button } from 'components'

const ModalAddSanggar = (props) => {
    const {
        handleModalAddSanggar,
        handleSubmit,
        formData,
        handleChangeInput,
        modalAttr,
        modalType,
        sanggarDetail,
        handleChangeUpdate
    } = props

    const isEdit = modalType === 'EDIT'

    return (
        <Modal isShow={modalAttr.isShow} onClose={handleModalAddSanggar}>
            <form
                onSubmit={handleSubmit}
                className='is-margin-horizontal is-margin-vertical'
            >
                <div className='has-text-weight-medium is-size-5'>
                    {modalType === 'ADD' ? 'Add sanggar' : 'Edit sanggar'}
                </div>
                <Columns className='is-margin-top-smaller'>
                    <Column>
                        <Input
                            label='Name'
                            name='name'
                            value={isEdit ? sanggarDetail.name : formData.name}
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdate(e)
                                    : handleChangeInput(e)
                            }}
                        />
                    </Column>
                </Columns>
                <Columns>
                    <Column>
                        <Input
                            label='Latitude'
                            name='lat'
                            value={isEdit ? sanggarDetail.lat : formData.lat}
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdate(e)
                                    : handleChangeInput(e)
                            }}
                        />
                    </Column>
                    <Column>
                        <Input
                            label='Longitude'
                            name='lng'
                            value={isEdit ? sanggarDetail.lng : formData.lng}
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdate(e)
                                    : handleChangeInput(e)
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
                                    ? sanggarDetail.verteks
                                    : formData.verteks
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdate(e)
                                    : handleChangeInput(e)
                            }}
                        />
                    </Column>
                    <Column>
                        <Input
                            label='Distance'
                            name='distance'
                            value={
                                isEdit
                                    ? sanggarDetail.distance
                                    : formData.distance
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdate(e)
                                    : handleChangeInput(e)
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
                                    ? sanggarDetail.address
                                    : formData.address
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdate(e)
                                    : handleChangeInput(e)
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
                                    ? sanggarDetail.short_description
                                    : formData.short_description
                            }
                            onChange={(e) => {
                                isEdit
                                    ? handleChangeUpdate(e)
                                    : handleChangeInput(e)
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
                                    handleSubmit('DELETE')
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
                                    handleSubmit('UPDATE')
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
                                    handleSubmit('SAVE')
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

export default ModalAddSanggar
