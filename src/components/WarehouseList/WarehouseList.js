import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';

import TableHeader from '../TableHeader/TableHeader';
import WarehouseListItem from '../WarehouseListItem/WarehouseListItem';
import DeleteModal from '../DeleteModal/DeleteModal';
import './WarehouseList.scss';

const errorMessage = < p > Error fetching data, please try reloading in a few moments</p >
class WarehouseList extends Component {
  state = {
    warehouseArr: [],
    toDeleteId: "",
    toDeleteName: "",
    sortClick: {
      name: false,
      address: false,
      contactName: false,
      phone: false
    }
  }


  componentDidMount() {

    apiUtils.getAllWarehouses()
      .then(res => {
        this.setState({ warehouseArr: res.data });
      }).catch(err => {
        console.error(err);
        return errorMessage;
      })
  }


  componentDidUpdate(prevProps) {

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
          console.error(err);
          return errorMessage;
        })
    }
  };

  handleDelete = (id, warehouseName) => {
    this.setState({ toDeleteId: id, toDeleteName: warehouseName });
  }

  resetDelete = () => {
    this.setState({ toDeleteId: "", toDeleteName: "" })
  }

  handleConfirm = (id) => {

    apiUtils.deleteWarehouse(id)
      .then(res => {

        apiUtils.getAllWarehouses()
          .then(res => {

            this.setState({ warehouseArr: res.data });
            this.resetDelete();
          }).catch(err => {

            console.error(err);
            return errorMessage;
          })
      }).catch(err => {

        console.error(err);
        return errorMessage;
      })
  }

  handleSort = (header) => {
    // console.log(header, { ...this.state.warehouseArr });

    if (header.objKey === 'name' && this.state.sortClick.name) {
      const sortedWarehouseArr = this.state.warehouseArr;
      sortedWarehouseArr.sort((a, b) => b.name.toLowerCase() - a.name.toLowerCase());
      const oppClick = !this.state.sortClick.name;
      this.setState({ sortClick: { name: oppClick }, warehouseArr: sortedWarehouseArr });

      console.log(sortedWarehouseArr, oppClick);
    }
    else if (header.objKey === 'name' && !this.state.sortClick.name) {
      const sortedWarehouseArr = this.state.warehouseArr;
      sortedWarehouseArr.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
      const oppClick = !this.state.sortClick.name;
      this.setState({ sortClick: { name: oppClick }, warehouseArr: sortedWarehouseArr });

      console.log(sortedWarehouseArr, oppClick);
    }

    if (header.objKey === 'address' && this.state.sortClick.address) {
      const sortedWarehouseArr = this.state.warehouseArr.sort((a, b) => b.address - a.address);
      console.log(sortedWarehouseArr);
    }
    else if (header.objKey === 'address' && !this.state.sortClick.address) {
      const sortedWarehouseArr = this.state.warehouseArr.sort((a, b) => a.address - b.address);
      console.log(sortedWarehouseArr);
    }

    if (header.objKey === 'contact.name' && this.state.sortClick.contactName) {
      const sortedWarehouseArr = this.state.warehouseArr.sort((a, b) => b.contact.name - a.contact.name);
      console.log(sortedWarehouseArr);
    }
    else if (header.objKey === 'contact.name' && !this.state.sortClick.contactName) {
      const sortedWarehouseArr = this.state.warehouseArr.sort((a, b) => a.contact.name - b.contact.name);
      console.log(sortedWarehouseArr);
    }

    if (header.objKey === 'contact.phone' && this.state.sortClick.phone) {
      const sortedWarehouseArr = this.state.warehouseArr.sort((a, b) => b.contact.phone - a.contact.phone);
      console.log(sortedWarehouseArr);
    }
    else if (header.objKey === 'contact.phone' && !this.state.sortClick.phone) {
      const sortedWarehouseArr = this.state.warehouseArr.sort((a, b) => a.contact.phone - b.contact.phone);
      console.log(sortedWarehouseArr);
    }

  }


  render() {

    const { warehouseArr: warehouses } = this.state;
    const headers = [{
      header: "WAREHOUSE", flex: 0.8, objKey: "name"
    }, {
      header: "ADDRESS", flex: 1, objKey: "address"
    }, {
      header: "CONTACT NAME", flex: 0.9, objKey: "contact.name"
    }, {
      header: "CONTACT INFORMATION", flex: 1.1, objKey: "contact.phone"
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
                    handleSort={this.handleSort}
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
          < DeleteModal
            toDeleteId={this.state.toDeleteId}
            toDeleteName={this.state.toDeleteName}
            toDeleteType="warehouse"
            handleCancel={this.resetDelete}
            handleConfirm={this.handleConfirm}
            closingStatement={'from the list of warehouses'}
          />
        </div>
      </>
    )
  }
};

export default WarehouseList;