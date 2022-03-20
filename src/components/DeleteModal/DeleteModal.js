import React from 'react';

import closeIco from '../../assets/icons/close-24px.svg'
import './DeleteModal.scss'

const DeleteModal = ({ toDeleteId, toDeleteName, toDeleteType, closingStatement, handleCancel, handleConfirm }) => {
  return (
    <div className='delete-modal'>
      <h2 className='delete-modal__header'>
        {`Delete ${toDeleteName} ${toDeleteType}?`}
      </h2>
      <p className='delete-modal__body'>
        {`Please confirm that you’d like to delete the ${toDeleteName} ${closingStatement}. You won’t be able to undo this action.`}
      </p>
      <div className='delete-modal__buttons-block'>
        <div className='delete-modal__button-housing'>
          <button
            onClick={handleCancel}
            className='delete-modal__button--cancel'>Cancel</button>
        </div>
        <div className='delete-modal__button-housing'>
          <button
            onClick={() => handleConfirm(toDeleteId)}
            className='delete-modal__button--delete'>Delete</button>
        </div>
      </div>
      <img onClick={handleCancel}
        src={closeIco}
        alt='close icon'
        className='delete-modal__icon'
      />
    </div>
  )
}

export default DeleteModal;