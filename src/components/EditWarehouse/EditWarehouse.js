import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Component } from 'react';
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import "../EditWarehouse/EditWarehouse.scss";

const BASE_URL = "http://localhost:8080";

export class EditWarehouse extends Component {
  
// The state of this page should load the form fields with the warehouse info of the match.params.
state = {
  warehouse: null 
}

  componentDidMount() {

      axios
        .get(`${BASE_URL}/warehouses/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({
            warehouse: response.data,
          })
          console.log(this.state.warehouse)

  })
  }

    submitHandler = (event) => {

      // Enter validation before the put request

      return axios
        .put(`${BASE_URL}/warehouses/${this.props.match.params.id}`, {
          name: event.target.name.value, 
          address: event.target.address.value,
          city: event.target.city.value,
          country: event.target.country.value,
          contactName: event.target.contactName.value,
          position: event.target.position.value,
          phone: event.target.phone.value,
          email: event.target.email.value,
        })
      }

render () {

  if (!this.state.warehouse) {
   return <p>Loading...</p>
  }
  return (

    <div className="warehouse-edit">
      <div className="warehouse-edit__headline">
      {/* <Link to="/warehouses">
                <img className="warehouse-details__back" src={arrowBack} />
              </Link> */}
        <div className="warehouse-edit__title-housing">
          <h1 className="warehouse-edit__title">Edit Warehouse</h1>
        </div>
        <form onSubmit={this.submitHandler}className="warehouse-edit__form">
          <div className="warehouse-edit__card">
            <div className="warehouse-edit__subheader-housing">
              <h2 className="warehouse-edit__subheader">Warehouse Details</h2>
            </div>
            <div className="warehouse-edit__name-housing">
              <label className="warehouse-edit__input-label">
                Warehouse Name
              </label>
              <input
                type="name"
                name="name"
                defaultValue={this.state.warehouse.name}
                className="warehouse-edit__field"
              />
            </div>
            <div className="warehouse-edit__name-housing">
              <label className="warehouse-edit__input-label">
                Street Address
              </label>
              <input
                type="name"
                name="address"
                defaultValue={this.state.warehouse.address}
                className="warehouse-edit__field"
              />
            </div>
            <div className="warehouse-edit__name-housing">
              <label className="warehouse-edit__input-label">City</label>
              <input
                type="name"
                name="city"
                defaultValue={this.state.warehouse.city}
                className="warehouse-edit__field"
              />
            </div>
            <div className="warehouse-edit__name-housing warehouse-edit__name-housing--bumper">
              <label className="warehouse-edit__input-label">Country</label>
              <input
                type="name"
                name="country"
                defaultValue={this.state.warehouse.country}
                className="warehouse-edit__field"
              />
            </div>
          </div>
          <div className="warehouse-edit__card warehouse-edit__card--border">
            <div className="warehouse-edit__subheader-housing">
              <h2 className="warehouse-edit__subheader warehouse-edit__subheader--contact">
                Contact Details
              </h2>
                </div>
              <div className="warehouse-edit__name-housing">
                <label className="warehouse-edit__input-label">
                  Contact Name
                </label>
                <input
                  type="name"
                  name="name"
                  defaultValue={this.state.warehouse.contact.name}
                  className="warehouse-edit__field"
                />
              </div>
              <div className="warehouse-edit__name-housing">
                <label className="warehouse-edit__input-label">Position</label>
                <input
                  type="name"
                  name="position"
                  defaultValue={this.state.warehouse.contact.position}
                  className="warehouse-edit__field"
                />
              </div>
              <div className="warehouse-edit__name-housing">
                <label className="warehouse-edit__input-label">Phone Number</label>
                <input
                  type="name"
                  name="phone"
                  defaultValue={this.state.warehouse.contact.phone}
                  className="warehouse-edit__field"
                />
              </div>
              <div className="warehouse-edit__name-housing warehouse-edit__name-housing--bumper">
                <label className="warehouse-edit__input-label">Email</label>
                <input
                  type="name"
                  name="email"
                  defaultValue={this.state.warehouse.contact.email}
                  className="warehouse-edit__field"
                />
              </div>
          </div>
                  <div className="warehouse-edit__buttons warehouse-edit__buttons--mobile">
                      <Link
                      className="warehouse-edit__cancel"
                      to="/warehouse:id">Cancel
                      </Link>
                    <button className="warehouse-edit__save">Save</button>
                  </div>
        </form>
      </div>
    </div>
  );
}
}

export default EditWarehouse;
