import React from 'react';
import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import NewWarehouseDetails from '../../components/NewWarehouseDetails/NewWarehouseDetails'
import axios from 'axios';
import { BASE_URL } from '../../utils/api';
import './AddWarehousePage.scss';


function AddWarehousePage() {

    const submitHandler = (event) => {

        return axios
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
                return response
                // history.push('/warehouses');
            })
            .catch(error => {
                console.log(error);
                alert("Unable to add warehouse");
            });
    }
    return (
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
            <NewWarehouseDetails clickHandler={submitHandler} />
        </div>
    )
}

export default AddWarehousePage