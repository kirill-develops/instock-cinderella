import React from "react";
import { Link } from "react-router-dom";
import apiUtils from "../utils/apiUtils";
import ListPageBase from "../utils/ListPageBase";
import TableHeader from "../components/TableHeader/TableHeader";
import WarehouseListItem from "../components/ListRow/WarehouseListItem/WarehouseListItem";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import SkeletonTable from "../components/SkeletonTable/SkeletonTable";
import "../styles/listPages.scss";

const WAREHOUSE_HEADERS = [
   { name: "WAREHOUSE", flex: 0.8, key: "name" },
   { name: "ADDRESS", flex: 1, key: "address" },
   { name: "CONTACT NAME", flex: 0.9, key: "contact.name" },
   { name: "CONTACT INFORMATION", flex: 1.1, key: "contact.email" },
   { name: "ACTIONS", flex: 0.5 },
];

class Warehouses extends ListPageBase {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         warehouseArr: [],
         toDeleteId: "",
         toDeleteName: "",
         apiError: "",
         sortConfig: { key: "", isAscending: true },
      };
   }

   fetchData = () => apiUtils.getAllWarehouses().then((r) => r.data);
   getDataArray = (state) => state.warehouseArr;
   setDataArray = (arr) => ({ warehouseArr: arr });
   performDelete = (id) => apiUtils.deleteWarehouse(id);

   // nested key traversal for contact.name / contact.email
   getSortableValue = (obj, key) => {
      if (key === "contact.name") return obj.contact?.name || "";
      if (key === "contact.email") return obj.contact?.email || "";
      return obj[key] || "";
   };

   render() {
      const { warehouseArr, isLoading, apiError, toDeleteId, toDeleteName } =
         this.state;

      return (
         <>
            <div className="warehouses">
               <div className="warehouses__inner">
                  <div className="warehouses__headline">
                     <h1 className="warehouses__title">Warehouses</h1>
                     <div className="warehouses__form">
                        <div className="warehouses__search-housing">
                           <input
                              type="search"
                              name="search"
                              placeholder="Search..."
                              className="warehouses__search"
                           />
                        </div>
                        <div className="warehouses__cta-housing">
                           <Link
                              to="/warehouses/add"
                              className="warehouses__cta"
                           >
                              <span className="warehouses__cta-text">
                                 Add New Warehouse
                              </span>
                           </Link>
                        </div>
                     </div>
                  </div>
                  {apiError && <p className="warehouses__error">{apiError}</p>}
                  <div className="warehouses__headers">
                     {WAREHOUSE_HEADERS.map((header, i) => (
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
                        columns={5}
                        flexWeights={[0.8, 1, 0.9, 1.1, 0.5]}
                     />
                  ) : (
                     warehouseArr.map((warehouseObj) => (
                        <WarehouseListItem
                           key={warehouseObj.id}
                           warehouseObj={warehouseObj}
                           toggleModal={this.toggleModal}
                        />
                     ))
                  )}
               </div>
            </div>
            <div
               className={
                  toDeleteId
                     ? "warehouses__delete"
                     : "warehouses__delete--hidden"
               }
            >
               <DeleteModal
                  toDeleteId={toDeleteId}
                  toDeleteName={toDeleteName}
                  toDeleteType="warehouse"
                  handleCancel={this.resetDelete}
                  handleConfirm={this.handleConfirm}
                  closingStatement="from the list of warehouses"
               />
            </div>
         </>
      );
   }
}

export default Warehouses;
