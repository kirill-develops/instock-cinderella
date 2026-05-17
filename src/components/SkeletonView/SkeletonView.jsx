import React from "react";
import "./SkeletonView.scss";

const SkeletonField = ({ tall = false, radio = false }) => (
   <div className="skeleton-form__field">
      <div className="skeleton-form__label" />
      {radio ? (
         <div className="skeleton-form__radio-group">
            <div className="skeleton-form__radio-option" />
            <div className="skeleton-form__radio-option" />
         </div>
      ) : (
         <div
            className={`skeleton-form__input${tall ? " skeleton-form__input--tall" : ""}`}
         />
      )}
   </div>
);

const SkeletonDetailField = ({ chip = false, short = false }) => (
   <div className="skeleton-form__detail-field">
      <div className="skeleton-form__detail-label" />
      {chip ? (
         <div className="skeleton-form__detail-chip" />
      ) : (
         <>
            <div className="skeleton-form__detail-value" />
            {short && (
               <div className="skeleton-form__detail-value skeleton-form__detail-value--short" />
            )}
         </>
      )}
   </div>
);

const FORM_CARDS = {
   inventory: [
      [{ tall: false }, { tall: true }, { tall: false }],
      [{ radio: true }, { tall: false }, { tall: false }],
   ],
   warehouse: [
      [{}, {}, {}, {}],
      [{}, {}, {}, {}],
   ],
};

function SkeletonView({ variant = "inventory" }) {
   if (variant === "detail") {
      return (
         <div className="skeleton-form">
            <div className="skeleton-form__header">
               <div className="skeleton-form__back" />
               <div className="skeleton-form__title" />
               <div className="skeleton-form__edit-button" />
            </div>
            <div className="skeleton-form__detail-card">
               <div className="skeleton-form__detail-column">
                  <SkeletonDetailField short />
                  <SkeletonDetailField />
               </div>
               <div className="skeleton-form__detail-column skeleton-form__detail-column--border">
                  <SkeletonDetailField chip />
                  <SkeletonDetailField />
               </div>
            </div>
         </div>
      );
   }

   const [card1, card2] = FORM_CARDS[variant];

   return (
      <div className="skeleton-form">
         <div className="skeleton-form__header">
            <div className="skeleton-form__back" />
            <div className="skeleton-form__title" />
         </div>
         <div className="skeleton-form__body">
            <div className="skeleton-form__card">
               <div className="skeleton-form__section-title" />
               {card1.map((props, i) => (
                  <SkeletonField
                     key={i}
                     {...props}
                  />
               ))}
            </div>
            <div className="skeleton-form__card skeleton-form__card--border">
               <div className="skeleton-form__section-title" />
               {card2.map((props, i) => (
                  <SkeletonField
                     key={i}
                     {...props}
                  />
               ))}
            </div>
         </div>
         <div className="skeleton-form__buttons">
            <div className="skeleton-form__button" />
            <div className="skeleton-form__button skeleton-form__button--primary" />
         </div>
      </div>
   );
}

export default SkeletonView;
