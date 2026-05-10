import validator from "validator";
import { hasMinLength, hasRequiredFields, isBlank } from "./formUtils";

export const WAREHOUSE_REQUIRED_FIELDS = [
   "name",
   "address",
   "city",
   "country",
   "contactName",
   "position",
   "phone",
   "email",
];

export const getWarehousePayload = (source) => {
   return {
      name: source.name,
      address: source.address,
      city: source.city,
      country: source.country,
      contactName: source.contactName,
      position: source.position,
      phone: source.phone,
      email: source.email,
   };
};

export const getWarehouseFieldValidity = (source) => {
   const values = getWarehousePayload(source);

   return {
      name: hasMinLength(values.name, 3),
      address: hasMinLength(values.address, 5),
      city: hasMinLength(values.city, 5),
      country: hasMinLength(values.country, 3),
      contactName: hasMinLength(values.contactName, 5),
      position: hasMinLength(values.position, 5),
      phone:
         !isBlank(values.phone) &&
         validator.isMobilePhone(String(values.phone), ["en-CA"]),
      email: !isBlank(values.email) && validator.isEmail(String(values.email)),
   };
};

export const isWarehouseFormValid = (source) => {
   const values = getWarehousePayload(source);
   const fieldsAreComplete = hasRequiredFields(
      values,
      WAREHOUSE_REQUIRED_FIELDS,
   );

   if (!fieldsAreComplete) {
      return false;
   }

   const fieldValidity = getWarehouseFieldValidity(values);
   return Object.values(fieldValidity).every(Boolean);
};
