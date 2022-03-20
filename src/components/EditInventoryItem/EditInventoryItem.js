import React from "react";
import "./EditInventoryItem.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export class EditInventoryItem extends Component {
  state = {
    inventoryItem: null,
    itemName: "",
    description: "",
    category: "",
    description: "",
    status: "",
    warehouseName: "",
    quantity: Number,
  };

  // The state of this page should load the form fields with the inventory info from match.params
  componentDidMount() {
    axios
      .get(`${BASE_URL}/inventory/${this.props.match.params.id}`)
      .then((response) => {
        // console.log(response.data);
        const {
          itemName,
          description,
          category,
          quantity,
          status,
          warehouseName,
        } = response.data;

        this.setState({
          inventoryItem: response.data,
          itemName: itemName,
          warehouseName: warehouseName,
          description: description,
          category: category,
          status: status,
          quantity: quantity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isStock = () => {
    if (this.state.status === "In Stock") {
      return true;
    }
    return false;
  }

  // Create a change handler to change the state as the user changes the categories
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state.status)
  };

  // Enter validation before the put request

  // Create logic for ITEM NAME
  isItemNameValid = () => {
    if (this.state.itemName.length < 3) {
      console.log("itemName");
      return false;
    }
    return true;
  };

  // Create logic for a valid DESCRIPTION
  isDescriptionValid = () => {
    if (this.state.description.length < 10) {
      console.log("description");
      return false;
    }
    return true;
  };

  // On submit, make a PUT axios call and target the value of the form fields
  submitHandler = (event) => {
    event.preventDefault();
    
    const isEditValid = () => {
      if ( 
        this.isItemNameValid() &&
        this.isDescriptionValid()
      ) {
        return true; 
      } else {
        return false; 
      }
    };

    if (isEditValid()) {
      // console.log(this.props.match.params.id);
      console.log(event.target.quantity.value)
       axios
        .put(`${BASE_URL}/inventory/${this.props.match.params.id}/edit`, {
          "warehouseName": event.target.warehouseName.value,
          "itemName": event.target.itemName.value,
          "description": event.target.description.value,
          "category": event.target.category.value,
          "status": event.target.status.value,
          "quantity": event.target.quantity.value
        })
        .then(
          this.props.history.push(`/inventory/${this.props.match.params.id}`)
        );
    } else {
      alert("Please fill out all form fields");
    }
  };

  // When save button is clicked, congregate all inventory details into one object.

  render() {
    if (!this.state.inventoryItem) {
      return <p>Loading...</p>;
    }

    return (
      <div className="inventory">
        <div className="inventory__outer">
          <div className="inventory__inner">
          <div className="inventory__box">
              <Link to="/inventory">
                <img className="inventory__back" src={arrowBack} />
              </Link>
            <h2 className="inventory__title">Edit Inventory Item</h2>
            </div>
            <div className="inventory__section">
              <form className="inventory__form" onSubmit={this.submitHandler} >
                <div className="inventory__card">
                  <h3 className="inventory__subheader">Item Details</h3>
                  <div className="inventory__name--housing">
                    <label className="inventory__label">Item Name</label>
                    <input
                      type="name"
                      name="itemName"
                      placeholder="name"
                      onChange={this.handleChange}
                      defaultValue={this.state.inventoryItem.itemName}
                      className={`inventory__item ${
                        this.isItemNameValid() ? "" : "inventory__item--error"
                      }`}
                    />
                  </div>
                  <div className="inventory__block">
                    <label className="inventory__label">Description</label>
                    <textarea
                      type="description"
                      name="description"
                      onChange={this.handleChange}
                      defaultValue={this.state.inventoryItem.description}
                      className="inventory__description"
                    ></textarea>
                  </div>
                  <div className="inventory__block">
                    <label className="inventory__label">Category</label>
                    <select
                      name="category"
                      defaultValue={`${this.state.inventoryItem.category}`}
                      onChange={this.handleChange}
                      className="inventory__dropdown"
                    >
                      <option value="Health">Health</option>
                      <option value="Gear">Gear</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Apparel">Apparel</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>
                </div>

                <div className="inventory__card inventory__card--divider">
                  <h3 className="inventory__subheader">Item Availability</h3>
                  <div className="inventory__availability">
                    <label className="inventory__label">Status</label>
                    <div className="inventory__details">
                      <div className="inventory__stockpile">
                        <input
                          checked = {this.state.status === "In Stock" ? "checked" : ""}
                          onChange={this.handleChange}
                          className="inventory__radio"
                          type="radio"
                          id="instock"
                          name="status"
                          value="In Stock"
                          for="instock"
                        ></input>
                        <label className="inventory__instock" htmlFor="instock">
                          In Stock
                        </label>
                      </div>
                      <div className="inventory__stockpile">
                        <input 
                          checked = {this.state.status === "Out of Stock" ? "checked" : ""}
                          onChange={this.handleChange}
                          className="inventory__radio"
                          type="radio"
                          id="outstock"
                          name="status"
                          value="Out of Stock"
                          for="outstock"
                        ></input>
                        <label className="inventory__outstock" HtmlFor="outstock">
                          Out of stock
                        </label>
                      </div>
                    </div>
                    {this.isStock() ? 
                      <div className="inventory__block">
                  <div className="inventory__name--housing">
                      <label className="inventory__label">Quantity</label>
                      <input
                        type="quantity"
                        name="quantity"
                        onChange={this.handleChange}
                        defaultValue={this.state.inventoryItem.quantity}
                        className="inventory__item"
                      />
                    </div>
                    </div>
                    : null
                  }
                    <div className="inventory__block">
                      <label className="inventory__label">Warehouse</label>
                      <select
                        name="warehouseName"
                        defaultValue={`${this.state.inventoryItem.warehouseName}`}
                        onChange={this.handleChange}
                        className="inventory__dropdown"
                      >
                        <option value="Manhattan">Manhattan</option>
                        <option value="Washington">Washington</option>
                        <option value="Jersey">Jersey</option>
                        <option value="San Dran">San Fran</option>
                        <option value="Santa Monica">Santa Monica</option>
                        <option value="Seattle">Seattle</option>
                        <option value="Miami">Miami</option>
                      </select>
                    </div>
                  </div>
                </div>
        <div className="inventory__buttons inventory__buttons--mobile">
          <Link className="inventory__cancel" to="/inventory:id/">
            Cancel
          </Link>
          <button
            className="inventory__save"
          >
            Save
          </button>
        </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditInventoryItem;
