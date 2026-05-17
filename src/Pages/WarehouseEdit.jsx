import React from "react";
import FormPageBase from "../utils/FormPageBase";
import WarehouseForm from "../components/FormComponents/WarehouseForm/WarehouseForm";
import apiUtils from "../utils/apiUtils";
import {
   getWarehouseFieldValidity,
   getWarehousePayload,
   isWarehouseFormValid,
} from "../utils/warehouseFormUtils";
import SkeletonView from "../components/SkeletonView/SkeletonView";

class EditWarehouse extends FormPageBase {
   getInitialFields = () => ({
      name: "",
      address: "",
      city: "",
      country: "",
      contactName: "",
      position: "",
      phone: "",
      email: "",
   });

   constructor(props) {
      super(props);
      this.state = { ...this.state, ...this.getInitialFields() };
   }

   getFieldValidity = () => getWarehouseFieldValidity(this.state);

   prefetchData = () => {
      const { id } = this.props.match.params;
      return apiUtils.getWarehouseById(id).then((r) => {
         const { name, address, city, country, contact } = r.data;
         return {
            name,
            address,
            city,
            country,
            contactName: contact.name,
            position: contact.position,
            phone: contact.phone,
            email: contact.email,
         };
      });
   };

   buildPayload = (state) => getWarehousePayload(state);
   isFormValid = (payload) => isWarehouseFormValid(payload);
   submitData = (payload) =>
      apiUtils.updateWarehouse(this.props.match.params.id, payload);
   getRedirectPath = () => `/warehouses/${this.props.match.params.id}`;

   render() {
      if (this.state.loading) return <SkeletonView variant="warehouse" />;

      return (
         <WarehouseForm
            title={`Edit Warehouse: ${this.state.name}`}
            submitLabel="Save"
            {...this.state}
            onSubmit={this.submitHandler}
            onChange={this.handleChange}
            onBack={() => this.props.history.goBack()}
         />
      );
   }
}

export default EditWarehouse;
