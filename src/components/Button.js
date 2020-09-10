import React from "react";
import "./Button.scss";
import classnames from "classnames";

export default function Button(props) {
  const buttonClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });
  const {children, disabled, onClick} = props;

  return (
    <button 
      className={buttonClass} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}
