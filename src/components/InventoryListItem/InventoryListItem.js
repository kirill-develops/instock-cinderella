import React from 'react';
import { Link } from 'react-router-dom';

import DeleteIco from '../../assets/icons/delete_outline-24px.svg';
import EditIco from '../../assets/icons/edit-24px.svg';
import './InventoryListItem.scss';


const InventoryList = ({ itemObj, handleDelete }) => {

  const { category, itemName, id, quantity, status, warehouseName } = itemObj;

  return (

    <div className='list-item'>
      <div className='list-item__inner'>
        <div className='list-item__block'>
          <label className='list-item__label--main'>
            INVENTORY ITEM
            < Link to={`/inventory/${id}`} className='list-item__info--main-link'>
              <h3 className='list-item__info--main'>{itemName} &gt;</h3>
            </ Link>
          </label>
          <label className='list-item__label--status'>
            STATUS
            <h3 className={`list-item__info 
            ${status.toLowerCase() === "out of stock" ? "list-item__info--out-stock" : "list-item__info--in-stock"}`}
            >{status}</h3>
          </label>
          <label className='list-item__label--category'>
            CATEGORY
            <h3 className='list-item__info'>{category}</h3>
          </label>
          <label className='list-item__label--qty'>
            QTY
            <h3 className='list-item__info'>{quantity}</h3>
          </label>
          <label className='list-item__label--warehouse'>
            WAREHOUSE
            <h3 className='list-item__info'>{warehouseName}</h3>
          </label>
          <div className='list-item__actions-block'>
            <img onClick={() => handleDelete(id, itemName)} src={DeleteIco} alt="delete icon" className='list-item__icon--delete' />
            < Link to={`/inventory/${id}/edit`} className="list-item__link">
              <img src={EditIco} alt="edit icon" className='list-item__icon--edit' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default InventoryList;