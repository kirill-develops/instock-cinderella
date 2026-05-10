import React from "react";
import "./EditInventoryItem.scss";
import { Component } from "react";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import apiUtils from "../../utils/apiUtils";
import {
   getInventoryFieldValidity,
   getInventoryPayload,
   isInventoryFormValid,
} from "../../utils/inventoryFormUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";

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
      apiError: "",
   };

   handleApiError = (err, fallbackMessage) => {
      this.setState({ apiError: getRequestErrorMessage(err, fallbackMessage) });
   };

   // The state of this page should load the form fields with the inventory info from match.params
   componentDidMount() {
      Promise.all([
         apiUtils.getInventoryById(this.props.match.params.id),
         apiUtils.getAllWarehouses(),
      ])
         .then(([inventoryResponse, warehousesResponse]) => {
            const {
               itemName,
               description,
               category,
               quantity,
               status,
               warehouseName,
            } = inventoryResponse.data;

            this.setState({
               inventoryItem: inventoryResponse.data,
               warehouseArr: warehousesResponse.data,
               itemName: itemName,
               warehouseName: warehouseName,
               description: description,
               category: category,
               status: status,
               quantity: quantity,
               apiError: "",
            });
         })
         .catch((error) => {
            this.handleApiError(error, "Unable to load inventory details.");
         });
   }

   isStock = () => {
      return this.state.status === "In Stock";
   };

   // Create a change handler to change the state as the user changes the categories
   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   submitHandler = (event) => {
      event.preventDefault();
      this.setState({ apiError: "" });

      const itemFormValues = {
         warehouseName: event.target.warehouseName.value,
         itemName: event.target.itemName.value,
         description: event.target.description.value,
         category: event.target.category.value,
         status: event.target.status.value,
         quantity: event.target.quantity
            ? event.target.quantity.value
            : this.state.quantity,
      };

      if (!isInventoryFormValid(itemFormValues)) {
         this.setState({
            apiError: "Please complete all required fields with valid values.",
         });
         return;
      }
      const itemObj = getInventoryPayload(itemFormValues);

      apiUtils
         .updateInventory(this.props.match.params.id, itemObj)
         .then(() => {
            this.props.history.push(`/inventory/${this.props.match.params.id}`);
         })
         .catch((error) => {
            this.handleApiError(error, "Unable to update inventory item.");
         });
   };

   render() {
      if (!this.state.inventoryItem) {
         return <p>Loading...</p>;
      }
      const validation = getInventoryFieldValidity(this.state);

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
                  {this.state.apiError ? (
                     <p className="inventory__required">
                        {this.state.apiError}
                     </p>
                  ) : null}
                  <div className="inventory__section">
                     <form
                        className="inventory__form"
                        onSubmit={this.submitHandler}
                     >
                        <div className="inventory__card">
                           <h3 className="inventory__subheader">
                              Item Details
                           </h3>
                           <div className="inventory__name--housing">
                              <label className="inventory__label">
                                 Item Name
                              </label>
                              <input
                                 type="text"
                                 name="itemName"
                                 placeholder="Item Name"
                                 autoComplete="off"
                                 onChange={this.handleChange}
                                 defaultValue={
                                    this.state.inventoryItem.itemName
                                 }
                                 className={`inventory__item ${
                                    validation.itemName
                                       ? ""
                                       : "inventory__item--error"
                                 }`}
                              />
                           </div>
                           {!validation.itemName ? (
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
                              <label className="inventory__label">
                                 Description
                              </label>
                              <textarea
                                 type="description"
                                 name="description"
                                 placeholder="Please enter item description"
                                 autoComplete="off"
                                 onChange={this.handleChange}
                                 defaultValue={
                                    this.state.inventoryItem.description
                                 }
                                 className={`inventory__description ${
                                    validation.description
                                       ? ""
                                       : "inventory__description--error"
                                 }`}
                              ></textarea>
                           </div>
                           {!validation.description ? (
                              <div className="inventory__alert">
                                 <img
                                    className="inventory__bang"
                                    src={errorIcon}
                                    alt="error exlaimation sign"
                                 />
                                 <p className="inventory__required">
                                    Minimum 10 characters required
                                 </p>
                              </div>
                           ) : null}
                           <div className="inventory__block">
                              <label className="inventory__label">
                                 Category
                              </label>
                              <select
                                 name="category"
                                 defaultValue={`${this.state.inventoryItem.category}`}
                                 onChange={this.handleChange}
                                 className={`inventory__dropdown ${
                                    validation.category
                                       ? ""
                                       : "inventory__item--error"
                                 }`}
                              >
                                 <option value="Health">Health</option>
                                 <option value="Gear">Gear</option>
                                 <option value="Accessories">
                                    Accessories
                                 </option>
                                 <option value="Apparel">Apparel</option>
                                 <option value="Electronics">
                                    Electronics
                                 </option>
                              </select>
                           </div>
                           {!validation.category ? (
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
                        </div>
                        <div className="inventory__divider"></div>
                        <div className="inventory__card inventory__card--divider">
                           <h3 className="inventory__subheader">
                              Item Availability
                           </h3>
                           <div className="inventory__availability">
                              <label className="inventory__label">Status</label>
                              <div className="inventory__details">
                                 <div className="inventory__stockpile">
                                    <input
                                       checked={this.state.status === "In Stock"}
                                       onChange={this.handleChange}
                                       className="inventory__radio"
                                       type="radio"
                                       id="instock"
                                       name="status"
                                       value="In Stock"
                                       htmlFor="instock"
                                    ></input>
                                    <label
                                       className="inventory__stock"
                                       htmlFor="instock"
                                    >
                                       In Stock
                                    </label>
                                 </div>
                                 <div className="inventory__stockpile inventory__stockpile--push">
                                    <input
                                       checked={
                                          this.state.status === "Out of Stock"
                                       }
                                       onChange={this.handleChange}
                                       className="inventory__radio"
                                       type="radio"
                                       id="outstock"
                                       name="status"
                                       value="Out of Stock"
                                       htmlFor="outstock"
                                    ></input>
                                    <label
                                       className="inventory__stock"
                                       htmlFor="outstock"
                                    >
                                       Out of stock
                                    </label>
                                 </div>
                              </div>
                              {!validation.status ? (
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
                              {this.isStock() ? (
                                 <div className="inventory__block">
                                    <div className="inventory__name--housing">
                                       <label className="inventory__label">
                                          Quantity
                                       </label>
                                       <input
                                          type="number"
                                          min="0"
                                          name="quantity"
                                          onChange={this.handleChange}
                                          defaultValue={
                                             this.state.inventoryItem.quantity
                                          }
                                          className={`inventory__item ${
                                             validation.quantity
                                                ? ""
                                                : "inventory__item--error"
                                          }`}
                                       />
                                    </div>
                                    {!validation.quantity ? (
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
                                 </div>
                              ) : null}
                              <div className="inventory__block">
                                 <label className="inventory__label">
                                    Warehouse
                                 </label>
                                 <select
                                    name="warehouseName"
                                    defaultValue={`${this.state.inventoryItem.warehouseName}`}
                                    onChange={this.handleChange}
                                    className={`inventory__dropdown ${
                                       validation.warehouseName
                                          ? ""
                                          : "inventory__item--error"
                                    }`}
                                 >
                                    {this.state.warehouseArr.map(
                                       (warehouseObject) => {
                                          return (
                                             <option
                                                key={warehouseObject.id}
                                                value={warehouseObject.name}
                                             >
                                                {warehouseObject.name}
                                             </option>
                                          );
                                       },
                                    )}
                                 </select>
                                 {!validation.warehouseName ? (
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
                              </div>
                           </div>
                        </div>
                        <div className="inventory__buttons inventory__buttons--mobile">
                           <button
                              type="button"
                              className="inventory__cancel"
                              onClick={() => this.props.history.goBack()}
                           >
                              Cancel
                           </button>
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
