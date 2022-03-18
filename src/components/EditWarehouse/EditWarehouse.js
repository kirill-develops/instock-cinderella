import React from "react";
import { Link } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import "../EditWarehouse/EditWarehouse.scss";

function EditWarehouse() {

    

  return (
    <div className="warehouse-edit">
      <div className="warehouse-edit__headline">
        <div className="warehouse-edit__title-housing">
          <h1 className="warehouse-edit__title">Edit Warehouse</h1>
        </div>
        <div className="warehouse-edit__subheader-housing">
        <h2 className="warehouse-edit__subheader">Warehosue Details</h2>
        </div>
        <form className="warehouse-edit__form">
          <div className="warehouse-edit__name-housing">
            <label className="warehouse-edit__input-label">
              Warehouse Name
            </label>
            <input
              type="name"
              name="name"
              placeholder="Warehouse Name Goes Here"
              className="warehouse-edit__field"
            />
          </div>
          <div className="warehouse-edit__name-housing">
            <label className="warehouse-edit__input-label">Street Address</label>
            <input
              type="name"
              name="city"
              placeholder="Address Goes Here"
              className="warehouse-edit__field"
            />
          </div>
          <div className="warehouse-edit__name-housing">
            <label className="warehouse-edit__input-label">City</label>
            <input
              type="name"
              name="city"
              placeholder="City Goes Here"
              className="warehouse-edit__field"
            />
          </div>
          <div className="warehouse-edit__name-housing">
            <label className="warehouse-edit__input-label">Country</label>
            <input
              type="name"
              name="city"
              placeholder="Country Goes Here"
              className="warehouse-edit__field"
            />
          </div>
          <div className="warehouse-edit__name-housing">
        <h2 className="warehouse-edit__subheader warehouse-edit__subheader--contact">Contact Details</h2>
            <label className="warehouse-edit__input-label">
              Contact Name
            </label>
            <input
              type="name"
              name="name"
              placeholder="Contact Name Goes Here"
              className="warehouse-edit__field"
            />
          </div>
          <div className="warehouse-edit__name-housing">
            <label className="warehouse-edit__input-label">Position</label>
            <input
              type="name"
              name="city"
              placeholder="Position Goes Here"
              className="warehouse-edit__field"
            />
          </div>
          <div className="warehouse-edit__name-housing">
            <label className="warehouse-edit__input-label">City</label>
            <input
              type="name"
              name="city"
              placeholder="Phone Goes Here"
              className="warehouse-edit__field"
            />
          </div>
          <div className="warehouse-edit__name-housing">
            <label className="warehouse-edit__input-label">Country</label>
            <input
              type="name"
              name="city"
              placeholder="Email Goes Here"
              className="warehouse-edit__field"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWarehouse;
