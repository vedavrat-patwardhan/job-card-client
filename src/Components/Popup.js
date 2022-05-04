import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReactToPrint from "react-to-print";
import useMediaQuery from "@mui/material/useMediaQuery";
import Controls from "./Controls/Controls";

export default function Popup(props) {
  const matches = useMediaQuery("(min-width:768px)");
  const {
    open,
    setOpen,
    title,
    data,
    values,
    handleClick,
    acceptTxt,
    disableSave,
  } = props;
  const labelPrintRef = React.useRef(null);
  const [addName, setAddName] = React.useState("");
  const [addNameError, setAddNameError] = React.useState(undefined);
  const handleClose = () => {
    setOpen(false);
    setAddName("");
  };
  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }
  const handleInput = (e) => {
    setAddName(e.target.value);
    if (e.target.value.length > 15) {
      setAddNameError("Name is too long");
    } else if (addNameError) {
      setAddNameError(undefined);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick() && handleClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div className="profile-form">
          <div className="profile-form__heading">
            <span className="profile-form__title">{title}</span>
            <CloseRoundedIcon
              className="color--grey-darker cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div>{data}</div>
            <div className={`pv-16-ph-24 dfc ${matches ? "" : "dfc-ac"}`}>
              <button
                className={`accept-btn width-100${
                  disableSave ? "btn--disabled" : ""
                }`}
                type={disableSave ? "button" : "submit"}
              >
                {acceptTxt === undefined ? "Save" : acceptTxt}
              </button>
              <Controls.ErrorInput
                className="profile-form__input m-t-16"
                name="customerName"
                placeholder="Customer Name"
                disabled={false}
                onChange={handleInput}
                value={addName}
                error={addNameError}
              />
              <ReactToPrint
                trigger={() => (
                  <button
                    className="cancel-btn  m-t-16"
                    type="button"
                    disabled={addNameError}
                  >
                    Label Print
                  </button>
                )}
                content={() => labelPrintRef.current}
                pageStyle="@page {size: 35mm 15mm; margin:0; }"
              />
            </div>
          </form>
          <div style={{ display: "none" }}>
            <div ref={labelPrintRef} className="printing-size">
              <div>{addName}</div>
              <div>{values.jobNo}</div>
              <div>{convertDate(values.date)}</div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
