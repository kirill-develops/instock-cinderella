import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiUtils from "../../utils/apiUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";

import TableHeader from "../TableHeader/TableHeader";
import WarehouseListItem from "../WarehouseListItem/WarehouseListItem";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./WarehouseList.scss";

class WarehouseList extends Component {
   state = {
      warehouseArr: [],
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
            "Error fetching warehouse data. Please try again.",
         ),
      });
   };

   componentDidMount() {
      apiUtils
         .getAllWarehouses()
         .then((res) => {
            this.setState({ warehouseArr: res.data, apiError: "" });
         })
         .catch((err) => {
            this.handleApiError(err);
         });
   }

   componentDidUpdate(prevProps) {
      // deconstruct current and previous params
      const { id: currentId } = this.props.match.params;
      const { id: prevId } = prevProps.match.params;

      // if ID's don't match, updates state of warehouseArr
      if (prevId !== currentId) {
         apiUtils
            .getAllWarehouses()
            .then((res) => {
               this.setState({
                  warehouseArr: res.data,
                  apiError: "",
               });
            })
            .catch((err) => {
               this.handleApiError(err);
            });
      }
   }

   handleDelete = (id, warehouseName) => {
      this.setState({ toDeleteId: id, toDeleteName: warehouseName });
   };

   resetDelete = () => {
      this.setState({ toDeleteId: "", toDeleteName: "" });
   };

   handleConfirm = (id) => {
      apiUtils
         .deleteWarehouse(id)
         .then((res) => {
            apiUtils
               .getAllWarehouses()
               .then((res) => {
                  this.setState({ warehouseArr: res.data });
                  this.resetDelete();
               })
               .catch((err) => {
                  this.handleApiError(err);
               });
         })
         .catch((err) => {
            this.handleApiError(err);
         });
   };

   getSortableValue = (warehouseObj, key) => {
      if (key === "contact.name") {
         return warehouseObj.contact && warehouseObj.contact.name
            ? warehouseObj.contact.name
            : "";
      }

      if (key === "contact.email") {
         return warehouseObj.contact && warehouseObj.contact.email
            ? warehouseObj.contact.email
            : "";
      }

      return warehouseObj[key] || "";
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

         const sortedWarehouseArr = [...prevState.warehouseArr].sort((a, b) => {
            const aValue = String(
               this.getSortableValue(a, header.key),
            ).toLowerCase();
            const bValue = String(
               this.getSortableValue(b, header.key),
            ).toLowerCase();

            if (aValue < bValue) {
               return isAscending ? -1 : 1;
            }
            if (aValue > bValue) {
               return isAscending ? 1 : -1;
            }
            return 0;
         });

         return {
            warehouseArr: sortedWarehouseArr,
            sortConfig: {
               key: header.key,
               isAscending: isAscending,
            },
         };
      });
   };

   render() {
      const { warehouseArr: warehouses } = this.state;
      const headers = [
         {
            name: "WAREHOUSE",
            flex: 0.8,
            key: "name",
         },
         {
            name: "ADDRESS",
            flex: 1,
            key: "address",
         },
         {
            name: "CONTACT NAME",
            flex: 0.9,
            key: "contact.name",
         },
         {
            name: "CONTACT INFORMATION",
            flex: 1.1,
            key: "contact.email",
         },
         { name: "ACTIONS", flex: 0.5 },
      ];

      return (
         <>
            <div className="warehouse-list">
               <div className="warehouse-list__inner">
                  <div className="warehouse-list__headline">
                     <h1 className="warehouse-list__title">Warehouses</h1>
                     <form className="warehouse-list__form">
                        <div className="warehouse-list__search-housing">
                           <input
                              type="search"
                              name="search"
                              placeholder="Search..."
                              className="warehouse-list__search"
                           />
                        </div>
                        <div className="warehouse-list__cta-housing">
                           <Link
                              to="/warehouses/add"
                              className="warehouse-list__cta"
                           >
                              <span className="warehouse-list__cta-text">
                                 Add New Warehouse
                              </span>
                           </Link>
                        </div>
                     </form>
                  </div>
                  {this.state.apiError ? (
                     <p className="warehouse-list__title">
                        {this.state.apiError}
                     </p>
                  ) : null}
                  <div className="warehouse-list__headers">
                     {headers.map((header, i) => (
                        <TableHeader
                           key={i}
                           header={header}
                           handleSort={this.handleSort}
                        />
                     ))}
                  </div>
                  <div className="warehouse-list__table">
                     {warehouses.map((warehouseObj) => (
                        <WarehouseListItem
                           key={warehouseObj.id}
                           warehouseObj={warehouseObj}
                           handleDelete={this.handleDelete}
                        />
                     ))}
                  </div>
               </div>
            </div>
            <div
               className={
                  this.state.toDeleteId
                     ? "warehouse-list__delete"
                     : "warehouse-list__delete--hidden"
               }
            >
               <DeleteModal
                  toDeleteId={this.state.toDeleteId}
                  toDeleteName={this.state.toDeleteName}
                  toDeleteType="warehouse"
                  handleCancel={this.resetDelete}
                  handleConfirm={this.handleConfirm}
                  closingStatement={"from the list of warehouses"}
               />
            </div>
         </>
      );
   }
}

export default WarehouseList;
