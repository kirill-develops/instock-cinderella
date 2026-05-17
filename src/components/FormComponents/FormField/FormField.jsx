import errorIcon from "../../../assets/icons/error-24px.svg";
import "./FormField.scss";

const FormField = ({
   label,
   name,
   type = "text",
   value,
   onChange,
   isValid,
   errorMessage,
   rest = {},
}) => (
   <div className="form-field">
      <label className="form-field__input-label">{label}</label>
      <input
         type={type}
         name={name}
         autoComplete="off"
         value={value}
         onChange={onChange}
         className={`form-field__field${isValid === false ? " form-field__field--error" : ""}`}
         {...rest}
      />
      {isValid === false && (
         <div className="form-field__error-message">
            <img
               className="form-field__error-icon"
               src={errorIcon}
               alt=""
            />
            <p className="form-field__error-text">{errorMessage}</p>
         </div>
      )}
   </div>
);

export default FormField;
