import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import NewWarehouseDetails from '../../components/NewWarehouseDetails/NewWarehouseDetails'
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import './AddWarehousePage.scss';


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

    // isContactPhoneValid = () => {
    //     if (this.state.phone.length < 0) {
    //         return false;
    //     }
    //     return true;
    // };

    // isContactEmailValid = () => {
    //     if (this.state.email.length < 0) {
    //         return false;
    //     }
    //     return true;
    // };

    // If all fields are valid return true
    isUploadValid = () => {
        if (this.state.name === "" || this.state.address === "" || this.state.city === "" || this.state.country === "" || this.state.contactName === "" || this.state.position === "" || this.state.phone === "" || this.state.email === "") {
            return false;
        }
    
        // if (!this.isContactPhoneValid()) {
        //     return false;
        // }
        // if (!this.isContactEmailValid()) {
        //     return false;
        // }
        return true;
    };

    submitHandler = (event) => {
        event.preventDefault();

        if (this.isUploadValid()) {

            axios
                .post(`${BASE_URL}/warehouses`, {
                    name: event.target.warehouseName.value,
                    address: event.target.address.value,
                    city: event.target.city.value,
                    country: event.target.country.value,
                    contactName: event.target.contactName.value,
                    position: event.target.position.value,
                    phone: event.target.phone.value,
                    email: event.target.email.value
                })
                .then(response => {
                    console.log(response)
                    this.props.history.push('/warehouses');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.setState ({clicked: true})
        }
    }

    render() {
        return (
            <div className='background'>
                {/* <div className='background__outer'> */}
                   {/* <div className='background__inner'> */}
                <div className='add-warehouse'>
                    <div className='add-warehouse__top'>
                        <Link to="/warehouses">
                            <img
                                className='add-warehouse__icon'
                                src={backArrow}
                                alt="back arrow icon"
                            />
                        </Link>
                        <h1 className='add-warehouse__title'>Add New Warehouse</h1>
                    </div>
                    <NewWarehouseDetails
                        clickHandler={this.submitHandler}
                        name={this.state.name}
                        address={this.state.address}
                        city={this.state.city}
                        country={this.state.country}
                        contactName={this.state.contactName}
                        position={this.state.position}
                        phone={this.state.phone}
                        email={this.state.email}
                        clicked={this.state.clicked}
                    // handleChange={this.handleChange}
                    />
                </div>
            </div>
            //     {/* // </div> */}
            // {/* // </div> */}
        )
    }
}

export default AddWarehousePage