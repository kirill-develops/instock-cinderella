import React, { Component } from 'react';
import './NewWarehouseDetails.scss';
// import { Link } from 'react-router-dom';

class NewWarehouseDetails extends Component {
    state = {
        errors: {}
    }

    submitForm = (event) => {
        event.preventDefault();

        return this.props.clickHandler(event).then(res => {
            console.log(res.data)
            this.setState({ errors: res.data.result.errors })
        })
    }
    render() {

        return (
            <div className='new-warehouse'>
                <div className='new-warehouse__border-top'></div>
                <form
                    className='new-warehouse__form'
                    onSubmit={this.submitForm}>
                    <div className='new-warehouse__housing'>
                    <div className='new-warehouse__top-form'>
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
                        {this.state.errors?.name ? <div className='new-warehouse__error'>This field is required</div> : null}
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
                        {this.state.errors?.address ? <div className='new-warehouse__error'>This field is required</div> : null}
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
                        {this.state.errors?.city ? <div className='new-warehouse__error'>This field is required</div> : null}
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
                        {this.state.errors?.country ? <div className='new-warehouse__error'>This field is required</div> : null}
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
                            className="new-warehouse__input-field"
                            placeholder="Contact Name"
                            name="contactName"
                        />
                        {this.state.errors?.contactName ? <div className='new-warehouse__error'>This field is required</div> : null}
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
                        {this.state.errors?.position ? <div className='new-warehouse__error'>This field is required</div> : null}
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
                        {this.state.errors?.phone ? <div className='new-warehouse__error'>This field is required</div> : null}
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
                        {this.state.errors?.email ? <div className='new-warehouse__error'>This field is required</div> : null}
                        </div>
                        </div>
                    <div className='new-warehouse__buttons'>
                        {/* <Link to='/warehouses'> */}
                        <button className='new-warehouse__cancel-button'>Cancel</button>
                        {/* </Link> */}
                        <button className='new-warehouse__add-button' type='submit'> + Add Warehouse</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewWarehouseDetails