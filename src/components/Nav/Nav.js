import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { Component } from 'react';
import instockLogo from "../../assets/logo/InStock-Logo_1x.png";

class Nav extends Component {

    state = {
        activePage: 'inventory',
    }


    // ComponenetDidMount() {
    
    // }
    isPageWarehouse = () => {
        if (this.state.activePage === 'warehouse') {
            return true; 
        }
       return false; 
    }

   render () {
       return (
         <header className="nav">
           <NavLink to="/" className="nav__logo">
             <img className="nav__img" src={instockLogo} />
           </NavLink>
           <div className="nav__list">
             <NavLink to="/warehouses" className={this.isPageWarehouse() ? 'nav__link nav__link--active' : 'nav__link'
             }> Warehouses
             </NavLink>
             <NavLink to="/inventory" className={!this.isPageWarehouse() ? 'nav__link nav__link--active' : 'nav__link'
             }> Inventory
             </NavLink>
           </div>
         </header>
       );
     }
   } 

export default Nav;
