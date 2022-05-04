import "./App.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Controls from "./Components/Controls/Controls";
import { useForm } from "./Components/useForm";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const matches = useMediaQuery("(min-width:768px)");
  const history = useHistory();
  const optionBtn = (name, title, close) => {
    return (
      <button
        type="button"
        className="list-item p-a-12"
        onClick={() => {
          handleInput({
            target: { name, value: title },
          });
          close(false);
        }}
      >
        {title}
      </button>
    );
  };
  const [checkValues, setCheckValues] = useState({
    bag: false,
    charger: false,
    powerCord: false,
    mouse: false,
    dongle: false,
  });
  const optionCheckbox = (name) => {
    return (
      <Controls.Checkbox
        name={name}
        value={checkValues[name]}
        label={name}
        onChange={(name, value) => {
          setCheckValues({ ...checkValues, [name]: value });
        }}
      />
    );
  };
  const [materialOpen, setMaterialOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);
  const data = {
    jobNo: "JN1",
    date: new Date().toDateString(),
    customerName: "",
    companyName: "",
    currentStatus: "",
    done: false,
    mobileNo: "",
    material: "",
    accessories: [""],
    brand: "",
    modelNo: "",
    srNo: "",
    password: "",
    problem: "",
    estimate: "",
    receivedBy: "",
    repairedBy: "",
    remark: "",
  };
  const { values, setValues, handleInput } = useForm(data);
  const [errors, setErrors] = useState({});
  const validate = () => {
    let temp = {};
    temp.customerName = values.customerName
      ? undefined
      : "This field is required.";
    temp.mobileNo = values.mobileNo ? undefined : "This field is required.";
    temp.receivedBy = values.receivedBy ? undefined : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };
  useEffect(() => {
    setValues({
      ...values,
      accessories: Object.keys(checkValues).filter((k) => checkValues[k]),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValues]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/latest-job`)
      .then((res) => {
        if (res.data !== null) {
          const newNo = parseInt(res.data.jobNo.slice(2)) + 1;
          setValues({
            ...values,
            jobNo: "JN" + newNo,
          });
        }
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="app">
      <div className={!matches ? "dfc" : "df-ac-ja"}>
        <div className="app__inputs">
          <div>
            <span className="heading heading--required">Customer Name</span>
            <Controls.ErrorInput
              className="app__input"
              name="customerName"
              placeholder="Customer Name"
              disabled={false}
              onChange={handleInput}
              value={values.customerName}
              error={errors.customerName}
            />
          </div>
          <div className="dfc">
            <span className="heading">Company Name</span>
            <input
              type="text"
              className="app__input"
              name="companyName"
              value={values.companyName}
              placeholder="Company Name"
              onChange={handleInput}
            />
          </div>
          <div>
            <span className="heading heading--required">Mobile Number</span>
            <Controls.ErrorInput
              className="app__input"
              name="mobileNo"
              disabled={false}
              placeholder="Mobile No"
              onChange={handleInput}
              value={values.mobileNo}
              error={errors.mobileNo}
            />
          </div>
          <div>
            <span className="heading">Material</span>
            <Controls.Options
              open={materialOpen}
              setOpen={setMaterialOpen}
              title="Material"
              titleClass="list-title"
              showSelected={values.material}
              listClass={materialOpen ? "list" : "list--hide"}
              data={[
                optionBtn("material", "Laptop", setMaterialOpen),
                optionBtn("material", "Projector", setMaterialOpen),
                optionBtn("material", "Tablet", setMaterialOpen),
                optionBtn("material", "Printer", setMaterialOpen),
              ]}
            />
          </div>
          <div>
            <span className="heading">Brand</span>
            <Controls.Options
              open={brandOpen}
              setOpen={setBrandOpen}
              title="Brand"
              titleClass="list-title"
              showSelected={values.brand}
              listClass={brandOpen ? "list" : "list--hide"}
              data={[
                optionBtn("brand", "Hp", setBrandOpen),
                optionBtn("brand", "Dell", setBrandOpen),
                optionBtn("brand", "Asus", setBrandOpen),
                optionBtn("brand", "Lenovo", setBrandOpen),
                optionBtn("brand", "Apple", setBrandOpen),
                optionBtn("brand", "BenQ", setBrandOpen),
                optionBtn("brand", "Acer", setBrandOpen),
                optionBtn("brand", "Other", setBrandOpen),
              ]}
            />
          </div>
          <div className="dfc">
            <span className="heading">Model No</span>
            <input
              type="text"
              className="app__input"
              name="modelNo"
              value={values.modelNo}
              placeholder="Model No"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="app__inputs">
          <div className="dfc">
            <span className="heading">Sr No.</span>
            <input
              type="text"
              className="app__input"
              name="srNo"
              value={values.srNo}
              placeholder="Sr No."
              onChange={handleInput}
            />
          </div>
          <div className="dfc">
            <span className="heading">Accessories</span>
            <Controls.Options
              open={accessoriesOpen}
              setOpen={setAccessoriesOpen}
              title="Accessories"
              titleClass="list-title"
              showSelected=""
              listClass={accessoriesOpen ? "list" : "list--hide"}
              data={[
                optionCheckbox("bag"),
                optionCheckbox("charger"),
                optionCheckbox("powerCord"),
                optionCheckbox("mouse"),
                optionCheckbox("dongle"),
              ]}
            />
          </div>
          <div className="dfc">
            <span className="heading">Password</span>
            <input
              type="text"
              className="app__input"
              name="password"
              value={values.password}
              placeholder="Password"
              onChange={handleInput}
            />
          </div>
          <div className="dfc">
            <span className="heading">Problem</span>
            <input
              type="text"
              className="app__input"
              name="problem"
              value={values.problem}
              placeholder="Problem"
              onChange={handleInput}
            />
          </div>
          <div className="dfc">
            <span className="heading heading--required">Received by</span>
            <Controls.ErrorInput
              type="text"
              className="app__input"
              disabled={false}
              name="receivedBy"
              value={values.receivedBy}
              placeholder="Received By"
              onChange={handleInput}
              error={errors.receivedBy}
            />
          </div>
          <div className="dfc">
            <span className="heading">Repaired By</span>
            <input
              type="text"
              className="app__input"
              name="repairedBy"
              value={values.repairedBy}
              placeholder="Repaired By"
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div className="gen">
        <button
          className="gen-btn"
          onClick={() => {
            if (validate()) {
              axios
                .post(`${process.env.REACT_APP_API_KEY}/job`, values)
                .then(() => {
                  history.push({ pathname: "create", state: { data: values } });
                })
                .catch((err) => console.error(err));
            }
          }}
        >
          Create
        </button>
        <button
          className="gen-btn"
          onClick={() => {
            history.push("search");
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default App;
