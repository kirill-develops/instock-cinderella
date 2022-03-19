import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiUtils from "../../utils/apiUtils";

import TableHeader from "../TableHeader/TableHeader";
import Item from "../Item/Item";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px-white.svg";
import './WarehouseDetails.scss';

class WarehouseDetails extends Component {
  state = {
    warehouse: null,
  };


  componentDidMount() {
    const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >

    apiUtils.getWarehouseById(this.props.match.params.id)
      .then(res => {
        this.setState({ warehouse: res.data });
      }).catch(err => {
        console.log(err);
        return errorMessage;
      })
  };

  componentDidUpdate(prevProps) {
    const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >

    // deconstruct current and previous params
    const { id: currentId } = this.props.match.params
    const { id: prevId } = prevProps.match.params

    // if ID's don't match, updates state of Warehouse
    if (prevId !== currentId) {
      apiUtils.getWarehouseById(this.props.match.params.id)
        .then(res => {
          this.setState({
            warehouse: res.body
          })
        })
        .catch(err => {
          console.log(err);
          return errorMessage;
        })
    }
  };

  handleDelete = (id) => {

  }

  render() {
    const { warehouse } = this.state;

    if (!warehouse) {
      return <p>Loading...</p>;
    }

    const { inventory } = warehouse;

    const headers = [{
      header: "INVENTORY ITEM", flex: 1
    }, {
      header: "STATUS", flex: 1
    }, {
      header: "CATEGORY", flex: 1
    }, {
      header: "QUANTITY", flex: 1
    },
    { header: "ACTIONS", flex: 0.5 }]

    return (
      <>
        <div className="warehouse-details">
          <div className="warehouse-details__top">
            <div className="warehouse-details__header">
              <Link to="/warehouses">
                <img className="warehouse-details__back" src={arrowBack} />
              </Link>
              <h1 className="warehouse-details__title">{warehouse.name}</h1>
              <div className="warehouse-details__edit">
                <Link to={`/warehouses/${warehouse.id}/edit`}>
                  <img className="warehouse-details__icon" src={editIcon}></img>
                </Link>
                <p className="warehouse-details__label">Edit</p>
              </div>
            </div>
          </div>
          <div className="warehouse-details__backing">
            <div className="warehouse-details__information">
              <div className="warehouse-details__address">
                <div className="warehouse-details__details warehouse-details__details--mobile">
                  <h4 className="warehouse-details__subheader">WAREHOUSE ADDRESS:</h4>
                  <p className="warehouse-details__detail">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</p>
                </div>
                <div className=" warehouse-details__details warehouse-details__details--tablet">
                  <h4 className="warehouse-details__subheader">WAREHOUSE ADDRESS:</h4>
                  <p className="warehouse-details__detail">{`${warehouse.address},`}</p>
                  <p className="warehouse-details__detail">{`${warehouse.city}, ${warehouse.country}`}</p>
                </div>
              </div>
              <div className="warehouse-details__contact">
                <div className="warehouse-details__details">
                  <h4 className="warehouse-details__subheader">CONTACT NAME:</h4>
                  <p className="warehouse-details__detail">{warehouse.contact.name}</p>
                  <p className="warehouse-details__detail">{warehouse.contact.position}</p>
                </div>
                <div className="warehouse-details__details warehouse-details__details--padded">
                  <h4 className="warehouse-details__subheader">CONTACT INFORMATION:</h4>
                  <p className="warehouse-details__detail">{warehouse.contact.phone}</p>
                  <p className="warehouse-details__detail">{warehouse.contact.email}</p>
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
