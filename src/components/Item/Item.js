import React from 'react';
import { Link } from 'react-router-dom';

import DeleteIco from '../../assets/icons/delete_outline-24px.svg';
import EditIco from '../../assets/icons/edit-24px.svg';
import './Item.scss';

const Item = ({ itemObj, handleDelete }) => {

  const { category, itemName, id, quantity, status } = itemObj;

  return (
    <div className='item'>
      <div className='item__inner'>
        <div className='item__block'>
          <label className='item__label item__label--main'>
            <span className='item__label--txt'>
              INVENTORY ITEM
            </span>
            < Link to={`/inventory/${id}`} className='item__info--main-link'>
              <h3 className='item__info--main'>{itemName} &gt;</h3>
            </ Link>
          </label>
          <label className='item__label item__label--status'>
            <span className='item__label--txt'>
              STATUS
            </span>
            <h3 className={`item__info 
            ${status.toLowerCase() === "out of stock" ? "item__info--out-stock" : "item__info--in-stock"}`}
            >{status.toUpperCase()}</h3>
          </label>
          <label className='item__label item__label--category'>
            <span className='item__label--txt'>
              CATEGORY
            </span>
            <h3 className='item__info'>{category}</h3>
          </label>
          <label className='item__label item__label--qty'>
            <span className='item__label--txt'>
              QTY
            </span>
            <h3 className='item__info'>{quantity}</h3>
          </label>
          <div className='item__actions-block'>
            <img onClick={() => handleDelete(id, itemName)} src={DeleteIco} alt="delete icon" className='item__icon--delete' />
            < Link to={`/inventory/${id}/edit`} className="item__link">
              <img src={EditIco} alt="edit icon" className='item__icon--edit' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item;