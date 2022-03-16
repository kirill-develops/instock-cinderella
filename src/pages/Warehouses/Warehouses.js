import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';

import Warehouse from '../../components/Warehouse/Warehouse';
import './Warehouses.scss';


class warehouses extends Component {
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

    const { warehouseArr: warehouses } = this.state

    return (
      <>
        <div className='warehouses'>
          <h1 className='warehouses__title'>Warehouses</h1>
        </div>
        <form className='warehouses__form'>
          <div className='warehouses__search-housing'>
            <input type="search"
              name="search"
              placeholder="Search"
              className="warehouses__search"
            />
          </div>
          <div className='warehouses__cta-housing'>
            <Link to="/warehouses/add" className='warehouses__cta'>
              <span className='warehouses__cta-text'>
                Add New Warehouse
              </span>
            </Link>
          </div>
        </form>

        <div className='warehouses__list'>

          {warehouses
            .map(warehouseObj => {

              return (
                <Warehouse
                  key={warehouseObj.id}
                  warehouseObj={warehouseObj}
                />
              )
            })}
        </div>
      </>
    )
  }
};

export default warehouses