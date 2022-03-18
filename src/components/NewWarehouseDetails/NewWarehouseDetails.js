import React from 'react';
import './NewWarehouseDetails.scss';
import { Link } from 'react-router-dom';
import errorIcon from '../../assets/icons/error-24px.svg';

const NewWarehouseDetails = ({clickHandler, name, address, city, country, contactName, position, phone, email, clicked}) => {

        return (
            <div className='new-warehouse'>
                <div className='new-warehouse__border-top'></div>
                <form
                    className='new-warehouse__form'
                    onSubmit={clickHandler}>
                    <div className='new-warehouse__housing'>
                    <div className='new-warehouse__top-form'>
                        <h2 className='new-warehouse__form-title'>Warehouse Details</h2>
                        <label
                            className='new-warehouse__label'
                            htmlFor="warehouseName">
                            Warehouse Name
                        </label>
                        <input
                                className={`new-warehouse__input-field ${!name && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="Warehouse Name"
                            name="warehouseName"
                        />
                            {!name && clicked ? <div className='new-warehouse__error'>
                                <img
                                    src={errorIcon}
                                    alt="Error icon"
                                />
                                This field is required</div> : null}
                        <label
                            className='new-warehouse__label'
                            htmlFor="address">
                            Street Address
                        </label>
                        <input
                            className={`new-warehouse__input-field ${!address && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="Street Address"
                            name="address"
                        />
                            {!address && clicked ? <div className='new-warehouse__error'>
                            <img
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
                            className={`new-warehouse__input-field ${!city && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="City"
                            name="city"
                        />
                            {!city && clicked ? <div className='new-warehouse__error'>
                            <img
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
                            className={`new-warehouse__input-field ${!country && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="Country"
                            name="country"
                        />
                            {!country && clicked ? <div className='new-warehouse__error'>
                            <img
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
                            className={`new-warehouse__input-field ${!contactName && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="Contact Name"
                            name="contactName"
                        />
                            {!contactName && clicked ? <div className='new-warehouse__error'>
                            <img
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
                            className={`new-warehouse__input-field ${!position && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="Position"
                            name="position"
                        />
                            {!position && clicked ? <div className='new-warehouse__error'>
                            <img
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
                            className={`new-warehouse__input-field ${!phone && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="Phone Number"
                            name="phone"
                            type='number'
                        />
                            {!phone && clicked ? <div className='new-warehouse__error'>
                            <img
                                    src={errorIcon}
                                    alt="Error icon"
                                />
                                This field is required</div> : null}
                        <label
                            className='new-warehouse__label'
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`new-warehouse__input-field ${!email && clicked ?"new-warehouse__input-field--error" : ""}`}
                            placeholder="Email"
                            name="email"
                        />
                            {!email && clicked ? <div className='new-warehouse__error'>
                            <img
                                    src={errorIcon}
                                    alt="Error icon"
                                />
                                This field is required</div> : null}
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