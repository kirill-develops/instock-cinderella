import React from 'react';
import './NewWarehouseDetails.scss';
import { Link } from 'react-router-dom';
import errorIcon from '../../assets/icons/error-24px.svg';

const NewWarehouseDetails = ({
  submitHandler,
  handleChange,
  clicked,
  validation,
}) => {
  const fieldValidity = validation || {};

  return (
    <div className='new-warehouse'>
      <div className='new-warehouse__border-top'></div>
      <form
        className='new-warehouse__form'
        onSubmit={submitHandler}>
        <div className='new-warehouse__housing'>
          <div className='new-warehouse__top-form'>
            <h2 className='new-warehouse__form-title'>Warehouse Details</h2>
            <label
              className='new-warehouse__label'
              htmlFor="warehouseName">
              Warehouse Name
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.name ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="Warehouse Name"
              name="name"
            />
            {clicked && !fieldValidity.name ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              This field is required
            </div> : null}
            <label
              className='new-warehouse__label'
              htmlFor="address">
              Street Address
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.address ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="Street Address"
              name="address"
            />
            {clicked && !fieldValidity.address ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              This field is required</div> : null}
            <label
              className='new-warehouse__label'
              htmlFor="city">
              City
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.city ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="City"
              name="city"
            />
            {clicked && !fieldValidity.city ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              This field is required</div> : null}
            <label
              className='new-warehouse__label'
              htmlFor="country">
              Country
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.country ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="Country"
              name="country"
            />
            {clicked && !fieldValidity.country ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              This field is required</div> : null}
          </div>
          <div className='new-warehouse__border-bottom'></div>
          <div className='new-warehouse__bottom-form'>
            <h2 className='new-warehouse__form-title'>Contact Details</h2>
            <label
              className='new-warehouse__label'
              htmlFor="contactName">
              Contact Name
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.contactName ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="Contact Name"
              name="contactName"
            />
            {clicked && !fieldValidity.contactName ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              This field is required</div> : null}
            <label
              className='new-warehouse__label'
              htmlFor="position">
              Position
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.position ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="Position"
              name="position"
            />
            {clicked && !fieldValidity.position ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              This field is required</div> : null}
            <label
              className='new-warehouse__label'
              htmlFor="phone">
              Phone Number
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.phone ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="Phone Number"
              name="phone"
              type='tel'
            />
            {clicked && !fieldValidity.phone ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              Please enter a valid phone number</div> : null}
            <label
              className='new-warehouse__label'
              htmlFor="email">
              Email
            </label>
            <input
              className={`new-warehouse__input-field ${clicked && !fieldValidity.email ? "new-warehouse__input-field--error" : ""}`}
              onChange={handleChange}
              placeholder="Email"
              name="email"
            />
            {clicked && !fieldValidity.email ? <div className='new-warehouse__error'>
              <img
                className='new-warehouse__img'
                src={errorIcon}
                alt="Error icon"
              />
              Please enter a valid email address</div> : null}
          </div>
        </div>
        <div className='new-warehouse__buttons'>
          <Link to='/warehouses' className='new-warehouse__cancel-button'>Cancel</Link>
          <button className='new-warehouse__add-button' type='submit'> + Add Warehouse</button>
        </div>
      </form>
    </div>
  )
}

export default NewWarehouseDetails
