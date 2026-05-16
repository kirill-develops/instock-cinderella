import React from "react";
import "./EditInventoryItem.scss";
import { Component } from "react";
import errorIcon from "../../assets/icons/error-24px.svg";
import apiUtils from "../../utils/apiUtils";
import {
   getInventoryFieldValidity,
   getInventoryPayload,
   isInventoryFormValid,
} from "../../utils/inventoryFormUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";
import PageHeader from "../PageHeader/PageHeader";
import Error from "../Error/Error";

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
         <>
            <PageHeader
               title={`Edit Inventory Item: ${this.state.inventoryItem.itemName}`}
               onBack={() => this.props.history.goBack()}
            />
            <Error apiError={this.state.apiError} />
            <div className="edit-inventory__section">
               <form
                  className="edit-
                        inventory__form"
                  onSubmit={this.submitHandler}
               >
                  <div className="edit-inventory__card">
                     <h3 className="edit-inventory__subheader">Item Details</h3>
                     <div className="edit-inventory__name--housing">
                        <label className="edit-inventory__label">
                           Item Name
                        </label>
                        <input
                           type="text"
                           name="itemName"
                           placeholder="Item Name"
                           autoComplete="off"
                           onChange={this.handleChange}
                           defaultValue={this.state.inventoryItem.itemName}
                           className={`edit-inventory__item ${
                              validation.itemName
                                 ? ""
                                 : "edit-inventory__item--error"
                           }`}
                        />
                     </div>
                     {!validation.itemName ? (
                        <div className="edit-inventory__alert">
                           <img
                              className="edit-inventory__bang"
                              src={errorIcon}
                              alt="error exlaimation sign"
                           />
                           <p className="edit-inventory__required">
                              This field is required
                           </p>
                        </div>
                     ) : null}
                     <div className="edit-inventory__block">
                        <label className="edit-inventory__label">
                           Description
                        </label>
                        <textarea
                           type="description"
                           name="description"
                           placeholder="Please enter item description"
                           autoComplete="off"
                           onChange={this.handleChange}
                           defaultValue={this.state.inventoryItem.description}
                           className={`edit-inventory__description ${
                              validation.description
                                 ? ""
                                 : "edit-inventory__description--error"
                           }`}
                        ></textarea>
                     </div>
                     {!validation.description ? (
                        <div className="edit-inventory__alert">
                           <img
                              className="edit-inventory__bang"
                              src={errorIcon}
                              alt="error exlaimation sign"
                           />
                           <p className="edit-inventory__required">
                              Minimum 10 characters required
                           </p>
                        </div>
                     ) : null}
                     <div className="edit-inventory__block">
                        <label className="edit-inventory__label">
                           Category
                        </label>
                        <select
                           name="category"
                           defaultValue={`${this.state.inventoryItem.category}`}
                           onChange={this.handleChange}
                           className={`edit-inventory__dropdown ${
                              validation.category
                                 ? ""
                                 : "edit-inventory__item--error"
                           }`}
                        >
                           <option value="Health">Health</option>
                           <option value="Gear">Gear</option>
                           <option value="Accessories">Accessories</option>
                           <option value="Apparel">Apparel</option>
                           <option value="Electronics">Electronics</option>
                        </select>
                     </div>
                     {!validation.category ? (
                        <div className="edit-inventory__alert">
                           <img
                              className="edit-inventory__bang"
                              src={errorIcon}
                              alt="error exlaimation sign"
                           />
                           <p className="edit-inventory__required">
                              This field is required
                           </p>
                        </div>
                     ) : null}
                  </div>
                  <div className="edit-inventory__divider"></div>
                  <div className="edit-inventory__card edit-inventory__card--divider">
                     <h3 className="edit-inventory__subheader">
                        Item Availability
                     </h3>
                     <div className="edit-inventory__availability">
                        <label className="edit-inventory__label">Status</label>
                        <div className="edit-inventory__details">
                           <div className="edit-inventory__stockpile">
                              <input
                                 checked={this.state.status === "In Stock"}
                                 onChange={this.handleChange}
                                 className="edit-inventory__radio"
                                 type="radio"
                                 id="instock"
                                 name="status"
                                 value="In Stock"
                                 htmlFor="instock"
                              ></input>
                              <label
                                 className="edit-inventory__stock"
                                 htmlFor="instock"
                              >
                                 In Stock
                              </label>
                           </div>
                           <div className="edit-inventory__stockpile edit-inventory__stockpile--push">
                              <input
                                 checked={this.state.status === "Out of Stock"}
                                 onChange={this.handleChange}
                                 className="edit-inventory__radio"
                                 type="radio"
                                 id="outstock"
                                 name="status"
                                 value="Out of Stock"
                                 htmlFor="outstock"
                              ></input>
                              <label
                                 className="edit-inventory__stock"
                                 htmlFor="outstock"
                              >
                                 Out of stock
                              </label>
                           </div>
                        </div>
                        {!validation.status ? (
                           <div className="edit-inventory__alert">
                              <img
                                 className="edit-inventory__bang"
                                 src={errorIcon}
                                 alt="error exlaimation sign"
                              />
                              <p className="edit-inventory__required">
                                 This field is required
                              </p>
                           </div>
                        ) : null}
                        {this.isStock() ? (
                           <div className="edit-inventory__block">
                              <div className="edit-inventory__name--housing">
                                 <label className="edit-inventory__label">
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
                                    className={`edit-inventory__item ${
                                       validation.quantity
                                          ? ""
                                          : "edit-inventory__item--error"
                                    }`}
                                 />
                              </div>
                              {!validation.quantity ? (
                                 <div className="edit-inventory__alert">
                                    <img
                                       className="edit-inventory__bang"
                                       src={errorIcon}
                                       alt="error exlaimation sign"
                                    />
                                    <p className="edit-inventory__required">
                                       This field is required
                                    </p>
                                 </div>
                              ) : null}
                           </div>
                        ) : null}
                        <div className="edit-inventory__block">
                           <label className="edit-inventory__label">
                              Warehouse
                           </label>
                           <select
                              name="warehouseName"
                              defaultValue={`${this.state.inventoryItem.warehouseName}`}
                              onChange={this.handleChange}
                              className={`edit-inventory__dropdown ${
                                 validation.warehouseName
                                    ? ""
                                    : "edit-inventory__item--error"
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
                              <div className="edit-inventory__alert">
                                 <img
                                    className="edit-inventory__bang"
                                    src={errorIcon}
                                    alt="error exlaimation sign"
                                 />
                                 <p className="edit-inventory__required">
                                    This field is required
                                 </p>
                              </div>
                           ) : null}
                        </div>
                     </div>
                  </div>
                  <div className="edit-inventory__buttons edit-inventory__buttons--mobile">
                     <button
                        type="button"
                        className="edit-inventory__cancel"
                        onClick={() => this.props.history.goBack()}
                     >
                        Cancel
                     </button>
                     <button className="edit-inventory__save">Save</button>
                  </div>
               </form>
            </div>
         </>
      );
   }
}

export default EditInventoryItem;
