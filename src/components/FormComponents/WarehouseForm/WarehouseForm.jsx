import React from "react";
import "./WarehouseForm.scss";
import PageHeader from "../../PageHeader/PageHeader";
import PageError from "../../PageError/PageError";
import FormField from "../FormField/FormField";

const NS = "warehouse-form";

const WAREHOUSE_FIELDS = [
   {
      label: "Warehouse Name",
      name: "name",
      type: "text",
      error: "This field is required",
   },
   {
      label: "Street Address",
      name: "address",
      type: "text",
      error: "This field is required",
   },
   {
      label: "City",
      name: "city",
      type: "text",
      error: "This field is required",
   },
   {
      label: "Country",
      name: "country",
      type: "text",
      error: "This field is required",
   },
];

const CONTACT_FIELDS = [
   {
      label: "Contact Name",
      name: "contactName",
      type: "text",
      error: "This field is required",
   },
   {
      label: "Position",
      name: "position",
      type: "text",
      error: "This field is required",
   },
   {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      error: "Please enter a valid phone number",
   },
   {
      label: "Email",
      name: "email",
      type: "email",
      error: "Please enter a valid email address",
   },
];

const WarehouseForm = ({
   title,
   submitLabel = "Save",
   apiError,
   formErrors,
   name,
   address,
   city,
   country,
   contactName,
   position,
   phone,
   email,
   onSubmit,
   onChange,
   onBack,
}) => {
   const e = formErrors ?? {};

   const values = {
      name,
      address,
      city,
      country,
      contactName,
      position,
      phone,
      email,
   };

   const renderFields = (fields) =>
      fields.map(({ label, name, type, error }) => (
         <FormField
            key={name}
            label={label}
            name={name}
            type={type}
            value={values[name]}
            onChange={onChange}
            isValid={e[name] === undefined ? undefined : e[name]}
            errorMessage={error}
         />
      ));

   return (
      <>
         <PageHeader
            title={title}
            onBack={onBack}
         />
         <PageError apiError={apiError} />
         <form
            onSubmit={onSubmit}
            className={`${NS}__form`}
         >
            <div className={`${NS}__card`}>
               <h2 className={`${NS}__section-title`}>Warehouse Details</h2>
               {renderFields(WAREHOUSE_FIELDS)}
            </div>
            <div className={`${NS}__card ${NS}__card--border`}>
               <h2 className={`${NS}__section-title`}>Contact Details</h2>
               {renderFields(CONTACT_FIELDS)}
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

export default WarehouseForm;
