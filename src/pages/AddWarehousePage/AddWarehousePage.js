import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import NewWarehouseDetails from '../../components/NewWarehouseDetails/NewWarehouseDetails'
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import './AddWarehousePage.scss';


class AddWarehousePage extends Component {
    // state = {
    //     name: '',
    //     address: '',
    //     city: '',
    //     country: '',
    //     contactName: '',
    //     position: '',
    //     phone: '',
    //     email: '',
    //     errors: {},
    // }

    submitHandler = (event) => {
        event.preventDefault();

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
                alert("New warehouse added!");
                // history.push('/warehouses');
            })
            .catch(error => {
                console.log(error);
                alert("Unable to add warehouse");
            });
    }
    render() {
        return (
            <div className='add-warehouse'>
                {/* <Header /> */}
                <div className='add-warehouse__top'>
                    <img
                        className='add-warehouse__icon'
                        src={backArrow}
                        alt="back arrow icon"
                    />
                    <h1 className='add-warehouse__title'>Add New Warehouse</h1>
                    </div>
                    <NewWarehouseDetails clickHandler={this.submitHandler} />
            </div>
        )
    }
}

export default AddWarehousePage