import React from "react";
import "./Error.scss";

export default function Error({ apiError }) {
   return apiError && <p className="page-error">{apiError}</p>;
}
