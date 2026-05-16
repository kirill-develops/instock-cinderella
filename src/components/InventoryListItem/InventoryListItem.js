import React from "react";
import { Link } from "react-router-dom";

import DeleteIco from "../../assets/icons/delete_outline-24px.svg";
import EditIco from "../../assets/icons/edit-24px.svg";
import "./InventoryListItem.scss";

const InventoryList = ({ itemObj, handleDelete, isWarehouseView = false }) => {
   const { category, itemName, id, quantity, status, warehouseName } = itemObj;

   return (
      <div className="inventory-item">
         <div className="inventory-item__inner">
            <div className="inventory-item__block">
               <div className="inventory-item__label inventory-item__label--main">
                  <span className="inventory-item__label--txt">
                     INVENTORY ITEM
                  </span>
                  <Link
                     to={`/inventory/${id}`}
                     className="inventory-item__info--main-link"
                  >
                     <p className="inventory-item__info--main">
                        {itemName} &gt;
                     </p>
                  </Link>
               </div>
               <div className="inventory-item__label inventory-item__label--status">
                  <span className="inventory-item__label--txt">STATUS</span>
                  <p
                     className={`inventory-item__info 
            ${status.toLowerCase() === "out of stock" ? "inventory-item__info--out-stock" : "inventory-item__info--in-stock"}`}
                  >
                     {status.toUpperCase()}
                  </p>
               </div>
               <div className="inventory-item__label inventory-item__label--category">
                  <span className="inventory-item__label--txt">CATEGORY</span>
                  <p className="inventory-item__info">{category}</p>
               </div>
               <div className="inventory-item__label inventory-item__label--qty">
                  <span className="inventory-item__label--txt">QTY</span>
                  <p className="inventory-item__info">{quantity}</p>
               </div>
               {!isWarehouseView && (
                  <div className="inventory-item__label inventory-item__label--warehouse">
                     <span className="inventory-item__label--txt">
                        WAREHOUSE
                     </span>
                     <p className="inventory-item__info">{warehouseName}</p>
                  </div>
               )}
               <div className="inventory-item__actions-block">
                  <button
                     onClick={() => handleDelete(id, itemName)}
                     className="inventory-item__delete-btn"
                     aria-label={`Delete ${itemName}`}
                  >
                     <img
                        src={DeleteIco}
                        alt=""
                        className="inventory-item__icon--delete"
                     />
                  </button>
                  <Link
                     to={`/inventory/${id}/edit`}
                     className="inventory-item__link"
                     aria-label={`Edit ${itemName}`}
                  >
                     <img
                        src={EditIco}
                        alt=""
                        className="inventory-item__icon--edit"
                     />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default InventoryList;
