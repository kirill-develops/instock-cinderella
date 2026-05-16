import React from "react";
import "./PageLayout.scss";

export default function PageLayout({ children }) {
   return (
      <div className="page-layout">
         <div className="page-layout__inner">{children}</div>
      </div>
   );
}
