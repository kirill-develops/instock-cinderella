import React from "react";
import "./WarehouseDetails.scss";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

class WarehouseDetails extends Component {
  state = {
    activeWarehouse: null,
  };

  render() {
    return (
      <>
        <div className="warehouse__header">
          <NavLink>
            <img className="warehouse__back" src={arrowBack} />
          </NavLink>
          <h1 className="warehouse__title">King West</h1>
          <NavLink>
            <img className="warehouse__edit" src={editIcon} />
          </NavLink>
        </div>
        <div className="warehouse__details">
          <div className="warehouse__subheader">
            <h4 className="warehouse__address">WAREHOUSE ADDRESS</h4>
            <p className="warehouse__street">469 King Street West,</p>
            <p className="warehouse__city">Toronto, CAN</p>
          </div>
          <div className="warehouse__subheader">
            <h4 className="warehouse__name">CONTACT NAME:</h4>
            <p className="warehouse__position">Graeme Lyon</p>
            <p className="warehouse__city">Warehouse Manager</p>
          </div>
          <div className="warehouse__subheader">
            <h4 className="warehouse__info">CONTACT INFORMATION:</h4>
            <p className="warehouse__phone">+1(647) 509-0911</p>
            <p className="warehouse__email">glyon@instock.com</p>
          </div>
        </div>
      </>
    );
  }
}

export default WarehouseDetails;