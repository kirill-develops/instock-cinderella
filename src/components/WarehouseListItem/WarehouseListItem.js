import React from 'react';
import { Link } from 'react-router-dom';

import DeleteIco from '../../assets/icons/delete_outline-24px.svg';
import EditIco from '../../assets/icons/edit-24px.svg';
import './WarehouseListItem.scss';

const WarehouseListItem = ({ warehouseObj, handleDelete }) => {

  const { address, city, country, name: warehouseName, contact, id } = warehouseObj;

  return (
    <div className='warehouse-list-item'>
      <div className='warehouse-list-item__block'>
        <label className='warehouse-list-item__label--main'>
          WAREHOUSE
          < Link to={`/warehouses/${id}`} className='warehouse-list-item__info--main-link'>
            <h3 className='warehouse-list-item__info--main'>{warehouseName} &gt;</h3>
          </ Link>
        </label>
        <label className='warehouse-list-item__label--contact'>
          CONTACT NAME
          <h3 className='warehouse-list-item__info'>{contact.name}</h3>
        </label>
        <label className='warehouse-list-item__label--addy'>
          ADDRESS
          <h3 className='warehouse-list-item__info'>{address}, {city}, {country}</h3>
        </label>
        <label className='warehouse-list-item__label--details'>
          CONTACT INFORMATION
          <h3 className='warehouse-list-item__info'>{contact.phone}</h3>
          <h3 className='warehouse-list-item__info'>{contact.email}</h3>
        </label>
        <div className='warehouse-list-item__actions-block'>
          <img onClick={() => handleDelete(id, warehouseName)} src={DeleteIco} alt="delete icon" className='warehouse-list-item__icon--delete' />
          < Link to={`/warehouses/${id}/edit`} className="warehouse-list-item__link">
            <img src={EditIco} alt="edit icon" className='warehouse-list-item__icon--edit' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WarehouseListItem;