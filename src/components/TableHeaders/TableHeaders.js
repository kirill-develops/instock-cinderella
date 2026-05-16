import React from "react";
import SortIco from "../../assets/icons/sort-24px.svg";
import "./TableHeaders.scss";

const TableHeaders = ({ headers, handleSort }) => {
   return (
      <div className="header-wrapper">
         {headers.map((header, i) => (
            <div
               key={header.key}
               className="header"
               style={{ flex: `${header.flex} 1 0` }}
            >
               <>
                  <h3 className="header__label">{header.name}</h3>
                  <img
                     onClick={() => handleSort(header)}
                     src={SortIco}
                     alt="sort icon"
                     className="header__icon"
                  />
               </>
            </div>
         ))}
      </div>
   );
};

export default TableHeaders;
