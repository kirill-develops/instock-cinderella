import React, { Component } from "react";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import NewWarehouseDetails from "../../components/NewWarehouseDetails/NewWarehouseDetails";
import "./AddWarehousePage.scss";
import apiUtils from "../../utils/apiUtils";
import {
   getWarehouseFieldValidity,
   getWarehousePayload,
   isWarehouseFormValid,
} from "../../utils/warehouseFormUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";

class AddWarehousePage extends Component {
   state = {
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

   // Create a change handler for all inputs
   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   getFormValues = () => getWarehousePayload(this.state);

   submitHandler = (event) => {
      event.preventDefault();
      this.setState({ apiError: "" });

      const warehouseDetails = this.getFormValues();
      if (isWarehouseFormValid(warehouseDetails)) {
         apiUtils
            .addWarehouse(warehouseDetails)
            .then((_res) => {
               this.props.history.push("/warehouses");
            })
            .catch((error) => {
               this.handleApiError(error, "Unable to create warehouse.");
            });
      } else {
         this.setState({ clicked: true });
      }
   };

   render() {
      const validation = getWarehouseFieldValidity(this.getFormValues());

      return (
         <div className="background">
            <div className="add-warehouse">
               <div className="add-warehouse__top">
                  <img
                     onClick={() => this.props.history.goBack()}
                     className="add-warehouse__icon"
                     src={backArrow}
                     alt="back arrow icon"
                  />
                  <h1 className="add-warehouse__title">Add New Warehouse</h1>
               </div>
               {this.state.apiError ? (
                  <p className="new-warehouse__required">
                     {this.state.apiError}
                  </p>
               ) : null}
               <NewWarehouseDetails
                  submitHandler={this.submitHandler}
                  handleChange={this.handleChange}
                  clicked={this.state.clicked}
                  validation={validation}
               />
            </div>
         </div>
      );
   }
}

export default AddWarehousePage;
