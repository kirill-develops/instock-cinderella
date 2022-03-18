import React, { Component } from 'react';
import apiUtils from '../../utils/apiUtils';
import './ItemDetails.scss';

import EditIco from '../../assets/icons/edit-24px.svg';

class ItemDetails extends Component {
  state = {
    item: null
  }

  componentDidMount() {
    const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >

    apiUtils.getInventoryById(this.props.match.params.id)
      .then(res => {
        console.log(res.data);
        this.setState({ item: res.data });
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

    // if ID's don't match, updates state of Item
    if (prevId !== currentId) {
      apiUtils.getInventoryById(this.props.match.params.id)
        .then(res => {
          this.setState({
            item: res.body
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

    if (!this.state.item) {
      return <p>Loading...</p>;
    }
    console.log(this.state.item);
    const { description, category, itemName, warehouseName, quantity, status } = this.state.item;

    return (

      <div className='item-details'>
        <div className='item-details__outer'>
          <div className='item-details__inner'>
            <h2 className='item-details__label'>
              {itemName}
            </h2>

            <div className='item__block'>
              <label className='item__label'>
                ITEM DESCRIPTION:
                <h3 className='item__info--main'>{description} </h3>
              </label>
              <label className='item__label'>
                CATAGORY:
                <h3 className='item__info'>{category}</h3>
              </label>
              <label className='item__label'>
                STATUS:
                <h3 className={`item__info 
            ${status.toLowerCase() === "out of stock" ? "item__info--out-stock" : "item__info--in-stock"}`}
                >{status}</h3>
              </label>
              <label className='item__label'>
                WAREHOUSE:
                <h3 className='item__info'>{warehouseName}</h3>
              </label>
              <label className='item__label'>
                QUANTITY:
                <h3 className='item__info'>{quantity}</h3>
              </label>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDetails;