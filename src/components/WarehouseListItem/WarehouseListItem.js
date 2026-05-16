import React from "react";
import { Link } from "react-router-dom";

import DeleteIco from "../../assets/icons/delete_outline-24px.svg";
import EditIco from "../../assets/icons/edit-24px.svg";
import "./WarehouseListItem.scss";

const WarehouseListItem = ({ warehouseObj, handleDelete }) => {
   const {
      address,
      city,
      country,
      name: warehouseName,
      contact,
      id,
   } = warehouseObj;

   return (
      <div className="warehouse-item">
         <div className="warehouse-item__inner">
            <div className="warehouse-item__block">
               <div className="warehouse-item__label warehouse-item__label--main">
                  <span className="warehouse-item__label--txt">WAREHOUSE</span>
                  <Link
                     to={`/warehouses/${id}`}
                     className="warehouse-item__info--main-link"
                  >
                     <p className="warehouse-item__info--main">
                        {warehouseName} &gt;
                     </p>
                  </Link>
               </div>
               <div className="warehouse-item__label warehouse-item__label--contact">
                  <span className="warehouse-item__label--txt">
                     CONTACT NAME
                  </span>
                  <p className="warehouse-item__info">{contact.name}</p>
               </div>
               <div className="warehouse-item__label warehouse-item__label--addy">
                  <span className="warehouse-item__label--txt">ADDRESS</span>
                  <p className="warehouse-item__info">{address},</p>
                  <p className="warehouse-item__info">
                     {city}, {country}
                  </p>
               </div>
               <div className="warehouse-item__label warehouse-item__label--details">
                  <span className="warehouse-item__label--txt">
                     CONTACT INFORMATION
                  </span>
                  <p className="warehouse-item__info">{contact.phone}</p>
                  <p className="warehouse-item__info">{contact.email}</p>
               </div>
               <div className="warehouse-item__actions-block">
                  <button
                     onClick={() => handleDelete(id, warehouseName)}
                     className="warehouse-item__delete-btn"
                     aria-label={`Delete ${warehouseName}`}
                  >
                     <img
                        src={DeleteIco}
                        alt=""
                        className="warehouse-item__icon--delete"
                     />
                  </button>
                  <Link
                     to={`/warehouses/${id}/edit`}
                     className="warehouse-item__link"
                     aria-label={`Edit ${warehouseName}`}
                  >
                     <img
                        src={EditIco}
                        alt=""
                        className="warehouse-item__icon--edit"
                     />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default WarehouseListItem;
