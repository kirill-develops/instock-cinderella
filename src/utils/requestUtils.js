export const getRequestErrorMessage = (
   error,
   fallbackMessage = "Something went wrong. Please try again.",
) => {
   if (
      error &&
      error.response &&
      error.response.data &&
      typeof error.response.data.message === "string"
   ) {
      return error.response.data.message;
   }

   return fallbackMessage;
};

// Returns null if no field errors, otherwise a formErrors-compatible map
export const getServerFieldErrors = (error) => {
   const serverErrors = error.response?.data?.errors;

   if (!serverErrors || Object.keys(serverErrors).length === 0) return null;

   // Server: { phone: true } = field has error
   // Frontend formErrors: { phone: false } = field is invalid
   return Object.fromEntries(
      Object.keys(serverErrors).map((key) => [key, false]),
   );
};
