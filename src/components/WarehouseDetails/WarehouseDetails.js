import React from "react";
import "./WarehouseDetails.scss";
import { Link } from "react-router-dom"
import { Component } from "react";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import axios from "axios";

class WarehouseDetails extends Component {

  state = {
    warehouse: [],
  }
  

  componentDidMount() {
    axios
    .get(`http://localhost:8080/warehouses/${this.props.match.params.id}`)
    .then(response => {
      this.setState({
        warehouse: response.data
      })
      console.log(response.data)
    })
  }


render() {

  const { warehouse } = this.state

  if (!warehouse) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <>
      <div className="warehouse__header">
        <Link to="/warehouses">
          <img className="warehouse__back" src={arrowBack} />
        </Link>
        <h1 className="warehouse__title">{warehouse.name}</h1>
        <Link to={`/warehouses/${warehouse.id}/edit`}>
          <img className="warehouse__edit" src={editIcon} />
        </Link>
      </div>
      <div className="warehouse__information">
        <div className="warehouse__details">
          <h4 className="warehouse__subheader">WAREHOUSE ADDRESS</h4>
          <p className="warehouse__detail">{warehouse.address}</p>
          <p className="warehouse__detail">{`${warehouse.city}, ${warehouse.country}`}</p>
        </div>
        <div className="warehouse__details">
          <h4 className="warehouse__subheader">CONTACT NAME:</h4>
          <p className="warehouse__detail">Graeme Lyon</p>
          <p className="warehouse__detail">Warehouse Manager</p>
        </div>
        <div className="warehouse__details">
          <h4 className="warehouse__subheader">CONTACT INFORMATION:</h4>
          <p className="warehouse__detail">+1(647) 509-0911</p>
          <p className="warehouse__detail">glyon@instock.com</p>
        </div>
      </div>
    </>
  );
}

}


export default WarehouseDetails;