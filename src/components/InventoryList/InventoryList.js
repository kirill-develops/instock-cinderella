import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';

import TableHeader from '../TableHeader/TableHeader';
import InventoryListItem from '../InventoryListItem/InventoryListItem';
import './InventoryList.scss';


class InventoryList extends Component {
  state = {
    inventoryArr: [],
  }

  componentDidMount() {
    const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >

    apiUtils.getAllInventory()
      .then(res => {
        this.setState({ inventoryArr: res.data });
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

    // if ID's don't match, updates state of inventoryArr
    if (prevId !== currentId) {
      apiUtils.getAllInventory()
        .then(res => {
          this.setState({
            inventoryArr: res.body
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

    const { inventoryArr } = this.state;
    const headers = ["INVENTORY ITEM",
      "CATEGORY",
      "STATUS",
      "QTY",
      "WAREHOUSE",
      "ACTIONS"]

    return (
      <>
        <div className='inventory-list'>
          <div className='inventory-list__headline'>
            <div className='inventory-list__title-housing'>
              <h1 className='inventory-list__title'>Inventory</h1>
            </div>

            <form className='inventory-list__form'>
              <div className='inventory-list__search-housing'>
                <input type="search"
                  name="search"
                  placeholder="Search"
                  className="inventory-list__search"
                />
              </div>
              <div className='inventory-list__cta-housing'>
                <Link to="/inventory/add" className='inventory-list__cta'>
                  <span className='inventory-list__cta-text'>
                    Add New Item
                  </span>
                </Link>
              </div>
            </form>
          </div>
          <div className='inventory-list__headers-outer'>
            <div className='inventory-list__headers-inner'>

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
          <div className='inventory-list__table'>

            {inventoryArr
              .map(itemObj => {

                return (
                  <InventoryListItem
                    key={itemObj.id}
                    itemObj={itemObj}
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

export default InventoryList;