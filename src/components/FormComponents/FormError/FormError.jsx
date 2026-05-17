import React from "react";
import errorIcon from "../../../assets/icons/error-24px.svg";
import "./FormError.scss";

const FormError = ({ isValid, errorMessage }) =>
   isValid === false && (
      <div className="form-error">
         <img
            className="form-error__icon"
            src={errorIcon}
            alt=""
         />
         <p className="form-error__text">{errorMessage}</p>
      </div>
   );

export default FormError;
