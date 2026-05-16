import "./AddInventoryItem.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import errorIcon from "../../assets/icons/error-24px.svg";
import apiUtils from "../../utils/apiUtils";
import {
   getInventoryFieldValidity,
   getInventoryPayload,
   isInventoryFormValid,
} from "../../utils/inventoryFormUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";
import PageHeader from "../PageHeader/PageHeader";

class AddInventoryItem extends Component {
   state = {
      warehouseName: "",
      itemName: "",
      description: "",
      category: "",
      status: "",
      quantity: "0",
      clicked: false,
      warehouseArr: [],
      apiError: "",
   };

   componentDidMount() {
      apiUtils
         .getAllWarehouses()
         .then((response) => {
            this.setState({ warehouseArr: response.data, apiError: "" });
         })
         .catch((error) => {
            this.setState({
               apiError: getRequestErrorMessage(
                  error,
                  "Unable to load warehouses.",
               ),
            });
         });
   }

   // Create a change handler for all inputs
   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   isInStock = () => {
      return this.state.status === "In Stock";
   };

   // Submit handler for Axios POST call on form submission
   submitHandler = (event) => {
      event.preventDefault();
      this.setState({ apiError: "" });

      if (isInventoryFormValid(this.state)) {
         const itemObj = getInventoryPayload(this.state);

         apiUtils
            .addInventory(itemObj)
            .then(() => {
               this.props.history.push("/inventory");
            })
            .catch((error) => {
               this.setState({
                  apiError: getRequestErrorMessage(
                     error,
                     "Unable to create inventory item.",
                  ),
               });
            });
      } else {
         this.setState({ clicked: true });
      }
   };

   render() {
      if (!this.state.warehouseArr.length && !this.state.apiError) {
         return <p>Loading...</p>;
      }
      const validation = getInventoryFieldValidity(this.state);

      return (
         <div className="background">
            <div className="add-inventory">
               <PageHeader
                  title={"Add New Inventory Item"}
                  onBack={() => this.props.history.goBack()}
               />
               {this.state.apiError ? (
                  <p className="add-inventory__text">{this.state.apiError}</p>
               ) : null}
               <div className="add-inventory__border-top"></div>
               <form
                  className="add-inventory__form"
                  onSubmit={this.submitHandler}
               >
                  <div className="add-inventory__housing">
                     <div className="add-inventory__top-form">
                        <h2 className="add-inventory__form-title">
                           Item Details
                        </h2>
                        <label
                           className="add-inventory__label"
                           htmlFor="itemName"
                        >
                           Item Name
                        </label>
                        <input
                           className={`add-inventory__input-field ${this.state.clicked && !validation.itemName ? "add-inventory__input-field--error" : ""}`}
                           onChange={this.handleChange}
                           placeholder="Item Name"
                           name="itemName"
                        />
                        {this.state.clicked && !validation.itemName ? (
                           <div className="add-inventory__error">
                              <img
                                 className="add-inventory__img"
                                 src={errorIcon}
                                 alt="Error icon"
                              />
                              <span className="add-inventory__text">
                                 This field is required
                              </span>
                           </div>
                        ) : null}
                        <label
                           className="add-inventory__label"
                           htmlFor="description"
                        >
                           Description
                        </label>
                        <textarea
                           className={`add-inventory__description-field ${this.state.clicked && !validation.description ? "add-inventory__description-field--error" : ""}`}
                           onChange={this.handleChange}
                           placeholder="Please enter a brief item description..."
                           name="description"
                        ></textarea>
                        {this.state.clicked && !validation.description ? (
                           <div className="add-inventory__error">
                              <img
                                 className="add-inventory__img"
                                 src={errorIcon}
                                 alt="Error icon"
                              />
                              <span className="add-inventory__text">
                                 Minimum 10 characters required
                              </span>
                           </div>
                        ) : null}
                        <label
                           className="add-inventory__label"
                           htmlFor="category"
                        >
                           Category
                        </label>
                        <select
                           className={`add-inventory__dropdown ${this.state.clicked && !validation.category ? "add-inventory__dropdown--error" : ""}`}
                           name="category"
                           onChange={this.handleChange}
                        >
                           <option value="">Please select</option>
                           <option value="Electronics">Electronics</option>
                           <option value="Gear">Gear</option>
                           <option value="Apparel">Apparel</option>
                           <option value="Accessories">Accessories</option>
                           <option value="Health">Health</option>
                        </select>
                        {this.state.clicked && !validation.category ? (
                           <div className="add-inventory__error">
                              <img
                                 className="add-inventory__img"
                                 src={errorIcon}
                                 alt="Error icon"
                              />
                              <span className="add-inventory__text">
                                 This field is required
                              </span>
                           </div>
                        ) : null}
                     </div>
                     <div className="add-inventory__border-bottom"></div>
                     <div className="add-inventory__bottom-form">
                        <h2 className="add-inventory__form-title">
                           Item Availability
                        </h2>

                        <h4 className="add-inventory__label">Status</h4>
                        <div className="add-inventory__radio-housing">
                           <div className="add-inventory__radio-set">
                              <input
                                 className="add-inventory__radio"
                                 type="radio"
                                 name="status"
                                 onChange={this.handleChange}
                                 value="In Stock"
                              ></input>
                              <label
                                 className="add-inventory__radio-label"
                                 htmlFor="instock"
                              >
                                 In Stock
                              </label>
                           </div>
                           <div className="add-inventory__radio-set">
                              <input
                                 className="add-inventory__radio"
                                 type="radio"
                                 name="status"
                                 onChange={this.handleChange}
                                 value="Out of Stock"
                              ></input>
                              <label
                                 className="add-inventory__radio-label"
                                 htmlFor="outstock"
                              >
                                 Out of Stock
                              </label>
                           </div>
                        </div>
                        {this.state.clicked && !validation.status ? (
                           <div className="add-inventory__error">
                              <img
                                 className="add-inventory__img"
                                 src={errorIcon}
                                 alt="Error icon"
                              />
                              <span className="add-inventory__text">
                                 This field is required
                              </span>
                           </div>
                        ) : null}
                        {this.isInStock() ? (
                           <div>
                              <label
                                 className="add-inventory__label"
                                 htmlFor="quantity"
                              >
                                 Quantity
                              </label>
                              <input
                                 type="number"
                                 min="0"
                                 className={`add-inventory__input-field ${this.state.clicked && !validation.quantity ? "add-inventory__input-field--error" : ""}`}
                                 placeholder="0"
                                 onChange={this.handleChange}
                                 name="quantity"
                              />
                              {this.state.clicked && !validation.quantity ? (
                                 <div className="add-inventory__error">
                                    <img
                                       className="add-inventory__img"
                                       src={errorIcon}
                                       alt="Error icon"
                                    />
                                    <span className="add-inventory__text">
                                       This field is required
                                    </span>
                                 </div>
                              ) : null}
                           </div>
                        ) : null}
                        <label
                           className="add-inventory__label"
                           htmlFor="warehouse"
                        >
                           Warehouse
                        </label>
                        <select
                           className={`add-inventory__dropdown ${this.state.clicked && !validation.warehouseName ? "add-inventory__dropdown--error" : ""}`}
                           name="warehouseName"
                           onChange={this.handleChange}
                        >
                           <option value="">Please select</option>
                           {this.state.warehouseArr.map((warehouse, i) => {
                              return (
                                 <option
                                    key={i}
                                    value={warehouse.name}
                                 >
                                    {warehouse.name}
                                 </option>
                              );
                           })}
                        </select>
                        {this.state.clicked && !validation.warehouseName ? (
                           <div className="add-inventory__error">
                              <img
                                 className="add-inventory__img"
                                 src={errorIcon}
                                 alt="Error icon"
                              />
                              <span className="add-inventory__text">
                                 This field is required
                              </span>
                           </div>
                        ) : null}
                     </div>
                  </div>
                  <div className="add-inventory__buttons">
                     <Link
                        to="/inventory"
                        className="add-inventory__cancel-button"
                     >
                        Cancel
                     </Link>
                     <button
                        className="add-inventory__add-button"
                        type="submit"
                     >
                        {" "}
                        + Add Item
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

export default AddInventoryItem;
