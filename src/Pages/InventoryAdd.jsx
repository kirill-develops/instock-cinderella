import React from "react";
import FormPageBase from "../utils/FormPageBase";
import InventoryForm from "../components/FormComponents/InventoryForm/InventoryForm";
import apiUtils from "../utils/apiUtils";
import {
   getInventoryFieldValidity,
   getInventoryPayload,
} from "../utils/inventoryFormUtils";
import SkeletonView from "../components/SkeletonView/SkeletonView";

class AddInventoryItem extends FormPageBase {
   constructor(props) {
      super(props);
      this.state = {
         ...this.state,
         warehouseArr: [],
         warehouseName: "",
         itemName: "",
         description: "",
         category: "",
         status: "",
         quantity: "0",
      };
   }

   getFieldValidity = () => getInventoryFieldValidity(this.state);

   prefetchData = () =>
      apiUtils.getAllWarehouses().then((r) => ({ warehouseArr: r.data }));

   buildPayload = (state) => getInventoryPayload(state);
   submitData = (payload) => apiUtils.addInventory(payload);
   getRedirectPath = () => "/inventory/";

   isInStock = () => this.state.status === "In Stock";

   render() {
      if (this.state.loading) return <SkeletonView variant="inventory" />;

      return (
         <InventoryForm
            title="Add New Inventory Item"
            submitLabel="+ Add Item"
            {...this.state}
            isInStock={this.isInStock()}
            onSubmit={this.submitHandler}
            onChange={this.handleChange}
            onBack={() => this.props.history.goBack()}
         />
      );
   }
}

export default AddInventoryItem;
