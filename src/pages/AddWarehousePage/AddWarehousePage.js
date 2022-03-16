import React from 'react';
// import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import NewWarehouseDetails from '../../components/NewWarehouseDetails/NewWarehouseDetails'
import axios from 'axios';


const AddWarehousePage = () => {

    // add event handler and post request

  return (
      <>
          {/* <Header /> */}
          <div className='add-warehouse__top'>
    <img
        className='add-warehouse__icon'
        src={backArrow}
        alt="back arrow icon"
    />
    <h1 className='add-warehouse__title'>Add New Warehouse</h1>
              <NewWarehouseDetails />
              </div>
</>
  )
}

export default AddWarehousePage