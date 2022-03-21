import React, { Component } from 'react';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import NewWarehouseDetails from '../../components/NewWarehouseDetails/NewWarehouseDetails';
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import './AddWarehousePage.scss';
import validator from 'validator';


class AddWarehousePage extends Component {
    state = {
        name: "",
        address: "",
        city: "",
        country: "",
        contactName: "",
        position: "",
        phone: "",
        email: "",
        clicked: false
    }

    // Create a change handler for all inputs
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // If all fields are valid return true
    isUploadValid = () => {
        if (this.state.name === "" || this.state.address === "" || this.state.city === "" || this.state.country === "" || this.state.contactName === "" || this.state.position === "" || this.state.phone === "" || this.state.email === "") {
            return false;
        }

        const isEmailValid = validator.isEmail(this.state.email);
        if (!isEmailValid) {
            return false;
        }

        const options = { StrictMode: true }

        const isPhoneValid = validator.isMobilePhone(this.state.phone, ['en-CA'], options);
        if (!isPhoneValid) {
            return false;
        }
        return true;
    };

    submitHandler = (event) => {
        event.preventDefault();

        if (this.isUploadValid()) {

            axios
                .post(`${BASE_URL}/warehouses`, {
                    name: this.state.name,
                    address: this.state.address,
                    city: this.state.city,
                    country: this.state.country,
                    contactName: this.state.contactName,
                    position: this.state.position,
                    phone: this.state.phone,
                    email: this.state.email
                })
                .then(response => {
                    this.props.history.push('/warehouses');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.setState({ clicked: true })
        }
    }

    render() {
        return (
            <div className='background'>
                <div className='add-warehouse'>
                    <div className='add-warehouse__top'>
                        <img onClick={() => this.props.history.goBack()}
                            className='add-warehouse__icon'
                            src={backArrow}
                            alt="back arrow icon"
                        />
                        <h1 className='add-warehouse__title'>Add New Warehouse</h1>
                    </div>
                    <NewWarehouseDetails
                        submitHandler={this.submitHandler}
                        handleChange={this.handleChange}
                        name={this.state.name}
                        address={this.state.address}
                        city={this.state.city}
                        country={this.state.country}
                        contactName={this.state.contactName}
                        position={this.state.position}
                        phone={this.state.phone}
                        email={this.state.email}
                        clicked={this.state.clicked}
                    />
                </div>
            </div>
        )
    }
}

export default AddWarehousePage