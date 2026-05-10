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
