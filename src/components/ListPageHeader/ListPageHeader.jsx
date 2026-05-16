import { Link } from "react-router-dom";
import "./ListPageHeader.scss";

const ListPageHeader = ({ title, ctaRoute, ctaText }) => (
   <div className="list-header">
      <h1 className="list-header__title">{title}</h1>
      <div className="list-header__actions">
         <div className="list-header__search-housing">
            <input
               type="search"
               name="search"
               placeholder="Search..."
               className="list-header__search"
            />
         </div>
         <div className="list-header__cta-housing">
            <Link
               to={ctaRoute}
               className="list-header__cta"
            >
               <span className="list-header__cta-text">{ctaText}</span>
            </Link>
         </div>
      </div>
   </div>
);

export default ListPageHeader;
