import { Component } from "react";
import { getRequestErrorMessage, getServerFieldErrors } from "./requestUtils";

class FormPageBase extends Component {
   constructor(props) {
      super(props);
      this.state = {
         ...this.getInitialFields(),
         loading: true,
         formErrors: null,
         apiError: "",
      };
   }

   getInitialFields = () => ({});
   prefetchData = () => Promise.resolve(null);
   buildPayload = (state) => state;
   isFormValid = () => Object.values(this.getFieldValidity()).every(Boolean);
   submitData = () => Promise.reject("submitData not implemented");
   getRedirectPath = () => "/";

   // Subclass overrides — return a { fieldName: bool } map
   getFieldValidity = () => ({});

   handleApiError = (err, fallback) => {
      this.setState({ apiError: getRequestErrorMessage(err, fallback) });
   };

   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   componentDidMount() {
      this.prefetchData()
         .then((patch) => {
            if (patch) this.setState({ ...patch, apiError: "" });
         })
         .catch((err) => this.handleApiError(err, "Unable to load data."))
         .finally(() => this.setState({ loading: false }));
   }

   submitHandler = (event) => {
      event.preventDefault();
      this.setState({ apiError: "" });

      const validity = this.getFieldValidity();
      const allValid = Object.values(validity).every(Boolean);

      if (!allValid) {
         this.setState({ formErrors: validity });
         return;
      }

      const payload = this.buildPayload(this.state);

      this.submitData(payload)
         .then(() => this.props.history.push(this.getRedirectPath()))
         .catch((err) => {
            const fieldErrors = getServerFieldErrors(err);

            if (fieldErrors) {
               // 400 with field map — highlight fields exactly like client validation
               this.setState({ formErrors: fieldErrors });
            } else {
               // 404, 500, network error — show banner message
               this.handleApiError(err, "Unable to submit form.");
            }
         });
   };
}

export default FormPageBase;
