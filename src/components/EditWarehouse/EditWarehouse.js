import React from "react";
import { Component } from "react";
import errorIcon from "../../assets/icons/error-24px.svg";
import "../EditWarehouse/EditWarehouse.scss";
import apiUtils from "../../utils/apiUtils";
import {
   getWarehouseFieldValidity,
   getWarehousePayload,
   isWarehouseFormValid,
} from "../../utils/warehouseFormUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";
import PageHeader from "../PageHeader/PageHeader";

export class EditWarehouse extends Component {
   // The state of this page should load the form fields with the warehouse info of the match.params.

   state = {
      warehouse: null,
      name: "",
      address: "",
      city: "",
      country: "",
      contactName: "",
      position: "",
      phone: "",
      email: "",
      clicked: false,
      apiError: "",
   };

   handleApiError = (err, fallbackMessage) => {
      this.setState({ apiError: getRequestErrorMessage(err, fallbackMessage) });
   };

   getFormValues = () => getWarehousePayload(this.state);

   componentDidMount() {
      apiUtils
         .getWarehouseById(this.props.match.params.id)
         .then((response) => {
            const { name, address, city, country, contact } = response.data;

            this.setState({
               warehouse: response.data,
               name: name,
               address: address,
               city: city,
               country: country,
               contactName: contact.name,
               position: contact.position,
               phone: contact.phone,
               email: contact.email,
               apiError: "",
            });
         })
         .catch((error) => {
            this.handleApiError(error, "Unable to load warehouse details.");
         });
   }

   submitHandler = (event) => {
      event.preventDefault();
      this.setState({ apiError: "" });

      const warehouseDetails = getWarehousePayload({
         name: event.target.name.value,
         address: event.target.address.value,
         city: event.target.city.value,
         country: event.target.country.value,
         contactName: event.target.contactName.value,
         position: event.target.position.value,
         phone: event.target.phone.value,
         email: event.target.email.value,
      });

      if (!isWarehouseFormValid(warehouseDetails)) {
         this.setState({
            clicked: true,
            apiError: "Please fill out all form fields.",
         });
         return;
      }

      apiUtils
         .updateWarehouse(this.props.match.params.id, warehouseDetails)
         .then(() => {
            this.props.history.push(
               `/warehouses/${this.props.match.params.id}`,
            );
         })
         .catch((error) => {
            this.handleApiError(error, "Unable to update warehouse.");
         });
   };

   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   render() {
      if (!this.state.warehouse) {
         return <p>Loading...</p>;
      }
      const validation = getWarehouseFieldValidity(this.getFormValues());
      return (
         <div className="warehouse-edit">
            <div className="warehouse-edit__outer">
               <div className="warehouse-edit__inner">
                  <PageHeader
                     title={`Edit Warehouse: ${this.state.warehouse.name}`}
                     onBack={() => this.props.history.goBack()}
                  />
                  {this.state.apiError ? (
                     <p className="warehouse-edit__required">
                        {this.state.apiError}
                     </p>
                  ) : null}
                  <form
                     onSubmit={this.submitHandler}
                     className="warehouse-edit__form"
                  >
                     <div className="warehouse-edit__card">
                        <div className="warehouse-edit__subheader-housing">
                           <h2 className="warehouse-edit__subheader">
                              Warehouse Details
                           </h2>
                        </div>
                        <div className="warehouse-edit__name-housing">
                           <label className="warehouse-edit__input-label">
                              Warehouse Name
                           </label>
                           <input
                              type="name"
                              name="name"
                              autoComplete="off"
                              defaultValue={this.state.warehouse.name}
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.name
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                        </div>
                        {!validation.name ? (
                           <div className="warehouse-edit__alert">
                              <img
                                 className="warehouse-edit__bang"
                                 src={errorIcon}
                                 alt="error exlaimation sign"
                              />
                              <p className="warehouse-edit__required">
                                 This field is required
                              </p>
                           </div>
                        ) : null}
                        <div className="warehouse-edit__name-housing">
                           <label className="warehouse-edit__input-label">
                              Street Address
                           </label>
                           <input
                              type="name"
                              name="address"
                              autoComplete="off"
                              defaultValue={this.state.warehouse.address}
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.address
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                        </div>
                        {!validation.address ? (
                           <div className="warehouse-edit__alert">
                              <img
                                 className="warehouse-edit__bang"
                                 src={errorIcon}
                                 alt="error exlaimation sign"
                              />
                              <p className="warehouse-edit__required">
                                 This field is required
                              </p>
                           </div>
                        ) : null}
                        <div className="warehouse-edit__name-housing">
                           <label className="warehouse-edit__input-label">
                              City
                           </label>
                           <input
                              type="name"
                              name="city"
                              autoComplete="off"
                              defaultValue={this.state.warehouse.city}
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.city
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                        </div>
                        {!validation.city ? (
                           <div className="warehouse-edit__alert">
                              <img
                                 className="warehouse-edit__bang"
                                 src={errorIcon}
                                 alt="error exlaimation sign"
                              />
                              <p className="warehouse-edit__required">
                                 This field is required
                              </p>
                           </div>
                        ) : null}
                        <div className="warehouse-edit__name-housing warehouse-edit__name-housing--bumper">
                           <label className="warehouse-edit__input-label">
                              Country
                           </label>
                           <input
                              type="name"
                              name="country"
                              autoComplete="off"
                              defaultValue={this.state.warehouse.country}
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.country
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                           {!validation.country ? (
                              <div className="warehouse-edit__alert warehouse-edit__alert--adjustment">
                                 <img
                                    className="warehouse-edit__bang"
                                    src={errorIcon}
                                    alt="error exlaimation sign"
                                 />
                                 <p className="warehouse-edit__required">
                                    This field is required
                                 </p>
                              </div>
                           ) : null}
                        </div>
                     </div>
                     <div className="warehouse-edit__card warehouse-edit__card--border">
                        <div className="warehouse-edit__subheader-housing">
                           <h2 className="warehouse-edit__subheader warehouse-edit__subheader--contact">
                              Contact Details
                           </h2>
                        </div>
                        <div className="warehouse-edit__name-housing">
                           <label className="warehouse-edit__input-label">
                              Contact Name
                           </label>
                           <input
                              type="name"
                              name="contactName"
                              autoComplete="off"
                              defaultValue={this.state.warehouse.contact.name}
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.contactName
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                        </div>
                        {!validation.contactName ? (
                           <div className="warehouse-edit__alert">
                              <img
                                 className="warehouse-edit__bang"
                                 src={errorIcon}
                                 alt="error exlaimation sign"
                              />
                              <p className="warehouse-edit__required">
                                 This field is required
                              </p>
                           </div>
                        ) : null}
                        <div className="warehouse-edit__name-housing">
                           <label className="warehouse-edit__input-label">
                              Position
                           </label>
                           <input
                              type="name"
                              name="position"
                              autoComplete="off"
                              defaultValue={
                                 this.state.warehouse.contact.position
                              }
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.position
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                        </div>
                        {!validation.position ? (
                           <div className="warehouse-edit__alert">
                              <img
                                 className="warehouse-edit__bang"
                                 src={errorIcon}
                                 alt="error exlaimation sign"
                              />
                              <p className="warehouse-edit__required">
                                 This field is required
                              </p>
                           </div>
                        ) : null}
                        <div className="warehouse-edit__name-housing">
                           <label className="warehouse-edit__input-label">
                              Phone Number
                           </label>
                           <input
                              type="name"
                              name="phone"
                              autoComplete="off"
                              defaultValue={this.state.warehouse.contact.phone}
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.phone
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                        </div>
                        {!validation.phone ? (
                           <div className="warehouse-edit__alert">
                              <img
                                 className="warehouse-edit__bang"
                                 src={errorIcon}
                                 alt="error exlaimation sign"
                              />
                              <p className="warehouse-edit__required">
                                 Please enter a valid phone number
                              </p>
                           </div>
                        ) : null}
                        <div className="warehouse-edit__name-housing warehouse-edit__name-housing--bumper">
                           <label className="warehouse-edit__input-label">
                              Email
                           </label>
                           <input
                              type="name"
                              name="email"
                              autoComplete="off"
                              defaultValue={this.state.warehouse.contact.email}
                              onChange={this.handleChange}
                              className={`warehouse-edit__field ${
                                 validation.email
                                    ? ""
                                    : "warehouse-edit__field--error"
                              }`}
                           />
                           {!validation.email ? (
                              <div className="warehouse-edit__alert warehouse-edit__alert--adjustment">
                                 <img
                                    className="warehouse-edit__bang"
                                    src={errorIcon}
                                    alt="error exlaimation sign"
                                 />
                                 <p className="warehouse-edit__required">
                                    Please enter a valid email address
                                 </p>
                              </div>
                           ) : null}
                        </div>
                     </div>
                     <div className="warehouse-edit__buttons warehouse-edit__buttons--mobile">
                        <p
                           className="warehouse-edit__cancel"
                           onClick={() => this.props.history.goBack()}
                        >
                           Cancel
                        </p>
                        <button className="warehouse-edit__save">Save</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

export default EditWarehouse;
