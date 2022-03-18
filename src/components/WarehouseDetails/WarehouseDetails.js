import React, { Component } from "react";
import { Link } from "react-router-dom";

import TableHeader from "../TableHeader/TableHeader";
import Item from "../Item/Item";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px-white.svg";
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
      });
  }

  handleDelete = (id) => {

  }

  render() {
    const { warehouse } = this.state;

    if (!warehouse) {
      return <p>Loading...</p>;
    }

    const { inventory } = warehouse;
    const headers = ["INVENTORY ITEM",
      "STATUS",
      "CATAGORY",
      "QUANTITY",
      "ACTIONS"]

    return (
      <>
        <div className="warehouse-details">
          <div className="warehouse-details__top">
            <div className="warehouse-details__header">
              <Link to="/warehouses">
                <img className="warehouse-details__back" src={arrowBack} />
              </Link>
              <h1 className="warehouse__title">{warehouse.name}</h1>
              <div className="warehouse__edit">
                <Link to={`/warehouses/${warehouse.id}/edit`}>
                  <img className="warehouse__icon" src={editIcon}></img>
                </Link>
                <p className="warehouse__label">Edit</p>
              </div>
            </div>
          </div>
          <div className="warehouse__backing">
            <div className="warehouse__information">
              <div className="warehouse__address">
                <div className="warehouse__details warehouse__details--mobile">
                  <h4 className="warehouse__subheader">WAREHOUSE ADDRESS:</h4>
                  <p className="warehouse__detail">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</p>
                </div>
                <div className=" warehouse__details warehouse__details--tablet">
                  <h4 className="warehouse__subheader">WAREHOUSE ADDRESS:</h4>
                  <p className="warehouse__detail">{`${warehouse.address},`}</p>
                  <p className="warehouse__detail">{`${warehouse.city}, ${warehouse.country}`}</p>
                </div>
              </div>
              <div className="warehouse__contact">
                <div className="warehouse__details">
                  <h4 className="warehouse__subheader">CONTACT NAME:</h4>
                  <p className="warehouse__detail">{warehouse.contact.name}</p>
                  <p className="warehouse__detail">{warehouse.contact.position}</p>
                </div>
                <div className="warehouse__details warehouse__details--padded">
                  <h4 className="warehouse__subheader">CONTACT INFORMATION:</h4>
                  <p className="warehouse__detail">{warehouse.contact.phone}</p>
                  <p className="warehouse__detail">{warehouse.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='warehouse-details__headers-outer'>
            <div className='warehouse-details__headers-inner'>
              {headers.map((header, i) => {
                return (
                  <TableHeader
                    key={i}
                    header={header}
                  />
                )
              })}
            </div>
          </div>
          {inventory
            .map(item => {

              return (
                <Item
                  key={item.id}
                  itemObj={item}
                />
              )
            })}
        </div>
      </>
    );
  }
}

export default WarehouseDetails;
