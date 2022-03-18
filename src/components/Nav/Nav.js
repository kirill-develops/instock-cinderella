import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { Component } from 'react';
import instockLogo from "../../assets/logo/InStock-Logo_1x.png";

class Nav extends Component {

  // componentDidMount() {
  //     console.log(this.props)
  //     if (this.props.match.params === 'warehouse') {
  //         this.setState({
  //             activePage: 'warehouse'
  //         })
  //     } else {
  //         if (this.props.match.params === 'inventory') {
  //             this.setState({
  //                 activePage: 'inventory'
  //             })
  //         }
  //     }
  // }

  // isPageWarehouse = () => {
  //     if (this.state.activePage === 'warehouse') {
  //         return true; 
  //     }
  //    return false; 
  // }

  render() {
    // if (!this.state.activePage) {
    //     return <div>Loading... </div>;
    //   }
    return (
      <header className="nav__housing">
        <div className="nav">
          <NavLink to="/" className="nav__logo">
            <img className="nav__img" src={instockLogo} />
          </NavLink>
          <div className="nav__list">
            <NavLink to="/warehouses" className="nav__link" activeClassName="nav__link--active"> Warehouses
            </NavLink>
            <NavLink to="/inventory" className="nav__link" activeClassName="nav__link--active"> Inventory
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

export default Nav;
