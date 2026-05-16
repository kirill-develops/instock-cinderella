import React from "react";
import apiUtils from "../utils/apiUtils";
import ListPageBase from "../utils/ListPageBase";
import TableHeaders from "../components/TableHeaders/TableHeaders";
import InventoryListItem from "../components/ListRow/InventoryListItem/InventoryListItem";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import SkeletonTable from "../components/SkeletonTable/SkeletonTable";
import ListHeader from "../components/ListHeader/ListHeader";
import Error from "../components/Error/Error";
import "../styles/listPages.scss";

const INVENTORY_HEADERS = [
   { name: "INVENTORY ITEM", flex: 1, key: "itemName" },
   { name: "CATEGORY", flex: 0.8, key: "category" },
   { name: "STATUS", flex: 0.9, key: "status" },
   { name: "QTY", flex: 0.6, key: "quantity" },
   { name: "WAREHOUSE", flex: 0.8, key: "warehouseName" },
   { name: "ACTIONS", flex: 0.5, key: "actions" },
];

class Inventory extends ListPageBase {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         inventoryArr: [],
         toDeleteId: "",
         toDeleteName: "",
         apiError: "",
         sortConfig: { key: "", isAscending: true },
      };
   }

   fetchData = () => apiUtils.getAllInventory().then((r) => r.data);
   getDataArray = (state) => state.inventoryArr;
   setDataArray = (arr) => ({ inventoryArr: arr });
   performDelete = (id) => apiUtils.deleteInventory(id);

   render() {
      const { inventoryArr, isLoading, apiError, toDeleteId, toDeleteName } =
         this.state;

      return (
         <>
            <div className="inventory">
               <div className="inventory__inner">
                  <ListHeader
                     title={"Inventory"}
                     ctaRoute="/inventory/add"
                     ctaText="Add New Item"
                  />
                  <Error apiError={apiError} />
                  {
                     <TableHeaders
                        headers={INVENTORY_HEADERS}
                        handleSort={this.handleSort}
                     />
                  }
                  {isLoading ? (
                     <SkeletonTable
                        rows={6}
                        columns={6}
                        flexWeights={[1, 0.8, 0.9, 0.6, 0.8, 0.5]}
                     />
                  ) : (
                     inventoryArr.map((itemObj) => (
                        <InventoryListItem
                           key={itemObj.id}
                           itemObj={itemObj}
                           onDelete={this.toggleModal}
                        />
                     ))
                  )}
               </div>
            </div>
            <DeleteModal
               toDeleteId={toDeleteId}
               toDeleteName={toDeleteName}
               toDeleteType="inventory item"
               handleCancel={this.resetDelete}
               handleConfirm={this.handleConfirm}
               closingStatement="from the inventory list"
            />
         </>
      );
   }
}

export default Inventory;
