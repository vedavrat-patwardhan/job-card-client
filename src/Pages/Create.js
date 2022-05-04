import React from "react";
import GoBack from "../Components/GoBack";
import ReactToPrint from "react-to-print";

export default function Create(props) {
  const printRef = React.useRef(null);
  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }
  const printingData = () => {
    return (
      <div ref={printRef} className="printing-size">
        <div>{props.location.state.data.jobNo}</div>
        <div>{convertDate(props.location.state.data.date)}</div>
      </div>
    );
  };
  return (
    <div className="pd-2">
      <GoBack />
      <div className="pd-2 dfc-ac">
        {printingData()}
        <ReactToPrint
          trigger={() => <button className="gen-btn">Print</button>}
          content={() => printRef.current}
          pageStyle="@page {size: 35mm 15mm; margin:0; }"
        />
      </div>
    </div>
  );
}

//Label size: 62mm x 30.48mm
