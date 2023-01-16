import React from "react";
import "./spinner.css";

export default function LoadingSpinner({message}) {
  return (
    <div className="spin_all">
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
      <div>
        {message}
      </div>
    </div>
  );
}