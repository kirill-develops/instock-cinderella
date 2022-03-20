import './AddInventoryItem.scss';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';
import errorIcon from '../../assets/icons/error-24px.svg';

class AddInventoryItem extends Component {
    state = {
        warehouseName: "",
        itemName: "",
        description: "",
        category: "",
        status: "",
        quantity: "",
        clicked: false
    }

    // Create a change handler for all inputs
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    isInStock = () => {
        if (this.state.status === "In Stock") {
            return true;
        }
        return false;
    }

    isAddItemValid = () => {
        if (this.state.warehouseName === "" || this.state.itemName === "" || this.state.description === "" || this.state.category === "" || this.state.status === "") {
            return false;
        }
        return true
    }

    // Submit handler for Axios POST call on form submission
    submitHandler = (event) => {
        event.preventDefault();

        if (this.isAddItemValid()) {
            // this.setState({ clicked: true })
            axios
                .post(`${BASE_URL}/inventory`, {
                    warehouseName: event.target.warehouse.value,
                    itemName: event.target.itemName.value,
                    description: event.target.description.value,
                    category: event.target.category.value,
                    status: event.target.status.value,
                    quantity: event.target.quantity.value,
                })
                .then(response => {
                    console.log(response)
                    this.props.history.push('/inventory');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.setState({ clicked: true })
        }
    }

    render() {
        return (
            <div className='background'>
                <div className='add-inventory'>
                    <div className='add-inventory__top'>
                        <Link to="/inventory">
                            <img
                                className='add-inventory__icon'
                                src={backArrow}
                                alt="back arrow icon"
                            />
                        </Link>
                        <h1 className='add-inventory__title'>Add New Inventory Item</h1>
                    </div>
                    <div className='add-inventory__border-top'></div>
                    <form
                        className='add-inventory__form'
                        onSubmit={this.submitHandler}
                    >
                        <div className='add-inventory__housing'>
                            <div className='add-inventory__top-form'>
                                <h2 className='add-inventory__form-title'>Item Details</h2>
                                <label
                                    className='add-inventory__label'
                                    htmlFor="itemName">
                                    Item Name
                                </label>
                                <input
                                    className={`add-inventory__input-field ${!this.state.itemName && this.state.clicked ? "add-inventory__input-field--error" : ""}`}
                                    onChange={this.handleChange}
                                    placeholder="Item Name"
                                    name="itemName"
                                />
                                {!this.state.itemName && this.state.clicked ? <div className='add-inventory__error'>
                                    <img
                                        src={errorIcon}
                                        alt="Error icon"
                                    />
                                    This field is required</div> : null}
                                <label
                                    className='add-inventory__label'
                                    htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    className={`add-inventory__description-field ${!this.state.description && this.state.clicked ? "add-inventory__description-field--error" : ""}`}
                                    onChange={this.handleChange}
                                    placeholder="Please enter a brief item description..."
                                    name="description"
                                >
                                </textarea>
                                {!this.state.description && this.state.clicked ? <div className='add-inventory__error'>
                                    <img
                                        src={errorIcon}
                                        alt="Error icon"
                                    />
                                    This field is required</div> : null}
                                {/* needs to populate from the inventory json list - category is required */}
                                <label
                                    className='add-inventory__label'
                                    htmlFor="category">
                                    Category
                                </label>
                                <select
                                    className={`add-inventory__dropdown ${!this.state.category && this.state.clicked ? "add-inventory__dropdown--error" : ""}`}
                                    name='category'
                                    onChange={this.handleChange}
                                >
                                    <option value="">Please select</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Gear">Gear</option>
                                    <option value="Apparel">Apparel</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Health">Health</option>
                                </select>
                                {!this.state.category && this.state.clicked ? <div className='add-inventory__error'>
                                    <img
                                        src={errorIcon}
                                        alt="Error icon"
                                    />
                                    This field is required</div> : null}
                            </div>
                            <div className='add-inventory__border-bottom'></div>
                            <div className='add-inventory__bottom-form'>
                                <h2 className='add-inventory__form-title'>Item Availability</h2>

                                <h4
                                    className='add-inventory__label'>
                                    Status
                                </h4>
                                <div className='add-inventory__radio-housing'>
                                    <div className='add-inventory__radio-set'>
                                        <input
                                            className="add-inventory__radio"
                                            type="radio"
                                            name="status"
                                            onClick={this.handleChange}
                                            value="In Stock"
                                        ></input>
                                        <label
                                            className='add-inventory__radio-label'
                                            htmlFor="instock">
                                            In Stock
                                        </label>
                                    </div>
                                    <div className='add-inventory__radio-set'>
                                        <input
                                            className="add-inventory__radio"
                                            type="radio"
                                            name="status"
                                            onClick={this.handleChange}
                                            value="Out of Stock"
                                        ></input>
                                        <label
                                            className='add-inventory__radio-label'
                                            htmlFor="outstock">
                                            Out of Stock
                                        </label>
                                    </div>
                                </div>
                                {!this.state.status && this.state.clicked ? <div className='add-inventory__error'>
                                    <img
                                        src={errorIcon}
                                        alt="Error icon"
                                    />
                                    This field is required</div> : null}
                                {/* The quantity field is dynamic and will not be visible if item is OOS */}
                                {this.isInStock() ? <div>
                                    <label
                                        className='add-inventory__label'
                                        htmlFor="quantity">
                                        Quantity
                                    </label>
                                    <input
                                        className={`add-inventory__input-field ${!this.state.quantity && this.state.clicked ? "add-inventory__input-field--error" : ""}`}
                                        placeholder="0"
                                        onChange={this.handleChange}
                                        name="quantity"
                                    />
                                </div> : null}
                                {/* needs to populate from the warehouse json - warehouse names are required */}
                                <label
                                    className='add-inventory__label'
                                    htmlFor="warehouse">
                                    Warehouse
                                </label>
                                <select
                                    className={`add-inventory__dropdown ${!this.state.warehouseName && this.state.clicked ? "add-inventory__dropdown--error" : ""}`}
                                    name='warehouse'
                                    onChange={this.handleChange}
                                >
                                    <option value="">Please select</option>
                                    <option value="Manhattan">Manhattan</option>
                                    <option value="Washington">Washington</option>
                                    <option value="Jersey">Jersey</option>
                                    <option value="San Fran">San Fran</option>
                                    <option value="Santa Monica">Santa Monica</option>
                                    <option value="Seattle">Seattle</option>
                                    <option value="Miami">Miami</option>
                                    <option value="Boston">Boston</option>
                                </select>
                                {!this.state.warehouseName && this.state.clicked ? <div className='add-inventory__error'>
                                    <img
                                        src={errorIcon}
                                        alt="Error icon"
                                    />
                                    This field is required</div> : null}
                            </div>
                        </div>
                        <div className='add-inventory__buttons'>
                            <Link to='/inventory' className='add-inventory__cancel-button'>Cancel</Link>
                            <button className='add-inventory__add-button' type='submit'> + Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddInventoryItem