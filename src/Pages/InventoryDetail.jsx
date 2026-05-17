import React from "react";
import apiUtils from "../utils/apiUtils";
import QueryPageBase from "../utils/QueryPageBase";
import PageHeader from "../components/PageHeader/PageHeader";
import "../styles/Pages.scss";
import SkeletonView from "../components/SkeletonView/SkeletonView";
import PageError from "../components/PageError/PageError";

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
      if (this.state.isLoading) return <SkeletonView variant="detail" />;

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
         <>
            <PageHeader
               title={itemName}
               onBack={() => this.props.history.goBack()}
               editRoute={`/inventory/${id}/edit`}
            />
            <PageError error={apiError} />
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
         </>
      );
   }
}

export default InventoryItemPage;
