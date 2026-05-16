import React from "react";
import apiUtils from "../utils/apiUtils";
import "../components/ItemDetails/ItemDetails.scss";
import QueryPageBase from "../utils/QueryPageBase";
import PageHeader from "../components/PageHeader/PageHeader";

class InventoryItemPage extends QueryPageBase {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         item: null,
         apiError: "",
      };
   }

   fetchData = (id) => apiUtils.getInventoryById(id).then((r) => r.data);
   setData = (item) => ({ item });

   render() {
      // display during API GET req completed
      if (!this.state.item) {
         return <p>{this.state.apiError || "Loading..."}</p>;
      }

      const {
         item: {
            id,
            description,
            category,
            itemName,
            warehouseName,
            quantity,
            status,
         },
         apiError,
      } = this.state;

      return (
         <div className="item-details">
            <div className="item-details__inner">
               <PageHeader
                  title={itemName}
                  onBack={() => this.props.history.goBack()}
                  editRoute={`/inventory/${id}/edit`}
               />
               {apiError ? (
                  <p className="item-details__info">{apiError}</p>
               ) : null}
               <div className="item-details__block">
                  <div className="item-details__highlights">
                     <div className="item-details__label--description">
                        ITEM DESCRIPTION:
                        <h3 className="item-details__info">{description} </h3>
                     </div>
                     <div className="item-details__label--category">
                        CATEGORY:
                        <h3 className="item-details__info">{category}</h3>
                     </div>
                  </div>
                  <div className="item-details__more-info">
                     <div className="item-details__label--status">
                        STATUS:
                        <h3
                           className={`item-details__info 
            ${status.toLowerCase() === "out of stock" ? "item-details__info--out-stock" : "item-details__info--in-stock"}`}
                        >
                           {status.toUpperCase()}
                        </h3>
                     </div>
                     <div className="item-details__label--qty">
                        QUANTITY:
                        <h3 className="item-details__info">{quantity}</h3>
                     </div>
                     <div className="item-details__label--warehouse">
                        WAREHOUSE:
                        <h3 className="item-details__info">{warehouseName}</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default InventoryItemPage;
