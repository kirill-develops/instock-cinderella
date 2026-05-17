import React from "react";
import "./InventoryForm.scss";
import PageHeader from "../../PageHeader/PageHeader";
import PageError from "../../PageError/PageError";
import FormField from "../FormField/FormField";
import FormError from "../FormError/FormError";

const CATEGORIES = ["Health", "Gear", "Accessories", "Apparel", "Electronics"];
const NS = "inventory-form";

const InventoryForm = ({
   title,
   submitLabel,
   apiError,
   formErrors,
   itemName,
   description,
   category,
   status,
   warehouseName,
   quantity,
   warehouseArr,
   isInStock,
   onSubmit,
   onChange,
   onBack,
}) => {
   const e = formErrors ?? {};

   return (
      <>
         <PageHeader
            title={title}
            onBack={onBack}
         />
         <PageError apiError={apiError} />
         <form
            className={`${NS}__form`}
            onSubmit={onSubmit}
         >
            <div className={`${NS}__card`}>
               <h3 className={`${NS}__section-title`}>Item Details</h3>

               <FormField
                  label="Item Name"
                  name="itemName"
                  type="text"
                  value={itemName}
                  onChange={onChange}
                  isValid={e.itemName}
                  errorMessage="This field is required"
               />

               <div className={`${NS}__block`}>
                  <label className={`${NS}__label`}>Description</label>
                  <textarea
                     name="description"
                     placeholder="Please enter item description"
                     autoComplete="off"
                     value={description}
                     onChange={onChange}
                     className={`${NS}__description${
                        e.description === false
                           ? ` ${NS}__description--error`
                           : ""
                     }`}
                  />
                  <FormError
                     isValid={e.description}
                     errorMessage="Minimum 10 characters required"
                  />
               </div>

               <div className={`${NS}__block`}>
                  <label className={`${NS}__label`}>Category</label>
                  <select
                     name="category"
                     value={category}
                     onChange={onChange}
                     className={`${NS}__dropdown${
                        e.category === false ? ` ${NS}__dropdown--error` : ""
                     }`}
                  >
                     <option
                        value=""
                        disabled
                     >
                        Please select
                     </option>
                     {CATEGORIES.map((cat) => (
                        <option
                           key={cat}
                           value={cat}
                        >
                           {cat}
                        </option>
                     ))}
                  </select>
                  <FormError
                     isValid={e.category}
                     errorMessage="This field is required"
                  />
               </div>
            </div>

            <div className={`${NS}__card ${NS}__card--border`}>
               <h3 className={`${NS}__section-title`}>Item Availability</h3>

               <div className={`${NS}__block`}>
                  <label className={`${NS}__label`}>Status</label>
                  <div className={`${NS}__radio-group`}>
                     {["In Stock", "Out of Stock"].map((val) => (
                        <div
                           key={val}
                           className={`${NS}__radio-option`}
                        >
                           <input
                              type="radio"
                              id={val}
                              name="status"
                              value={val}
                              checked={status === val}
                              onChange={onChange}
                              className={`${NS}__radio`}
                           />
                           <label
                              className={`${NS}__radio-label`}
                              htmlFor={val}
                           >
                              {val}
                           </label>
                        </div>
                     ))}
                  </div>
                  <FormError
                     isValid={e.status}
                     errorMessage="This field is required"
                  />
               </div>

               {isInStock && (
                  <FormField
                     label="Quantity"
                     name="quantity"
                     type="number"
                     value={quantity}
                     onChange={onChange}
                     isValid={e.quantity}
                     errorMessage="This field is required"
                     inputProps={{ min: 0 }}
                  />
               )}

               <div className={`${NS}__block`}>
                  <label className={`${NS}__label`}>Warehouse</label>
                  <select
                     name="warehouseName"
                     value={warehouseName}
                     onChange={onChange}
                     className={`${NS}__dropdown${
                        e.warehouseName === false
                           ? ` ${NS}__dropdown--error`
                           : ""
                     }`}
                  >
                     <option
                        value=""
                        disabled
                     >
                        Please select
                     </option>
                     {warehouseArr.map(({ id, name }) => (
                        <option
                           key={id}
                           value={name}
                        >
                           {name}
                        </option>
                     ))}
                  </select>
                  <FormError
                     isValid={e.warehouseName}
                     errorMessage="This field is required"
                  />
               </div>
            </div>

            <div className={`${NS}__buttons`}>
               <button
                  type="button"
                  className={`${NS}__cancel-button`}
                  onClick={onBack}
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  className={`${NS}__save-button`}
               >
                  {submitLabel}
               </button>
            </div>
         </form>
      </>
   );
};

export default InventoryForm;
