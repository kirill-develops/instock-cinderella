import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiUtils from "../../utils/apiUtils";
import { getRequestErrorMessage } from "../../utils/requestUtils";

import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import EditIco from "../../assets/icons/edit-24px-white.svg";
import "./ItemDetails.scss";

class ItemDetails extends Component {
   state = {
      item: null,
      apiError: "",
   };

   handleApiError = (error) => {
      this.setState({
         apiError: getRequestErrorMessage(
            error,
            "Error fetching inventory data. Please try reloading in a few moments.",
         ),
      });
   };

   componentDidMount() {
      // API GET REQ for specific inventory ID based on URL
      apiUtils
         .getInventoryById(this.props.match.params.id)
         .then((res) => {
            // After Validation, setState
            this.setState({ item: res.data, apiError: "" });
         })
         .catch((err) => {
            this.handleApiError(err);
         });
   }

   componentDidUpdate(prevProps) {
      // deconstruct current and previous params
      const { id: currentId } = this.props.match.params;
      const { id: prevId } = prevProps.match.params;

      // if ID's don't match, updates state of Item
      if (prevId !== currentId) {
         apiUtils
            .getInventoryById(this.props.match.params.id)
            .then((res) => {
               this.setState({
                  item: res.data,
                  apiError: "",
               });
            })
            .catch((err) => {
               this.handleApiError(err);
            });
      }
   }

   handleDelete = (id) => {};

   render() {
      // display during API GET req completed
      if (!this.state.item) {
         return <p>{this.state.apiError || "Loading..."}</p>;
      }

      const {
         description,
         category,
         itemName,
         warehouseName,
         quantity,
         status,
         id,
      } = this.state.item;

      return (
         <div className="item-details">
            <div className="item-details__inner">
               <div className="item-details__headline">
                  <div
                     className="item-details__button-back"
                     onClick={() => this.props.history.goBack()}
                  >
                     <img
                        src={ArrowBack}
                        alt="back button"
                     />
                  </div>
                  <h2 className="item-details__title">{itemName} </h2>
                  <Link
                     to={`/inventory/${id}/edit`}
                     className="item-details__button-edit"
                  >
                     <img
                        src={EditIco}
                        alt="edit button"
                        className="item-details__icon"
                     />
                     <span className="item-details__button-txt">Edit</span>
                  </Link>
               </div>
               {this.state.apiError ? (
                  <p className="item-details__info">{this.state.apiError}</p>
               ) : null}
               <div className="item-details__block">
                  <div className="item-details__highlights">
                     <label className="item-details__label--description">
                        ITEM DESCRIPTION:
                        <h3 className="item-details__info">{description} </h3>
                     </label>
                     <label className="item-details__label--category">
                        CATEGORY:
                        <h3 className="item-details__info">{category}</h3>
                     </label>
                  </div>
                  <div className="item-details__more-info">
                     <label className="item-details__label--status">
                        STATUS:
                        <h3
                           className={`item-details__info 
            ${status.toLowerCase() === "out of stock" ? "item-details__info--out-stock" : "item-details__info--in-stock"}`}
                        >
                           {status.toUpperCase()}
                        </h3>
                     </label>
                     <label className="item-details__label--qty">
                        QUANTITY:
                        <h3 className="item-details__info">{quantity}</h3>
                     </label>
                     <label className="item-details__label--warehouse">
                        WAREHOUSE:
                        <h3 className="item-details__info">{warehouseName}</h3>
                     </label>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default ItemDetails;
