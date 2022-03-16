import React from 'react';
import './NewWarehouseDetails.scss';
// import { Link } from 'react-router-dom';

function NewWarehouseDetails({ clickHandler }) {
    return (
        <div className='new-warehouse'>
            <div className='new-warehouse__border-top'></div>
            <form
                className='new-warehouse__form'
                onSubmit={clickHandler}>
                <div className='new-warehouse__form-fields'>
                    <h2 className='new-warehouse__form-title'>Warehouse Details</h2>
                    <label
                        className='new-warehouse__label'
                        htmlFor="warehouseName">
                        Warehouse Name
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="Warehouse Name"
                        name="warehouseName"
                    />
                    <label
                        className='new-warehouse__label'
                        htmlFor="address">
                        Street Address
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="Street Address"
                        name="address"
                    />
                    <label
                        className='new-warehouse__label'
                        htmlFor="city">
                        City
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="City"
                        name="city"
                    />
                    <label
                        className='new-warehouse__label'
                        htmlFor="country">
                        Country
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="Country"
                        name="country"
                    />
                </div>
                <div className='new-warehouse__border-bottom'></div>
                <div className='new-warehouse__form-fields'>
                    <h2 className='new-warehouse__form-title'>Contact Details</h2>
                    <label
                        className='new-warehouse__label'
                        htmlFor="contactName">
                        Contact Name
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="Contact Name"
                        name="contactName"
                    />
                    <label
                        className='new-warehouse__label'
                        htmlFor="position">
                        Position
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="Position"
                        name="position"
                    />
                    <label
                        className='new-warehouse__label'
                        htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="Phone Number"
                        name="phone"
                        type='number'
                    />
                    <label
                        className='new-warehouse__label'
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        className="new-warehouse__input-field"
                        placeholder="Email"
                        name="email"
                        type='email'
                    />
                </div>
                <div className='new-warehouse__buttons'>
                    {/* <Link to='/warehouses'> */}
                        <button className='new-warehouse__cancel-button'>Cancel</button>
                    {/* </Link> */}
                    <button className='new-warehouse__add-button' type='submit'>Add Warehouse</button>
                </div>
            </form>
        </div>
    )
}

export default NewWarehouseDetails