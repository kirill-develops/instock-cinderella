import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';

import TableHeader from '../TableHeader/TableHeader';
import WarehouseListItem from '../WarehouseListItem/WarehouseListItem';
import WarehouseDelete from '../WarehouseDelete/WarehouseDelete';
import './WarehouseList.scss';


class WarehouseList extends Component {
  state = {
    warehouseArr: [],
    toDeleteId: "",
    toDeleteName: ""
  }


  componentDidMount() {
    const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >

    apiUtils.getAllWarehouses()
      .then(res => {
        this.setState({ warehouseArr: res.data });
      }).catch(err => {
        console.log(err);
        return errorMessage;
      })
  }


  componentDidUpdate(prevProps) {
    const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >

    // deconstruct current and previous params
    const { id: currentId } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;

    // if ID's don't match, updates state of warehouseArr
    if (prevId !== currentId) {
      apiUtils.getAllWarehouses()
        .then(res => {
          this.setState({
            warehouseArr: res.body
          })
        })
        .catch(err => {
          console.log(err);
          return errorMessage;
        })
    }
  };

  handleDelete = (id, warehouseName) => {
    this.setState({ toDeleteId: id, toDeleteName: warehouseName });
    console.log(this.state.toDeleteId);
  }

  handleConfirm = () => {

  }


  render() {

    const { warehouseArr: warehouses } = this.state;
    const headers = [{
      header: "WAREHOUSE", flex: 0.8
    }, {
      header: "ADDRESS", flex: 1
    }, {
      header: "CONTACT NAME", flex: 0.9
    }, {
      header: "CONTACT INFORMATION", flex: 1.1
    },
    { header: "ACTIONS", flex: 0.5 }]

    return (
      <>
        <div className='warehouse-list'>
          <div className='warehouse-list__inner'>
            <div className='warehouse-list__headline'>
              <h1 className='warehouse-list__title'>Warehouses</h1>
              <form className='warehouse-list__form'>
                <div className='warehouse-list__search-housing'>
                  <input type="search"
                    name="search"
                    placeholder="Search"
                    className="warehouse-list__search"
                  />
                </div>
                <div className='warehouse-list__cta-housing'>
                  <Link to="/warehouses/add" className='warehouse-list__cta'>
                    <span className='warehouse-list__cta-text'>
                      Add New Warehouse
                    </span>
                  </Link>
                </div>
              </form>
            </div>
            <div className='warehouse-list__headers'>
              {headers.map((header, i) => {
                return (
                  <TableHeader
                    key={i}
                    header={header}
                  />
                )
              })}
            </div>
            <div className='warehouse-list__table'>
              {warehouses
                .map(warehouseObj => {

                  return (
                    <WarehouseListItem
                      key={warehouseObj.id}
                      warehouseObj={warehouseObj}
                      handleDelete={this.handleDelete}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className={this.state.toDeleteId ? "warehouse-list__delete" : "warehouse-list__delete--hidden"}>
          < WarehouseDelete
            handleConfirm={this.handleConfirm}
            toDeleteName={this.state.toDeleteName}
          />
        </div>
      </>
    )
  }
};

export default WarehouseList;