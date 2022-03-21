import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import "../EditWarehouse/EditWarehouse.scss";
import validator from "validator";
import isEmail from "validator/lib/isEmail";

const BASE_URL = "http://localhost:8080";

export class EditWarehouse extends Component {
  // The state of this page should load the form fields with the warehouse info of the match.params.

  state = {
    warehouse: null,
    name: "",
    address: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phone: "",
    email: "",
  };

  componentDidMount() {
    axios
      .get(`${BASE_URL}/warehouses/${this.props.match.params.id}`)
      .then((response) => {
        const { name, address, city, country, contact } = response.data;

        this.setState({
          warehouse: response.data,
          name: name,
          address: address,
          city: city,
          country: country,
          contactName: contact.name,
          position: contact.position,
          phone: contact.phone,
          email: contact.email,
        });
      });
  }

  // Create logic for a valid WAREHOUSE NAME
  isNameValid = () => {
    if (this.state.name.length < 3) {
      return false;
    }
    return true;
  };

  // Create logic for a valid ADDRESS
  isAddressValid = () => {
    if (this.state.address.length < 5) {
      return false;
    }
    return true;
  };

  // Create logic for a valid CITY
  isCityValid() {
    if (this.state.city.length < 5) {
      return false;
    }
    return true;
  }

  // Create logic for a valid COUNTRY
  isCountryValid = () => {
    if (this.state.country.length < 3) {
      return false;
    }
    return true;
  };

  // Create logic for a valid CONTACT
  isContactNameValid = () => {
    if (this.state.contactName.length < 5) {
      return false;
    }
    return true;
  };

  // Create logic for a valid POSITION
  isPositionValid = () => {
    if (this.state.position.length < 5) {
      return false;
    }
    return true;
  };

  // Create logic for a valid PHONE
  isPhoneValid = () => {
    const options = { StrictMode: true };
    return validator.isMobilePhone(this.state.phone, ["en-CA"], options);
  };

  // Create logic for a valid EMAIL
  isEmailValid = () => {
    const options = { StrictMode: true };
    return validator.isEmail(this.state.email, ["en-CA"], options
);

  };

  submitHandler = (event) => {
    event.preventDefault();
    // Enter validation before the put request

    const isFormValid = () => {
      if (
        this.isNameValid() &&
        this.isAddressValid() &&
        this.isCityValid() &&
        this.isCountryValid() &&
        this.isContactNameValid() &&
        this.isPositionValid() &&
        this.isPhoneValid() &&
        this.isEmailValid()
      ) {
        return true;
      } else {
        return false;
      }
    };

    if (isFormValid()) {      
      return axios
        .put(`${BASE_URL}/warehouses/${this.props.match.params.id}/edit`, {
          name: event.target.name.value,
          address: event.target.address.value,
          city: event.target.city.value,
          country: event.target.country.value,
          contactName: event.target.contactName.value,
          position: event.target.position.value,
          phone: event.target.phone.value,
          email: event.target.email.value,
        })
        .then(
          this.props.history.push(`/warehouses/${this.props.match.params.id}`)
        );
    } else {
      alert("Please fill out all form fields");
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (!this.state.warehouse) {
      return <p>Loading...</p>;
    }
    return (
      <div className="warehouse-edit">
        <div className="warehouse-edit__outer">
          <div className="warehouse-edit__inner">
            <div className="warehouse-edit__headline">
              <div className="warehouse-edit__box">
                  <img onClick={() => this.props.history.goBack()} className="warehouse-edit__back" src={arrowBack} />
                <div className="warehouse-edit__title-housing">
                  <h1 className="warehouse-edit__title">Edit Warehouse</h1>
                </div>
              </div>
              <form
                onSubmit={this.submitHandler}
                className="warehouse-edit__form"
              >
                <div className="warehouse-edit__card">
                  <div className="warehouse-edit__subheader-housing">
                    <h2 className="warehouse-edit__subheader">
                      Warehouse Details
                    </h2>
                  </div>
                  <div className="warehouse-edit__name-housing">
                    <label className="warehouse-edit__input-label">
                      Warehouse Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.name}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isNameValid() ? "" : "warehouse-edit__field--error"
                      }`}
                    />
                  </div>
                  {!this.isNameValid() ? (
                    <div className="warehouse-edit__alert">
                      <img
                        className="warehouse-edit__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="warehouse-edit__required">
                        This field is required
                      </p>
                    </div>
                  ) : null}
                  <div className="warehouse-edit__name-housing">
                    <label className="warehouse-edit__input-label">
                      Street Address
                    </label>
                    <input
                      type="name"
                      name="address"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.address}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isAddressValid()
                          ? ""
                          : "warehouse-edit__field--error"
                      }`}
                    />
                  </div>
                  {!this.isAddressValid() ? (
                    <div className="warehouse-edit__alert">
                      <img
                        className="warehouse-edit__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="warehouse-edit__required">
                        This field is required
                      </p>
                    </div>
                  ) : null}
                  <div className="warehouse-edit__name-housing">
                    <label className="warehouse-edit__input-label">City</label>
                    <input
                      type="name"
                      name="city"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.city}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isCityValid() ? "" : "warehouse-edit__field--error"
                      }`}
                    />
                  </div>
                  {!this.isCityValid() ? (
                    <div className="warehouse-edit__alert">
                      <img
                        className="warehouse-edit__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="warehouse-edit__required">
                        This field is required
                      </p>
                    </div>
                  ) : null}
                  <div className="warehouse-edit__name-housing warehouse-edit__name-housing--bumper">
                    <label className="warehouse-edit__input-label">
                      Country
                    </label>
                    <input
                      type="name"
                      name="country"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.country}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isCountryValid()
                          ? ""
                          : "warehouse-edit__field--error"
                      }`}
                    />
                    {!this.isCountryValid() ? (
                      <div className="warehouse-edit__alert warehouse-edit__alert--adjustment">
                        <img
                          className="warehouse-edit__bang"
                          src={errorIcon}
                          alt="error exlaimation sign"
                        />
                        <p className="warehouse-edit__required">
                          This field is required
                        </p>
                      </div>
                    ) : null}
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
                      name="contactName"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.contact.name}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isContactNameValid()
                          ? ""
                          : "warehouse-edit__field--error"
                      }`}
                    />
                  </div>
                  {!this.isContactNameValid() ? (
                    <div className="warehouse-edit__alert">
                      <img
                        className="warehouse-edit__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="warehouse-edit__required">
                        This field is required
                      </p>
                    </div>
                  ) : null}
                  <div className="warehouse-edit__name-housing">
                    <label className="warehouse-edit__input-label">
                      Position
                    </label>
                    <input
                      type="name"
                      name="position"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.contact.position}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isPositionValid()
                          ? ""
                          : "warehouse-edit__field--error"
                      }`}
                    />
                  </div>
                  {!this.isPositionValid() ? (
                    <div className="warehouse-edit__alert">
                      <img
                        className="warehouse-edit__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="warehouse-edit__required">
                        This field is required
                      </p>
                    </div>
                  ) : null}
                  <div className="warehouse-edit__name-housing">
                    <label className="warehouse-edit__input-label">
                      Phone Number
                    </label>
                    <input
                      type="name"
                      name="phone"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.contact.phone}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isPhoneValid()
                          ? ""
                          : "warehouse-edit__field--error"
                      }`}
                    />
                  </div>
                  {!this.isPhoneValid() ? (
                    <div className="warehouse-edit__alert">
                      <img
                        className="warehouse-edit__bang"
                        src={errorIcon}
                        alt="error exlaimation sign"
                      />
                      <p className="warehouse-edit__required">
                        Please enter a valid phone number
                      </p>
                    </div>
                  ) : null}
                  <div className="warehouse-edit__name-housing warehouse-edit__name-housing--bumper">
                    <label className="warehouse-edit__input-label">Email</label>
                    <input
                      type="name"
                      name="email"
                      autoComplete="off"
                      defaultValue={this.state.warehouse.contact.email}
                      onChange={this.handleChange}
                      className={`warehouse-edit__field ${
                        this.isEmailValid()
                          ? ""
                          : "warehouse-edit__field--error"
                      }`}
                    />
                    {!this.isEmailValid() ? (
                      <div className="warehouse-edit__alert warehouse-edit__alert--adjustment">
                        <img
                          className="warehouse-edit__bang"
                          src={errorIcon}
                          alt="error exlaimation sign"
                        />
                        <p className="warehouse-edit__required">
                          Please enter a valid email address
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="warehouse-edit__buttons warehouse-edit__buttons--mobile">
                <p className="warehouse-edit__cancel" onClick={() => this.props.history.goBack()}>Cancel</p>
                  <button className="warehouse-edit__save">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditWarehouse;
