import { useState } from "react";
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDate = (date, name) => {
    setValues({
      ...values,
      [name]: date,
    });
  };

  const handleArr = (e, arrName) => {
    let { name, value } = e.target;
    const index = parseInt(name.split(/(\d+)/)[1]);
    name = name.split(/(\d+)/)[0];
    let updateArr = values[arrName];
    updateArr[index][name] = value;
    setValues({
      ...values,
      [arrName]: updateArr,
    });
  };

  const validateURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (number) => {
    //const format = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    const format = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/im;
    return number.match(format);
  };
  return {
    values,
    setValues,
    handleInput,
    handleDate,
    handleArr,
    validateURL,
    validateEmail,
    validatePhone,
    errors,
    setErrors,
  };
}
