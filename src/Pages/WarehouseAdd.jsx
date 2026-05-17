import React from "react";
import FormPageBase from "../utils/FormPageBase";
import WarehouseForm from "../components/FormComponents/WarehouseForm/WarehouseForm";
import apiUtils from "../utils/apiUtils";
import {
   getWarehouseFieldValidity,
   getWarehousePayload,
   isWarehouseFormValid,
} from "../utils/warehouseFormUtils";

class AddWarehousePage extends FormPageBase {
   constructor(props) {
      super(props);
      this.state = {
         ...this.state,
         name: "",
         address: "",
         city: "",
         country: "",
         contactName: "",
         position: "",
         phone: "",
         email: "",
      };
   }

   getFieldValidity = () => getWarehouseFieldValidity(this.state);

   buildPayload = (state) => getWarehousePayload(state);
   isFormValid = (payload) => isWarehouseFormValid(payload);
   submitData = (payload) => apiUtils.addWarehouse(payload);
   getRedirectPath = () => "/warehouses";

   render() {
      if (this.state.loading) return <p>Loading...</p>;

      return (
         <WarehouseForm
            title="Add New Warehouse"
            submitLabel="+ Add Warehouse"
            {...this.state}
            onSubmit={this.submitHandler}
            onChange={this.handleChange}
            onBack={() => this.props.history.goBack()}
         />
      );
   }
}

export default AddWarehousePage;
