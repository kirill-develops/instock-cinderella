import React from "react";
import { Link } from "react-router-dom";
import apiUtils from "../utils/apiUtils";
import ListPageBase from "../utils/ListPageBase";
import TableHeader from "../components/TableHeader/TableHeader";
import InventoryListItem from "../components/ListRow/InventoryListItem/InventoryListItem";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import SkeletonTable from "../components/SkeletonTable/SkeletonTable";
import "../styles/listPages.scss";

const INVENTORY_HEADERS = [
   { name: "INVENTORY ITEM", flex: 1, key: "itemName" },
   { name: "CATEGORY", flex: 0.8, key: "category" },
   { name: "STATUS", flex: 0.9, key: "status" },
   { name: "QTY", flex: 0.6, key: "quantity" },
   { name: "WAREHOUSE", flex: 0.8, key: "warehouseName" },
   { name: "ACTIONS", flex: 0.5 },
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
                  <div className="inventory__headline">
                     <h1 className="inventory__title">Inventory</h1>
                     <div className="inventory__form">
                        <div className="inventory__search-housing">
                           <input
                              type="search"
                              name="search"
                              placeholder="Search..."
                              className="inventory__search"
                           />
                        </div>
                        <div className="inventory__cta-housing">
                           <Link
                              to="/inventory/add/"
                              className="inventory__cta"
                           >
                              <span className="inventory__cta-text">
                                 Add New Item
                              </span>
                           </Link>
                        </div>
                     </div>
                  </div>
                  {apiError && <p className="inventory__error">{apiError}</p>}
                  <div className="inventory__headers">
                     {INVENTORY_HEADERS.map((header, i) => (
                        <TableHeader
                           key={i}
                           header={header}
                           handleSort={this.handleSort}
                        />
                     ))}
                  </div>
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
                           toggleModal={this.toggleModal}
                        />
                     ))
                  )}
               </div>
            </div>
            <div
               className={
                  toDeleteId ? "inventory__delete" : "inventory__delete--hidden"
               }
            >
               <DeleteModal
                  toDeleteId={toDeleteId}
                  toDeleteName={toDeleteName}
                  toDeleteType="inventory item"
                  handleCancel={this.resetDelete}
                  handleConfirm={this.handleConfirm}
                  closingStatement="from the inventory list"
               />
            </div>
         </>
      );
   }
}

export default Inventory;
