export const isBlank = (value) => {
   if (value === undefined || value === null) {
      return true;
   }

   return String(value).trim() === "";
};

export const hasRequiredFields = (source, requiredFields) => {
   return requiredFields.every((fieldName) => !isBlank(source[fieldName]));
};

export const hasMinLength = (value, minLength) => {
   if (isBlank(value)) {
      return false;
   }

   return String(value).trim().length >= minLength;
};
