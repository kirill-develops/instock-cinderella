import React from 'react'
import './NewWarehouseDetails.scss'

function NewWarehouseDetails() {
    return (
        <>
                <div className='new-warehouse__border'></div>
                <h2>Warehouse Details</h2>
            <form className='new-warehouse__form'>
                <label
                    className='new-warehouse__label'
                    htmlFor="name">
                    Warehouse Name
                </label>
                <input
                    className="new-warehouse__input-field"
                    placeholder="Warehouse Name"
                    name="name"
                />
                <label
                    className='new-warehouse__label'
                    htmlFor="address">
                    Street Address
                </label>
                <input
                    className="new-warehouse__input-field"
                    placeholder="Street Address"
                    name="adress"
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
                <div className='new-warehouse__border'></div>
                <h2>Contact Details</h2>
                <label
                    className='new-warehouse__label'
                    htmlFor="contact-name">
                    Contact Name
                </label>
                <input
                    className="new-warehouse__input-field"
                    placeholder="Contact Name"
                    name="contact-name"
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
                    htmlFor="phone-number">
                    Phone Number
                </label>
                <input
                    className="new-warehouse__input-field"
                    placeholder="Phone Number"
                    name="phone-number"
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
                />
                <div className='new-warehouse__buttons'>
                    <button className='new-warehouse__cancel-button'>Cancel</button>
                    <button className='new-warehouse__add-button'>Add Warehouse</button>
                </div>
            </form>
        </>
    )
}

export default NewWarehouseDetails