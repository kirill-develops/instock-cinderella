import React from 'react';
import { Link } from 'react-router-dom';

import DeleteIco from '../../assets/icons/delete_outline-24px.svg';
import EditIco from '../../assets/icons/edit-24px.svg';
import './Warehouse.scss';

const Warehouse = ({ warehouseObj, handleDelete }) => {

  const { address, city, country, name: warehouseName, contact, id } = warehouseObj;

  return (
    <div className='warehouse'>
      <div className='warehouse__block'>
        <label className='warehouse__label'>
          WAREHOUSE
          < Link to={`/warehouses/${id}`} className='warehouse__info--main-link'>
            <h3 className='warehouse__info--main'>{warehouseName} &gt;</h3>
          </ Link>
        </label>
        <label className='warehouse__label'>
          CONTACT NAME
          <h3 className='warehouse__info'>{contact.name}</h3>
        </label>
        <label className='warehouse__label'>
          ADDRESS
          <h3 className='warehouse__info'>{address}, {city}, {country}</h3>
        </label>
        <label className='warehouse__label'>
          CONTACT INFORMATION
          <h3 className='warehouse__info'>{contact.phone}</h3>
          <h3 className='warehouse__info'>{contact.email}</h3>
        </label>
        <div className='warehouse__actions-block'>
          <img onClick={handleDelete} src={DeleteIco} alt="delete icon" className='warehouse__icon' />
          < Link to="/warehouses/:id/edit">
            <img src={EditIco} alt="edit icon" className='warehouse__icon--edit' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Warehouse