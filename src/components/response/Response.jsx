import React from "react";
import "./Response.css";
import Resp from "./Resp";
function Response() {
    const retrievedHealthy = JSON.parse(localStorage.getItem("healthyItems")) || [];
const retrievedUnhealthy = JSON.parse(localStorage.getItem("unhealthyItems")) || [];

function renderItemsInDiv(items, title) {
    return (
      <div className="diet_content">
        <b>{title}</b><br />
        {items.map((item, index) => (
          <span key={index}>{item}<br /></span>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="diet_main">
        <div className="diet_heading">
          <h1>Healthy Food</h1>
          <h1>Unhealthy Food</h1>
        </div>
        <div className="diet_result_div">
          <div className="left_diet">
          {renderItemsInDiv(retrievedHealthy, "Healthy Items")}  </div>
          <div className="right_diet">
          {renderItemsInDiv(retrievedUnhealthy, "Unhealthy Items")}
   </div>
        </div>
      </div>
    </>
  );
}

export default Response;
