import React from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

export default function Options(props) {
  const {
    open,
    setOpen,
    data,
    title,
    titleClass,
    listClass,
    showSelected,
    index,
    icon,
    onClick,
  } = props;
  const display = () => {
    if (icon !== undefined) {
      return icon;
    } else {
      return (
        <>
          {showSelected === "" ? title : showSelected}
          {open ? (
            <ExpandLessRoundedIcon
              fontSize="small"
              className="color--grey-dark"
            />
          ) : (
            <ExpandMoreRoundedIcon
              fontSize="small"
              className="color--grey-dark"
            />
          )}
        </>
      );
    }
  };
  return (
    <div>
      <div
        onClick={() => {
          onClick !== undefined && onClick();
          index === undefined ? setOpen(!open) : setOpen(!open, index);
        }}
        className={`df-ac-jb cursor-pointer ${titleClass}`}
      >
        {display()}
      </div>
      <ul className={listClass}>
        {data.map((element, index) => {
          return (
            <li className="list-item" key={index}>
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
