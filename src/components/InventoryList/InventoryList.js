import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiUtils from "../../utils/apiUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";

import TableHeader from "../TableHeader/TableHeader";
import InventoryListItem from "../InventoryListItem/InventoryListItem";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./InventoryList.scss";

class InventoryList extends Component {
   state = {
      inventoryArr: [],
      toDeleteId: "",
      toDeleteName: "",
      apiError: "",
      sortConfig: {
         key: "",
         isAscending: true,
      },
   };

   handleApiError = (error) => {
      this.setState({
         apiError: getRequestErrorMessage(
            error,
            "Error fetching inventory data. Please try again.",
         ),
      });
   };

   componentDidMount() {
      apiUtils
         .getAllInventory()
         .then((res) => {
            this.setState({ inventoryArr: res.data, apiError: "" });
         })
         .catch((err) => {
            this.handleApiError(err);
         });
   }

   componentDidUpdate(prevProps) {
      // deconstruct current and previous params
      const { id: currentId } = this.props.match.params;
      const { id: prevId } = prevProps.match.params;

      // if ID's don't match, updates state of inventoryArr
      if (prevId !== currentId) {
         apiUtils
            .getAllInventory()
            .then((res) => {
               this.setState({
                  inventoryArr: res.data,
                  apiError: "",
               });
            })
            .catch((err) => {
               this.handleApiError(err);
            });
      }
   }

   handleDelete = (id, itemName) => {
      this.setState({ toDeleteId: id, toDeleteName: itemName });
   };

   resetDelete = () => {
      this.setState({ toDeleteId: "", toDeleteName: "" });
   };

   handleConfirm = (id) => {
      apiUtils
         .deleteInventory(id)
         .then(() => {
            apiUtils
               .getAllInventory()
               .then((res) => {
                  this.setState({
                     inventoryArr: res.data,
                     toDeleteId: "",
                     apiError: "",
                  });
               })
               .catch((err) => {
                  this.handleApiError(err);
               });
         })
         .catch((err) => {
            this.handleApiError(err);
         });
   };

   handleSort = (header) => {
      if (!header.key) {
         return;
      }

      this.setState((prevState) => {
         const isSameKey = prevState.sortConfig.key === header.key;
         const isAscending = isSameKey
            ? !prevState.sortConfig.isAscending
            : true;

         const sortedInventoryArr = [...prevState.inventoryArr].sort((a, b) => {
            const aValue = String(a[header.key]).toLowerCase();
            const bValue = String(b[header.key]).toLowerCase();

            if (aValue < bValue) {
               return isAscending ? -1 : 1;
            }
            if (aValue > bValue) {
               return isAscending ? 1 : -1;
            }
            return 0;
         });

         return {
            inventoryArr: sortedInventoryArr,
            sortConfig: {
               key: header.key,
               isAscending: isAscending,
            },
         };
      });
   };

   render() {
      const { inventoryArr } = this.state;
      const headers = [
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
            name: "QTY",
            flex: 0.6,
            key: "quantity",
         },
         {
            name: "WAREHOUSE",
            flex: 0.8,
            key: "warehouseName",
         },
         { name: "ACTIONS", flex: 0.5 },
      ];

      return (
         <div className="inventory-list">
            <div className="inventory-list__inner">
               <div className="inventory-list__headline">
                  <h1 className="inventory-list__title">Inventory</h1>
                  <form className="inventory-list__form">
                     <div className="inventory-list__search-housing">
                        <input
                           type="search"
                           name="search"
                           placeholder="Search..."
                           className="inventory-list__search"
                        />
                     </div>
                     <div className="inventory-list__cta-housing">
                        <Link
                           to="/inventory/add/"
                           className="inventory-list__cta"
                        >
                           <span className="inventory-list__cta-text">
                              Add New Item
                           </span>
                        </Link>
                     </div>
                  </form>
               </div>
               {this.state.apiError ? (
                  <p className="inventory-list__title">{this.state.apiError}</p>
               ) : null}
               <div className="inventory-list__headers">
                  {headers.map((header, i) => (
                     <TableHeader
                        key={i}
                        header={header}
                        handleSort={this.handleSort}
                     />
                  ))}
               </div>

               {inventoryArr.map((itemObj) => (
                  <InventoryListItem
                     key={itemObj.id}
                     itemObj={itemObj}
                     handleDelete={this.handleDelete}
                  />
               ))}
            </div>
            <div
               className={
                  this.state.toDeleteId
                     ? "inventory-list__delete"
                     : "inventory-list__delete--hidden"
               }
            >
               <DeleteModal
                  toDeleteId={this.state.toDeleteId}
                  toDeleteName={this.state.toDeleteName}
                  toDeleteType="inventory item"
                  handleCancel={this.resetDelete}
                  handleConfirm={this.handleConfirm}
                  closingStatement={"from the inventory list"}
               />
            </div>
         </div>
      );
   }
}

export default InventoryList;
