import React from "react";
import FormPageBase from "../utils/FormPageBase";
import InventoryForm from "../components/FormComponents/InventoryForm/InventoryForm";
import apiUtils from "../utils/apiUtils";
import {
   getInventoryFieldValidity,
   getInventoryPayload,
} from "../utils/inventoryFormUtils";

class EditInventoryItem extends FormPageBase {
   constructor(props) {
      super(props);
      this.state = {
         ...this.state,
         warehouseArr: [],
         itemName: "",
         description: "",
         category: "",
         status: "",
         warehouseName: "",
         quantity: 0,
      };
   }

   getFieldValidity = () => getInventoryFieldValidity(this.state);

   prefetchData = () => {
      const { id } = this.props.match.params;
      return Promise.all([
         apiUtils.getInventoryById(id),
         apiUtils.getAllWarehouses(),
      ]).then(([inv, warehouses]) => ({
         warehouseArr: warehouses.data,
         ...inv.data,
      }));
   };

   buildPayload = (state) => getInventoryPayload(state);
   submitData = (payload) =>
      apiUtils.updateInventory(this.props.match.params.id, payload);
   getRedirectPath = () => `/inventory/${this.props.match.params.id}`;

   isInStock = () => this.state.status === "In Stock";

   render() {
      if (this.state.loading) return <p>Loading...</p>;

      return (
         <InventoryForm
            title={`Edit Inventory Item: ${this.state.itemName}`}
            submitLabel="Save"
            {...this.state}
            isInStock={this.isInStock()}
            onSubmit={this.submitHandler}
            onChange={this.handleChange}
            onBack={() => this.props.history.goBack()}
         />
      );
   }
}

export default EditInventoryItem;
