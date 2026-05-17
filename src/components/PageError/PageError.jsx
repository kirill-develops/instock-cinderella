import React from "react";
import "./PageError.scss";

export default function PageError({ apiError }) {
   return apiError ? <p className="page-error">{apiError}</p> : null;
}
