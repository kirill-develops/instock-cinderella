import React from "react";
import "./EditInventoryItem.scss";

function EditInventoryItem() {
  return (
    <div className="inventory">
      <div className="inventory__outer">
        <div className="inventory__inner">
          <h2 className="inventory__title">Edit Inventory Item</h2>
          <div className="inventory__section">
            <form className="inventory__form">
              <div className="inventory__card">
                <h3 className="inventory__subheader">Item Details</h3>
                <div className="inventory__name--housing">
                  <label className="inventory__label">Item Name</label>
                  <input
                    type="name"
                    name="name"
                    placeholder="name"
                    defaultValue="Television"
                    className="inventory__item"
                  />
                </div>
                <div className="inventory__block">
                  <label className="inventory__label">Description</label>
                  <textarea
                    type="description"
                    name="description"
                    defaultValue="Dynamic product info goes here"
                    className="inventory__description"
                  ></textarea>
                </div>
                <div className="inventory__block">
                  <label className="inventory__label">Category</label>
                  <select className="inventory__dropdown">
                    <option>Dynamic Product List Here</option>
                    <option>1</option>
                  </select>
                </div>
              </div>

              <div className="inventory__card inventory__card--divider">
                <h3 className="inventory__subheader">Item Availability</h3>
                <div className="inventory__availability">
                  <label className="inventory__label">Status</label>
                  <div className="inventory__details">
                    <div className="inventory__stockpile">
                      <input
                        className="inventory__radio"
                        type="radio"
                        id="instock"
                        name="instock"
                        value="In Stock"
                        for="instock"
                      ></input>
                      <label className="inventory__instock" for="instock">
                        In Stock
                      </label>
                    </div>
                    <div className="inventory__stockpile">
                      <input
                        className="inventory__radio"
                        type="radio"
                        id="outstock"
                        name="outstock"
                        value="Out of stock"
                        for="outstock"
                      ></input>
                      <label className="inventory__outstock" for="outstock">
                        Out of stock
                      </label>
                      <div></div>
                    </div>
                  </div>
                  <div className="inventory__block">
                    <label className="inventory__label">Warehouse</label>
                    <select className="inventory__dropdown">
                      <option>List of Warehouses Goes here</option>
                      <option>1</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditInventoryItem;
