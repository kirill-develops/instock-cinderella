import React from 'react';
import { Link } from 'react-router-dom';

import DeleteIco from '../../assets/icons/delete_outline-24px.svg';
import EditIco from '../../assets/icons/edit-24px.svg';
import './WarehouseItem.scss';

const Item = ({ itemObj, handleDelete }) => {

  const { category, itemName, id, quantity, status } = itemObj;

  return (
    <div className='warehouse-item'>
      <div className='warehouse-item__inner'>
        <div className='warehouse-item__block'>
          <label className='warehouse-item__label warehouse-item__label--main'>
            <span className='warehouse-item__label--txt'>
              INVENTORY ITEM
            </span>
            < Link to={`/inventory/${id}`} className='warehouse-item__info--main-link'>
              <h3 className='warehouse-item__info--main'>{itemName} &gt;</h3>
            </ Link>
          </label>
          <label className='warehouse-item__label warehouse-item__label--status'>
            <span className='warehouse-item__label--txt'>
              STATUS
            </span>
            <h3 className={`item__info 
            ${status.toLowerCase() === "out of stock" ? "warehouse-item__info--out-stock" : "warehouse-item__info--in-stock"}`}
            >{status.toUpperCase()}</h3>
          </label>
          <label className='warehouse-item__label warehouse-item__label--category'>
            <span className='warehouse-item__label--txt'>
              CATEGORY
            </span>
            <h3 className='warehouse-item__info'>{category}</h3>
          </label>
          <label className='warehouse-item__label warehouse-item__label--qty'>
            <span className='warehouse-item__label--txt'>
              QTY
            </span>
            <h3 className='warehouse-item__info'>{quantity}</h3>
          </label>
          <div className='warehouse-item__actions-block'>
            <img onClick={() => handleDelete(id, itemName)} src={DeleteIco} alt="delete icon" className='warehouse-item__icon--delete' />
            < Link to={`/inventory/${id}/edit`} className="warehouse-item__link">
              <img src={EditIco} alt="edit icon" className='warehouse-item__icon--edit' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item;