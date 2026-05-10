import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiUtils from "../../utils/apiUtils";

import TableHeader from "../TableHeader/TableHeader";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px-white.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./WarehouseDetails.scss";
import { getRequestErrorMessage } from "../../utils/requestUtils";

class WarehouseDetails extends Component {
   state = {
      warehouse: null,
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
            "Error fetching warehouse data. Please try reloading in a few moments.",
         ),
      });
   };

   componentDidMount() {
      apiUtils
         .getWarehouseById(this.props.match.params.id)
         .then((res) => {
            this.setState({
               warehouse: res.data,
               apiError: "",
            });
         })
         .catch((err) => {
            this.handleApiError(err);
         });
   }

   componentDidUpdate(prevProps) {
      // deconstruct current and previous params
      const { id: currentId } = this.props.match.params;
      const { id: prevId } = prevProps.match.params;

      // if ID's don't match, updates state of Warehouse
      if (prevId !== currentId) {
         apiUtils
            .getWarehouseById(this.props.match.params.id)
            .then((res) => {
               this.setState({
                  warehouse: res.data,
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
               .getWarehouseById(this.props.match.params.id)
               .then((res) => {
                  this.setState({
                     warehouse: res.data,
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

         const sortedInventoryArr = [...prevState.warehouse.inventory].sort(
            (a, b) => {
               const aValue = String(a[header.key]).toLowerCase();
               const bValue = String(b[header.key]).toLowerCase();

               if (aValue < bValue) {
                  return isAscending ? -1 : 1;
               }
               if (aValue > bValue) {
                  return isAscending ? 1 : -1;
               }
               return 0;
            },
         );

         return {
            warehouse: {
               ...prevState.warehouse,
               inventory: sortedInventoryArr,
            },
            sortConfig: {
               key: header.key,
               isAscending: isAscending,
            },
         };
      });
   };

   render() {
      const { warehouse } = this.state;

      if (!warehouse) {
         return <p>Loading...</p>;
      }

      const { inventory } = warehouse;

      const headers = [
         {
            name: "INVENTORY ITEM",
            flex: 1,
            key: "itemName",
         },
         {
            name: "CATEGORY",
            flex: 1,
            key: "category",
         },
         {
            name: "STATUS",
            flex: 1,
            key: "status",
         },
         {
            name: "QUANTITY",
            flex: 1,
            key: "quantity",
         },
         { name: "ACTIONS", flex: 0.5 },
      ];

      return (
         <>
            <div className="warehouse-details">
               <div className="warehouse-details__inner">
                  <div className="warehouse-details__top">
                     <div className="warehouse-details__header">
                        <img
                           className="warehouse-details__back"
                           src={arrowBack}
                           alt="Back arrow"
                           onClick={() => this.props.history.goBack()}
                        />
                        <h1 className="warehouse-details__title">
                           {warehouse.name}
                        </h1>
                        <Link to={`/warehouses/${warehouse.id}/edit`}>
                           <div className="warehouse-details__edit">
                              <img
                                 className="warehouse-details__icon"
                                 src={editIcon}
                                 alt="Edit warehouse"
                              />
                              <p className="warehouse-details__label">Edit</p>
                           </div>
                        </Link>
                     </div>
                     {this.state.apiError ? (
                        <p className="warehouse-details__detail">
                           {this.state.apiError}
                        </p>
                     ) : null}
                     <div className="warehouse-details__backing">
                        <div className="warehouse-details__information">
                           <div className="warehouse-details__address">
                              <div className="warehouse-details__details warehouse-details__details--mobile">
                                 <h4 className="warehouse-details__subheader">
                                    WAREHOUSE ADDRESS:
                                 </h4>
                                 <p className="warehouse-details__detail">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</p>
                              </div>
                              <div className=" warehouse-details__details warehouse-details__details--tablet">
                                 <h4 className="warehouse-details__subheader">
                                    WAREHOUSE ADDRESS:
                                 </h4>
                                 <p className="warehouse-details__detail">{`${warehouse.address},`}</p>
                                 <p className="warehouse-details__detail">{`${warehouse.city}, ${warehouse.country}`}</p>
                              </div>
                           </div>
                           <div className="warehouse-details__contact">
                              <div className="warehouse-details__details">
                                 <h4 className="warehouse-details__subheader">
                                    CONTACT NAME:
                                 </h4>
                                 <p className="warehouse-details__detail">
                                    {warehouse.contact.name}
                                 </p>
                                 <p className="warehouse-details__detail">
                                    {warehouse.contact.position}
                                 </p>
                              </div>
                              <div className="warehouse-details__details warehouse-details__details--padded">
                                 <h4 className="warehouse-details__subheader">
                                    CONTACT INFORMATION:
                                 </h4>
                                 <p className="warehouse-details__detail">
                                    {warehouse.contact.phone}
                                 </p>
                                 <p className="warehouse-details__detail">
                                    {warehouse.contact.email}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="warehouse-details__headers-outer">
                        <div className="warehouse-details__headers-inner">
                           {headers.map((header, i) => (
                              <TableHeader
                                 key={i}
                                 header={header}
                                 handleSort={this.handleSort}
                              />
                           ))}
                        </div>
                     </div>
                     {inventory.map((item) => (
                        <WarehouseItem
                           key={item.id}
                           itemObj={item}
                           handleDelete={this.handleDelete}
                        />
                     ))}
                  </div>
               </div>
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
         </>
      );
   }
}

export default WarehouseDetails;
