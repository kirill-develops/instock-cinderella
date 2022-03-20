import './AddInventoryItem.scss';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import { BASE_URL } from '../../utils/api';
import axios from 'axios';

class AddInventoryItem extends Component {
    // state = {
    //     warehouseName: "",
    //     itemName: "",
    //     description: "",
    //     category: "",
    //     quantity: "",
    //     clicked: false
    // }

    // Axios POST call on submit
    submitHandler = (event) => {
        event.preventDefault();

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
                                    className="add-inventory__input-field "
                                    placeholder="Item Name"
                                    name="itemName"
                                />
                                <label
                                    className='add-inventory__label'
                                    htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    className="add-inventory__input-field "
                                    placeholder="Please enter a brief item description..."
                                    name="description"
                                >
                                </textarea>
                                {/* needs to populate from the inventory json list - category is required */}
                                <label
                                    className='add-inventory__label'
                                    htmlFor="category">
                                    Category
                                </label>
                                <select
                                    className="add-inventory__dropdown"
                                    name='category'
                                >
                                    <option value="">Please select</option>
                                    <option value = "Electronics">Electronics</option>
                                    <option value = "Gear">Gear</option>
                                    <option value = "Apparel">Apparel</option>
                                    <option value = "Accessories">Accessories</option>
                                    <option value = "Health">Health</option>
                                </select>
                            </div>
                            <div className='add-inventory__border-bottom'></div>
                            <div className='add-inventory__bottom-form'>
                                <h2 className='add-inventory__form-title'>Item Availability</h2>

                                <h4
                                    className='add-inventory__label'>
                                    Status
                                </h4>
                                <input
                                    className="add-inventory__radio"
                                    type="radio"
                                    name="status"
                                    value="In Stock"
                                ></input>
                                <label
                                    className='add-inventory__radio-label'
                                    htmlFor="instock">
                                    In Stock
                                </label>
                                <input
                                    className="add-inventory__radio"
                                    type="radio"
                                    name="status"
                                    value="Out of Stock"
                                ></input>
                                <label
                                    className='add-inventory__radio-label'
                                    htmlFor="outstock">
                                    Out of Stock
                                </label>
                                {/* needs to be dynamic, will not be visible if item is OOS */}
                                <label
                                    className='add-inventory__label'
                                    htmlFor="quantity">
                                    Quantity
                                </label>
                                <input
                                    className="add-inventory__input-field "
                                    placeholder="0"
                                    name="quantity"
                                />
                                {/* needs to populate from the warehouse json - warehouse names are required */}
                                <label
                                    className='add-inventory__label'
                                    htmlFor="warehouse">
                                    Warehouse
                                </label>
                                <select className="add-inventory__dropdown" name='warehouse'>
                                <option value="">Please select</option>
                                    <option value = "Manhattan">Manhattan</option>
                                    <option value = "Washington">Washington</option>
                                    <option value = "Jersey">Jersey</option>
                                    <option value = "San Fran">San Fran</option>
                                    <option value = "Santa Monica">Santa Monica</option>
                                    <option value = "Seattle">Seattle</option>
                                    <option value = "Miami">Miami</option>
                                    <option value = "Boston">Boston</option>
                                </select>
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