import React, { useEffect, useState } from "react";
import GoBack from "../Components/GoBack";
import { useForm } from "../Components/useForm";
import Reload from "../Assets/Reload.svg";
import searchIcon from "../Assets/Search.svg";
import Popup from "../Components/Popup";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import Controls from "../Components/Controls/Controls";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExcelFile from "react-export-excel/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-export-excel/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-export-excel/dist/ExcelPlugin/elements/ExcelColumn";
import ReactToPrint from "react-to-print";
import Logo from "../Assets/Logo.svg";

export default function Search() {
  const receiptPrintRef = React.useRef(null);
  const matches = useMediaQuery("(min-width:768px)");
  const [openDetails, setOpenDetails] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const { values, setValues } = useForm([]);
  const [isFilter, setIsfilter] = useState(false);
  const [filterData, setFilterData] = useState(values);
  const [searchableData, setSearchableData] = useState([]);
  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }
  const searchingFunc = (data, searchValue) => {
    return data.filter((element) => {
      return (
        element.jobNo.toLowerCase().includes(searchValue) ||
        element.customerName.toLowerCase().includes(searchValue)
      );
    });
  };
  const handleSearch = (e) => {
    let searchValue = e.target.value.toLowerCase();

    isFilter
      ? setFilterData(searchingFunc(searchableData, searchValue))
      : setFilterData(searchingFunc(values, searchValue));
  };
  const applyBtn = () => {
    setIsfilter(true);
    const filteredData = values.filter((element) => {
      return (
        Date.parse(element.date) >= fromDate.getTime() &&
        Date.parse(element.date) <= toDate.getTime()
      );
    });
    setFilterData(filteredData);
    setSearchableData(filteredData);
  };
  const {
    values: editValuesState,
    setValues: setEditValuesState,
    handleInput: handleEditChange,
  } = useForm([]);
  const [editFields, setEditFields] = useState(false);
  const [errors, setErrors] = useState({});
  const validateEdit = () => {
    let temp = {};
    temp.customerName = editValuesState.customerName
      ? undefined
      : "This field is required.";
    temp.mobileNo = editValuesState.mobileNo
      ? undefined
      : "This field is required.";
    temp.receivedBy = editValuesState.receivedBy
      ? undefined
      : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };
  const currentJob = () => {
    const data = editValuesState;
    const keys = Object.keys(data);
    const dataValues = Object.values(data);
    return (
      <>
        <Controls.Checkbox
          style={{ alignSelf: "center" }}
          name="editFields"
          value={editFields}
          label="Enable Edit"
          onChange={() => {
            setEditFields(!editFields);
          }}
        />
        <div className="df-ac-je p-a-12">
          <div className="dfc">
            {keys.map(
              (title, index) =>
                index !== 0 && (
                  <p
                    className="m-a-0 m-t-4"
                    style={{ height: "34px" }}
                    key={title}
                  >
                    {title} :
                  </p>
                )
            )}
            <p className="m-a-0 m-t-4" style={{ height: "34px" }}>
              Receipt :{" "}
            </p>
          </div>
          <div className="dfc">
            {dataValues.map(
              (value, index) =>
                index !== 0 && (
                  <div className="df-ac-jb" key={index}>
                    {index !== 6 ? (
                      <Controls.ErrorInput
                        disabled={index > 2 ? !editFields : true}
                        className="edit-job m-a-0 m-t-4"
                        name={keys[index]}
                        value={value}
                        onChange={handleEditChange}
                        error={errors[keys[index]]}
                      />
                    ) : (
                      <Controls.Checkbox
                        name={keys[index]}
                        disabled={!editFields}
                        value={value}
                        label="Job condition"
                        onClick={handleEditChange}
                      />
                    )}
                  </div>
                )
            )}
            <ReactToPrint
              trigger={() => (
                <button
                  className="edit-job m-a-0 m-t-4"
                  type="button"
                  style={{ background: "#8064a2", color: "#fff" }}
                >
                  Receipt Print
                </button>
              )}
              content={() => receiptPrintRef.current}
              pageStyle="@page {size: 148mm 210mm; margin:6mm; }"
            />
          </div>
        </div>
      </>
    );
  };
  const handleDetails = (index, job) => {
    setEditValuesState(job);
    setCurrentIndex(index);
    setOpenDetails(true);
  };
  const currentDate = new Date();
  const [update, setUpdate] = useState(false);
  const excelHeading = [
    { label: "Job No", value: "jobNo" },
    { label: "Date", value: "date" },
    { label: "Company Name", value: "companyName" },
    { label: "Customer Name", value: "customerName" },
    { label: "Material", value: "material" },
    { label: "Model", value: "modelNo" },
    { label: "Serial No", value: "srNo" },
    { label: "Password", value: "password" },
    { label: "Problem", value: "problem" },
    { label: "Remark", value: "remark" },
    { label: "Done", value: (obj) => (obj.done ? "Completed" : "Pending") },
  ];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/job`)
      .then((res) => {
        const filteredData = res.data.sort((element) => {
          return element.done ? 1 : -1;
        });
        setFilterData(filteredData);
        setValues(filteredData);
        setUpdate(false);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
  return (
    <div className="pd-2">
      <GoBack />
      <ExcelFile
        filename="Job List"
        element={<button className="export-data">Export</button>}
      >
        <ExcelSheet
          data={values}
          name={
            currentDate.toLocaleDateString("default", { month: "long" }) +
            " " +
            currentDate.getFullYear()
          }
        >
          {excelHeading.map((element) => {
            return (
              <ExcelColumn
                key={element.label}
                label={element.label}
                value={element.value}
              />
            );
          })}
        </ExcelSheet>
      </ExcelFile>
      <div className="jobs__filter">
        <div className="heading__search">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            className="search__input"
            placeholder="Search jobNo / Customer Name"
            onChange={handleSearch}
          />
        </div>
        {matches && (
          <>
            <hr className="filter__hr" />
            <span className="filter__txt">Filter by date</span>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From"
                value={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="To"
                value={toDate}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <hr className="filter__hr" />
            <button
              className="filter__apply-btn"
              onClick={() => {
                applyBtn();
              }}
            >
              Apply
            </button>
            <img
              src={Reload}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                setFilterData(values);
              }}
            />
          </>
        )}
      </div>
      <table className="job__table">
        <thead>
          {matches ? (
            <tr>
              <th>Job No</th>
              <th>Customer Name</th>
              <th>Company Name</th>
              <th>Date</th>
              <th>Mobile No</th>
              <th>Problem</th>
              <th>Current Status</th>
              <th>Estimate</th>
              <th>Remark</th>
              <th>Info</th>
            </tr>
          ) : (
            <tr>
              <th>Job No</th>
              <th>Customer Name</th>
              <th>Info</th>
            </tr>
          )}
        </thead>
        {filterData.map((job, index) => {
          return (
            <tbody key={index}>
              {matches ? (
                <tr className={job.done ? "job-done" : ""}>
                  <td>{job.jobNo}</td>
                  <td>{job.customerName}</td>
                  <td>{job.companyName}</td>
                  <td>{job.date}</td>
                  <td>{job.mobileNo}</td>
                  <td>{job.problem}</td>
                  <td>{job.currentStatus}</td>
                  <td>{job.estimate}</td>
                  <td>{job.remark}</td>
                  <td>
                    <button
                      className="accept-btn"
                      onClick={() => handleDetails(index, job)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>{job.jobNo}</td>
                  <td>{job.customerName}</td>
                  <td>
                    <button
                      className="accept-btn"
                      onClick={() => handleDetails(index, job)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          );
        })}
      </table>
      <div style={{ display: "none" }}>
        <div ref={receiptPrintRef} className="receipt-print">
          <div className="receipt-print__grid">
            <img
              src={Logo}
              alt="companyLogo"
              width="125mm"
              style={{ padding: "2mm" }}
            />
            <div
              className="dfc"
              style={{
                borderLeft: "1mm solid #000",
                paddingLeft: "4mm",
                justifyContent: "center",
              }}
            >
              <div>Job No. {editValuesState.jobNo}</div>
              <div>Date : {convertDate(editValuesState.date)}</div>
            </div>
            <div
              className="dfc"
              style={{
                gridColumnEnd: "span 2",
                borderTop: "1mm solid #000",
                borderBottom: "1mm solid #000",
                padding: "2mm 0",
              }}
            >
              <div>Customer Name: {editValuesState.customerName}</div>
              <div>Company Name: {editValuesState.companyName}</div>
              <div>Material: {editValuesState.material}</div>
              <div>Brand: {editValuesState.brand}</div>
              <div>Model: {editValuesState.modelNo}</div>
              <div>Serial No. {editValuesState.srNo}</div>
              <div>
                Accessories:
                {editValuesState.accessories &&
                  editValuesState.accessories.join(", ")}
              </div>
              <div>Problem: {editValuesState.problem}</div>
            </div>
            <div style={{ gridColumnEnd: "span 2", padding: "2mm 0" }}>
              Received by: {editValuesState.receivedBy}
            </div>
          </div>
        </div>
      </div>
      {values.length > 0 && (
        <Popup
          open={openDetails}
          setOpen={setOpenDetails}
          title={"Job No: " + values[currentIndex].jobNo}
          data={currentJob()}
          values={editValuesState}
          handleClick={() => {
            if (validateEdit()) {
              axios
                .patch(`${process.env.REACT_APP_API_KEY}/job`, editValuesState)
                .then()
                .catch((err) => console.error(err));
              setUpdate(true);
              setEditFields(false);
              return true;
            }
          }}
        />
      )}
    </div>
  );
}
