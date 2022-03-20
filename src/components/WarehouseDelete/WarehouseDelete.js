import React from 'react';
import './WarehouseDelete.scss'

const WarehouseDelete = ({ toDeleteName, handleConfirm }) => {
  return (
    <div className='warehouse-delete'>
      <h2 className='warehouse-delete__header'>
        {`Delete ${toDeleteName} warehouse?`}
      </h2>
      <p className='warehouse-delete__body'>{`Please confirm that you’d like to delete the ${toDeleteName} from the list of warehouses. You won’t be able to undo this action.`}</p>
      <div className='warehouse-delete__buttons-block'>
        <div className='warehouse-delete__button-housing'>
          <button className='warehouse-delete__button--cancel'>Cancel</button>
        </div>
        <div className='warehouse-delete__button-housing'>
          <button className='warehouse-delete__button--delete'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default WarehouseDelete;