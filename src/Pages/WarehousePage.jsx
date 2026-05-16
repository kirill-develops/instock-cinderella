import React from "react";
import apiUtils from "../utils/apiUtils";
import TableHeader from "../components/TableHeader/TableHeader";
import InventoryListItem from "../components/ListRow/InventoryListItem/InventoryListItem";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import SkeletonTable from "../components/SkeletonTable/SkeletonTable";
import ListPageBase from "../utils/ListPageBase";
import "../styles/listPages.scss";
import PageHeader from "../components/PageHeader/PageHeader";

const WAREHOUSE_PAGE_HEADERS = [
   {
      name: "INVENTORY ITEM",
      flex: 1,
      key: "itemName",
   },
   {
      name: "CATEGORY",
      flex: 0.8,
      key: "category",
   },
   {
      name: "STATUS",
      flex: 0.9,
      key: "status",
   },
   {
      name: "QUANTITY",
      flex: 0.6,
      key: "quantity",
   },
   { name: "ACTIONS", flex: 0.5 },
];
class WarehousePage extends ListPageBase {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         warehouse: null,
         toDeleteId: "",
         toDeleteName: "",
         apiError: "",
         sortConfig: { key: "", isAscending: true },
      };
   }

   fetchData = (id) => apiUtils.getWarehouseById(id).then((r) => r.data);
   setData = (warehouse) => ({ warehouse });
   getDataArray = (state) => state.warehouse?.inventory || [];
   setDataArray = (arr, prevState) => ({
      warehouse: { ...prevState.warehouse, inventory: arr },
   });
   performDelete = (id) => apiUtils.deleteInventory(id);

   render() {
      const { warehouse, isLoading, apiError, toDeleteId, toDeleteName } =
         this.state;

      return (
         <>
            <div className="warehouse-page">
               <div className="warehouse-page__inner">
                  <PageHeader
                     title={warehouse?.name}
                     onBack={() => this.props.history.goBack()}
                     editRoute={
                        warehouse ? `/warehouses/${warehouse.id}/edit` : null
                     }
                  />
                  {apiError && (
                     <p className="warehouse-page__error">{apiError}</p>
                  )}
                  {warehouse && (
                     <div className="warehouse-page__info-panel">
                        <div className="warehouse-page__info-body">
                           <div className="warehouse-page__address">
                              <div className="warehouse-page__info-group warehouse-page__info-group--mobile">
                                 <h4 className="warehouse-page__info-label">
                                    WAREHOUSE ADDRESS:
                                 </h4>
                                 <p className="warehouse-page__info-value">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</p>
                              </div>
                              <div className="warehouse-page__info-group warehouse-page__info-group--tablet">
                                 <h4 className="warehouse-page__info-label">
                                    WAREHOUSE ADDRESS:
                                 </h4>
                                 <p className="warehouse-page__info-value">{`${warehouse.address},`}</p>
                                 <p className="warehouse-page__info-value">{`${warehouse.city}, ${warehouse.country}`}</p>
                              </div>
                           </div>
                           <div className="warehouse-page__contact">
                              <div className="warehouse-page__info-group">
                                 <h4 className="warehouse-page__info-label">
                                    CONTACT NAME:
                                 </h4>
                                 <p className="warehouse-page__info-value">
                                    {warehouse.contact.name}
                                 </p>
                                 <p className="warehouse-page__info-value">
                                    {warehouse.contact.position}
                                 </p>
                              </div>
                              <div className="warehouse-page__info-group warehouse-page__info-group--padded">
                                 <h4 className="warehouse-page__info-label">
                                    CONTACT INFORMATION:
                                 </h4>
                                 <p className="warehouse-page__info-value">
                                    {warehouse.contact.phone}
                                 </p>
                                 <p className="warehouse-page__info-value">
                                    {warehouse.contact.email}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
                  {/* <div className="warehouse-page__headers-outer"> */}
                  <div className="warehouse-page__headers">
                     {WAREHOUSE_PAGE_HEADERS.map((header, i) => (
                        <TableHeader
                           key={i}
                           header={header}
                           handleSort={this.handleSort}
                        />
                     ))}
                     {/* </div> */}
                  </div>
                  {isLoading ? (
                     <SkeletonTable
                        rows={6}
                        columns={5}
                        flexWeights={[1, 1, 1, 1, 0.5]}
                     />
                  ) : (
                     warehouse?.inventory.map((item) => (
                        <InventoryListItem
                           key={item.id}
                           itemObj={item}
                           toggleModal={this.toggleModal}
                           isWarehouseView
                        />
                     ))
                  )}
               </div>
            </div>
            <div
               className={
                  toDeleteId
                     ? "warehouse-page__delete"
                     : "warehouse-page__delete--hidden"
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

export default WarehousePage;
