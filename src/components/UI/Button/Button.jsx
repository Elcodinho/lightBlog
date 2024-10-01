import React from "react";
import clsx from "clsx";
import "./Button.css";

export const Button = React.memo(function Button({
  type,
  text,
  className,
  onClick,
}) {
  return (
    <button type={type} className={clsx("button", className)} onClick={onClick}>
      {text}
    </button>
  );
});
