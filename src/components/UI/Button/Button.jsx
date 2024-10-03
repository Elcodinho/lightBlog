import React from "react";
import clsx from "clsx";
import "./Button.css";

export const Button = React.memo(function Button({
  type,
  text,
  className,
  isDisabled,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx("button", className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
});
