import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';

import TableHeader from '../TableHeader/TableHeader';
import Warehouse from '../Warehouse/Warehouse';
import './WarehouseList.scss';


class WarehouseList extends Component {
  state = {
    warehouseArr: [],
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
    const { id: currentId } = this.props.match.params
    const { id: prevId } = prevProps.match.params

    // if ID's don't match, updates state of activeVideObj, if no ID but previously had a value, go to first video
    if (!currentId && prevId) {
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
    } else if (prevId !== currentId) {
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

  handleDelete = (id) => {

  }


  render() {

    const { warehouseArr: warehouses } = this.state;
    const headers = ["WAREHOUSE",
      "ADDRESS",
      "CONTACT NAME",
      "CONTACT INFORMATION",
      "ACTIONS"]

    return (
      <>
        <div className='warehouse-list'>
          <div className='warehouse-list__headline'>
            <div className='warehouse-list__title-housing'>
              <h1 className='warehouse-list__title'>Warehouses</h1>
            </div>

            <form className='warehouse-list__form'>
              <div className='warehouse-list__search-housing'>
                <input type="search"
                  name="search"
                  placeholder="Search"
                  className="warehouse-list__search"
                />
              </div>
              <div className='warehouse-list__cta-housing'>
                <Link to="/warehouse-list/add" className='warehouse-list__cta'>
                  <span className='warehouse-list__cta-text'>
                    Add New Warehouse
                  </span>
                </Link>
              </div>
            </form>
          </div>
          <div className='warehouse-list__headers-outer'>
            <div className='warehouse-list__headers-inner'>
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
          <div className='warehouse-list__table'>
            {warehouses
              .map(warehouseObj => {

                return (
                  <Warehouse
                    key={warehouseObj.id}
                    warehouseObj={warehouseObj}
                    handleDelete={this.handleDelete}
                  />
                )
              })}
          </div>
        </div>
      </>
    )
  }
};

export default WarehouseList;