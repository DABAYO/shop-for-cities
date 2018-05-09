import React from "react";

export const FormBtn = props => (
  <button
    {...props}
    style={{
      float: "right",
      marginBottom: 10,
      color: "black",
      backgroundColor: "tan",
      border: "line",
      fontSize: "24px"
    }}
    className="btn button btn-success"
  >
    {props.children}
  </button>
);
