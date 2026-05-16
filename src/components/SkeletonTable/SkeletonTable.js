import React from "react";

import "./SkeletonTable.scss";

function SkeletonTable({ rows = 6, columns = 5, flexWeights = [] }) {
   return (
      <div className="skeleton-table">
         {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
               key={rowIndex}
               className="skeleton-table__row"
            >
               {Array.from({ length: columns }).map((_, colIndex) => (
                  <div
                     key={colIndex}
                     className="skeleton-table__cell"
                     style={
                        flexWeights[colIndex]
                           ? { flex: `${flexWeights[colIndex]} 1 0` }
                           : { flex: "1 1 0" }
                     }
                  />
               ))}
            </div>
         ))}
      </div>
   );
}

export default SkeletonTable;
