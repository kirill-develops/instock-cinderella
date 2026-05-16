// src/components/ListRow/ListRow.jsx
import React from "react";
import { Link } from "react-router-dom";
import DeleteIco from "../../assets/icons/delete_outline-24px.svg";
import EditIco from "../../assets/icons/edit-24px.svg";
import "./ListRow.scss";
import { act } from "react";

const ListRow = ({
   id,
   primaryLabel,
   variant,
   primaryText,
   detailRoute,
   editRoute,
   deleteName,
   onDelete,
   children,
}) => {
   return (
      <div className="list-row">
         <div className="list-row__inner">
            <div className="list-row__block">
               <div
                  className={`list-row__label list-row__label--main-${variant}`}
               >
                  <span className="list-row__label--txt">{primaryLabel}</span>
                  <Link
                     to={detailRoute}
                     className="list-row__info--main-link"
                  >
                     <p className="list-row__info--main">{primaryText} &gt;</p>
                  </Link>
               </div>

               {children}

               <div
                  className={`list-row__actions-block list-row__actions-block-${variant}`}
               >
                  <button
                     onClick={() => onDelete(id, deleteName)}
                     className="list-row__delete-btn"
                     aria-label={`Delete ${deleteName}`}
                  >
                     <img
                        src={DeleteIco}
                        alt=""
                        className="list-row__icon--delete"
                     />
                  </button>
                  <Link
                     to={editRoute}
                     className="list-row__link"
                     aria-label={`Edit ${deleteName}`}
                  >
                     <img
                        src={EditIco}
                        alt=""
                        className="list-row__icon--edit"
                     />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ListRow;
