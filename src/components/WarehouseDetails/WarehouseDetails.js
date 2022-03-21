import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiUtils from "../../utils/apiUtils";

import TableHeader from "../TableHeader/TableHeader";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px-white.svg";
import DeleteModal from '../DeleteModal/DeleteModal';
import './WarehouseDetails.scss';

const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >;

class WarehouseDetails extends Component {

  state = {
    warehouse: null,
    toDeleteId: "",
    toDeleteName: ""
  }

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

  handleDelete = (id, itemName) => {
    this.setState({ toDeleteId: id, toDeleteName: itemName });
  }

  resetDelete = () => {
    this.setState({ toDeleteId: "", toDeleteName: "" })
  }

  handleConfirm = (id) => {
    apiUtils.deleteInventory(id)
      .then(() => {
        apiUtils.getWarehouseById(this.props.match.params.id)
          .then(res => {
            this.setState({ warehouse: res.data, toDeleteId: "" });
          }).catch(err => {
            console.log(err);
            return errorMessage;
          })
      }).catch(err => {

        console.error(err);
        return errorMessage;
      })
  };

  handleSort = () => {
    // WIP
  };

  render() {
    const { warehouse } = this.state;

    if (!warehouse) {
      return <p>Loading...</p>;
    }

    const { inventory } = warehouse;

    const headers = [{
      header: "INVENTORY ITEM", flex: 1
    }, {
      header: "CATEGORY", flex: 1
    }, {
      header: "STATUS", flex: 1
    }, {
      header: "QUANTITY", flex: 1
    },
    { header: "ACTIONS", flex: 0.5 }];

    return (
      <>
        <div className="warehouse-details">
          <div className="warehouse-details__inner">
            <div className="warehouse-details__top">
              <div className="warehouse-details__header">
                <img className="warehouse-details__back" src={arrowBack} onClick={() => this.props.history.goBack()} />
                <h1 className="warehouse-details__title">{warehouse.name}</h1>
                <Link to={`/warehouses/${warehouse.id}/edit`}>
                  <div className="warehouse-details__edit">
                    <img className="warehouse-details__icon" src={editIcon}></img>
                    <p className="warehouse-details__label">Edit</p>
                  </div>
                </Link>
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
                        handleSort={this.handleSort}
                      />
                    )
                  })}
                </div>
              </div>
              {inventory
                .map(item => {
                  return (
                    <WarehouseItem
                      key={item.id}
                      itemObj={item}
                      handleDelete={this.handleDelete}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className={this.state.toDeleteId ? "inventory-list__delete" : "inventory-list__delete--hidden"}>
          < DeleteModal
            toDeleteId={this.state.toDeleteId}
            toDeleteName={this.state.toDeleteName}
            toDeleteType="inventory item"
            handleCancel={this.resetDelete}
            handleConfirm={this.handleConfirm}
            closingStatement={'from the inventory list'}
          />
        </div>
      </>
    );
  }
}

export default WarehouseDetails;
