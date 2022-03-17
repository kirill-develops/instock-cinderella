import React from "react";
import "./WarehouseDetails.scss";
import { Link } from "react-router-dom";
import { Component } from "react";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import axios from "axios";

class WarehouseDetails extends Component {
  state = {
    warehouse: null,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/warehouses/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          warehouse: response.data,
        });
        console.log(response.data);
      });
  }

  render() {
    const { warehouse } = this.state;

    if (!warehouse) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <div className="warehouse">
          <div className="warehouse__top">
            <div className="warehouse__header">
              <Link to="/warehouses">
                <img className="warehouse__back" src={arrowBack} />
              </Link>
              <h1 className="warehouse__title">{warehouse.name}</h1>
              <Link to={`/warehouses/${warehouse.id}/edit`}>
                <img className="warehouse__edit" src={editIcon}></img>
              </Link>
            </div>
          </div>
          <div className="warehouse__backing">
            <div className="warehouse__information">
              <div className="warehouse__address">
                <div className=" warehouse__details">
                  <h4 className="warehouse__subheader">WAREHOUSE ADDRESS:</h4>
                  <p className="warehouse__detail warehouse__detail--mobile">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</p>
                  <p className="warehouse__detail warehouse__detail--tablet">{`${warehouse.address}, 
                  ${warehouse.city}, ${warehouse.country}`}</p>
                </div>
              </div>
              <div className="warehouse__contact">
                <div className="warehouse__details">
                  <h4 className="warehouse__subheader">CONTACT NAME:</h4>
                  <p className="warehouse__detail">{warehouse.contact.name}</p>
                  <p className="warehouse__detail">{warehouse.contact.position}</p>
                </div>
                <div className="warehouse__details warehouse__details--addy">
                  <h4 className="warehouse__subheader">CONTACT INFORMATION:</h4>
                  <p className="warehouse__detail">{warehouse.contact.phone}</p>
                  <p className="warehouse__detail">{warehouse.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WarehouseDetails;
