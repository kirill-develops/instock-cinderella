import React from "react";
import "./EditInventoryItem.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import axios from "axios";
import apiUtils from "../../utils/apiUtils";

const BASE_URL = "http://localhost:8080";

export class EditInventoryItem extends Component {
  state = {
    inventoryItem: null,
    itemName: "",
    description: "",
    category: "",
    status: "",
    warehouseName: "",
    quantity: 0,
    warehouseArr: [],
  };

  // The state of this page should load the form fields with the inventory info from match.params
  componentDidMount() {
    axios
      .get(`${BASE_URL}/inventory/${this.props.match.params.id}`)
      .then((response) => {
        const {
          itemName,
          description,
          category,
          quantity,
          status,
          warehouseName,
        } = response.data;

        apiUtils.getAllWarehouses().then((response) => {
          this.setState({
            warehouseArr: response.data,
          });
        });

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
  };

  // Create a change handler to change the state as the user changes the categories
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Enter validation before the put request

  // Create logic for ITEM NAME
  isItemNameValid = () => {
    if (this.state.itemName.length < 1) {
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
      if (!this.isItemNameValid() && !this.isDescriptionValid()) {
        return false;
      }

      // Unexpectedly, setState won't work. Cannot change quantity to 0 when out of stock is selected.
      if (event.target.status.value.toLowerCase() === "out of stock") {
        console.log("test");
        this.setState({
          quantity: 0,
        });
      }
      return true;
    };

    if (isEditValid()) {

      console.log(this.state.quantity);
      axios
        .put(`${BASE_URL}/inventory/${this.props.match.params.id}/edit`, {
          warehouseName: event.target.warehouseName.value,
          itemName: event.target.itemName.value,
          description: event.target.description.value,
          category: event.target.category.value,
          status: event.target.status.value,
          quantity: this.state.quantity,
        })
        .then(
          this.props.history.push(`/inventory/${this.props.match.params.id}`)
        );
    } else {
      alert("Please fill out all form fields");
    }
  };

  render() {
    if (!this.state.inventoryItem) {
      return <p>Loading...</p>;
    }

    return (
      <div className="inventory">
        <div className="inventory__outer">
          <div className="inventory__inner">
            <div className="inventory__box">
              <img
                onClick={() => this.props.history.goBack()}
                className="inventory__back"
                src={arrowBack}
                alt="back button"
              />
              <h2 className="inventory__title">Edit Inventory Item</h2>
            </div>
            <div className="inventory__section">
              <form className="inventory__form" onSubmit={this.submitHandler}>
                <div className="inventory__card">
                  <h3 className="inventory__subheader">Item Details</h3>
                  <div className="inventory__name--housing">
                    <label className="inventory__label">Item Name</label>
                    <input
                      type="text"
                      name="itemName"
                      placeholder="Item Name"
                      autoComplete="off"
                      onChange={this.handleChange}
                      defaultValue={this.state.inventoryItem.itemName}
                      className={`inventory__item ${this.isItemNameValid() ? "" : "inventory__item--error"
                        }`}
                    />
                  </div>
                  {!this.isItemNameValid() ? (
                    <div className="inventory__alert">
                      <img
                        className="inventory__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="inventory__required">
                        This field is required
                      </p>
                    </div>
                  ) : null}
                  <div className="inventory__block">
                    <label className="inventory__label">Description</label>
                    <textarea
                      type="description"
                      name="description"
                      placeholder="Please enter item description"
                      autoComplete="off"
                      onChange={this.handleChange}
                      defaultValue={this.state.inventoryItem.description}
                      className={`inventory__description ${this.isDescriptionValid()
                        ? ""
                        : "inventory__description--error"
                        }`}
                    ></textarea>
                  </div>
                  {!this.isDescriptionValid() ? (
                    <div className="inventory__alert">
                      <img
                        className="inventory__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="inventory__required">
                        This field is required
                      </p>
                    </div>
                  ) : null}
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
                <div className="inventory__divider"></div>
                <div className="inventory__card inventory__card--divider">
                  <h3 className="inventory__subheader">Item Availability</h3>
                  <div className="inventory__availability">
                    <label className="inventory__label">Status</label>
                    <div className="inventory__details">
                      <div className="inventory__stockpile">
                        <input
                          checked={
                            this.state.status === "In Stock" ? "checked" : ""
                          }
                          onChange={this.handleChange}
                          className="inventory__radio"
                          type="radio"
                          id="instock"
                          name="status"
                          value="In Stock"
                          htmlFor="instock"
                        ></input>
                        <label className="inventory__stock" htmlFor="instock">
                          In Stock
                        </label>
                      </div>
                      <div className="inventory__stockpile inventory__stockpile--push">
                        <input
                          checked={
                            this.state.status === "Out of Stock"
                              ? "checked"
                              : ""
                          }
                          onChange={this.handleChange}
                          className="inventory__radio"
                          type="radio"
                          id="outstock"
                          name="status"
                          value="Out of Stock"
                          htmlFor="outstock"
                        ></input>
                        <label className="inventory__stock" htmlFor="outstock">
                          Out of stock
                        </label>
                      </div>
                    </div>
                    {this.isStock() ? (
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
                    ) : null}
                    <div className="inventory__block">
                      <label className="inventory__label">Warehouse</label>
                      <select
                        name="warehouseName"
                        defaultValue={`${this.state.inventoryItem.warehouseName}`}
                        onChange={this.handleChange}
                        className="inventory__dropdown"
                      >
                        {this.state.warehouseArr.map((warehouseObject) => {
                          return (
                            <option value={warehouseObject.name}>
                              {warehouseObject.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="inventory__buttons inventory__buttons--mobile">
                  <a
                    className="inventory__cancel"
                    onClick={() => this.props.history.goBack()}
                  >
                    Cancel
                  </a>
                  <button className="inventory__save">Save</button>
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
