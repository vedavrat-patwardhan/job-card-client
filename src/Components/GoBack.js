import React from "react";
import { Link } from "react-router-dom";

export default function GoBack() {
  return (
    <div className="goback">
      <Link className="goback__txt" to="/">
        Back
      </Link>
    </div>
  );
}
