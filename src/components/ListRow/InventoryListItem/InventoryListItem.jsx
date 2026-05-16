import React from "react";
import ListRow from "../ListRow";
import "./InventoryListItem.scss";

export default function InventoryItem({
   itemObj,
   onDelete,
   isWarehouseView = false,
}) {
   const { category, itemName, id, quantity, status, warehouseName } = itemObj;

   return (
      <ListRow
         id={id}
         primaryLabel="INVENTORY ITEM"
         variant="inventory"
         primaryText={itemName}
         detailRoute={`/inventory/${id}`}
         editRoute={`/inventory/${id}/edit`}
         deleteName={itemName}
         onDelete={onDelete}
      >
         <div className="list-row__label list-row__label--status">
            <span className="list-row__label--txt">STATUS</span>
            <p
               className={`list-row__info ${status.toLowerCase() === "out of stock" ? "list-row__info--out-stock" : "list-row__info--in-stock"}`}
            >
               {status.toUpperCase()}
            </p>
         </div>
         <div className="list-row__label list-row__label--category">
            <span className="list-row__label--txt">CATEGORY</span>
            <p className="list-row__info">{category}</p>
         </div>
         <div className="list-row__label list-row__label--qty">
            <span className="list-row__label--txt">QTY</span>
            <p className="list-row__info">{quantity}</p>
         </div>
         {!isWarehouseView && (
            <div className="list-row__label list-row__label--warehouse">
               <span className="list-row__label--txt">WAREHOUSE</span>
               <p className="list-row__info">{warehouseName}</p>
            </div>
         )}
      </ListRow>
   );
}
