import React from "react";
import ListRow from "../ListRow";
import "./WarehouseListItem.scss";

function WarehouseItem({ warehouseObj, onDelete }) {
   const { address, city, country, name, contact, id } = warehouseObj;

   return (
      <ListRow
         id={id}
         primaryLabel="WAREHOUSE"
         variant="warehouse"
         primaryText={name}
         detailRoute={`/warehouses/${id}`}
         editRoute={`/warehouses/${id}/edit`}
         deleteName={name}
         onDelete={onDelete}
      >
         <div className="list-row__label warehouse-item__label--addy">
            <span className="list-row__label--txt">ADDRESS</span>
            <p className="list-row__info">{address},</p>
            <p className="list-row__info">
               {city}, {country}
            </p>
         </div>
         <div className="list-row__label warehouse-item__label--contact">
            <span className="list-row__label--txt">CONTACT NAME</span>
            <p className="list-row__info">{contact.name}</p>
         </div>
         <div className="list-row__label warehouse-item__label--details">
            <span className="list-row__label--txt">CONTACT INFORMATION</span>
            <p className="list-row__info">{contact.phone}</p>
            <p className="list-row__info">{contact.email}</p>
         </div>
      </ListRow>
   );
}

export default WarehouseItem;
