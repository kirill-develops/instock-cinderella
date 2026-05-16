// src/components/PageHeader/PageHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import EditIco from "../../assets/icons/edit-24px-white.svg";
import "./PageHeader.scss";

const PageHeader = ({ title, onBack, editRoute }) => (
   <div className="page-header">
      <button
         className="page-header__back-btn"
         onClick={onBack}
         aria-label="Go back"
      >
         <img
            src={ArrowBack}
            alt=""
         />
      </button>
      <h1 className="page-header__title">{title}</h1>
      {editRoute && (
         <Link
            to={editRoute}
            className="page-header__edit-btn"
         >
            <img
               src={EditIco}
               alt=""
               className="page-header__edit-icon"
            />
            <span className="page-header__edit-label">Edit</span>
         </Link>
      )}
   </div>
);

export default PageHeader;
