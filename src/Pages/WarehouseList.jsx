import React from "react";
import apiUtils from "../utils/apiUtils";
import ListPageBase from "../utils/ListPageBase";
import TableHeaders from "../components/TableHeaders/TableHeaders";
import WarehouseListItem from "../components/ListRow/WarehouseListItem/WarehouseListItem";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import SkeletonTable from "../components/SkeletonTable/SkeletonTable";
import ListPageHeader from "../components/ListPageHeader/ListPageHeader";
import PageError from "../components/PageError/PageError";
import "../styles/Pages.scss";

const WAREHOUSE_HEADERS = [
   { name: "WAREHOUSE", flex: 0.8, key: "name" },
   { name: "ADDRESS", flex: 1, key: "address" },
   { name: "CONTACT NAME", flex: 0.9, key: "contact.name" },
   { name: "CONTACT INFORMATION", flex: 1.1, key: "contact.email" },
   { name: "ACTIONS", flex: 0.5, key: "actions" },
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
            <ListPageHeader
               title={"Warehouses"}
               ctaRoute="/warehouses/add"
               ctaText="Add New Warehouse"
            />
            <PageError apiError={apiError} />
            <div className="warehouses__headers">
               {
                  <TableHeaders
                     headers={WAREHOUSE_HEADERS}
                     handleSort={this.handleSort}
                  />
               }
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
                     onDelete={this.toggleModal}
                  />
               ))
            )}
            <DeleteModal
               toDeleteId={toDeleteId}
               toDeleteName={toDeleteName}
               toDeleteType="warehouse"
               handleCancel={this.resetDelete}
               handleConfirm={this.handleConfirm}
               closingStatement="from the list of warehouses"
            />
         </>
      );
   }
}

export default Warehouses;
