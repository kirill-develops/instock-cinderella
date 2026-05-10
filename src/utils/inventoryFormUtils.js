import { hasMinLength, hasRequiredFields, isBlank } from "./formUtils";

export const INVENTORY_REQUIRED_FIELDS = [
   "warehouseName",
   "itemName",
   "description",
   "category",
   "status",
];

export const getInventoryFormValues = (source) => {
   return {
      warehouseName: source.warehouseName || source.warehouse || "",
      itemName: source.itemName,
      description: source.description,
      category: source.category,
      status: source.status,
      quantity: source.quantity,
   };
};

export const getQuantityForStatus = (status, quantity) => {
   if (status === "Out of Stock") {
      return 0;
   }

   const parsedQuantity = Number(quantity);
   if (Number.isNaN(parsedQuantity) || parsedQuantity < 0) {
      return 0;
   }

   return parsedQuantity;
};

const isQuantityValidForStatus = (status, quantity) => {
   if (status === "Out of Stock") {
      return true;
   }

   if (isBlank(quantity)) {
      return false;
   }

   const parsedQuantity = Number(quantity);
   return !Number.isNaN(parsedQuantity) && parsedQuantity >= 0;
};

export const getInventoryFieldValidity = (source) => {
   const values = getInventoryFormValues(source);

   return {
      warehouseName: !isBlank(values.warehouseName),
      itemName: hasMinLength(values.itemName, 1),
      description: hasMinLength(values.description, 10),
      category: !isBlank(values.category),
      status: !isBlank(values.status),
      quantity: isQuantityValidForStatus(values.status, values.quantity),
   };
};

export const isInventoryFormValid = (source) => {
   const values = getInventoryFormValues(source);
   const fieldsAreComplete = hasRequiredFields(
      values,
      INVENTORY_REQUIRED_FIELDS,
   );

   if (!fieldsAreComplete) {
      return false;
   }

   const fieldValidity = getInventoryFieldValidity(values);
   return Object.values(fieldValidity).every(Boolean);
};

export const getInventoryPayload = (source) => {
   const values = getInventoryFormValues(source);

   return {
      warehouseName: values.warehouseName,
      itemName: values.itemName,
      description: values.description,
      category: values.category,
      status: values.status,
      quantity: getQuantityForStatus(values.status, values.quantity),
   };
};
