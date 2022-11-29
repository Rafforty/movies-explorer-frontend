import React from "react";
import { useLocation } from "react-router-dom";
import "./FilteredCheckbox.css";

function FilterCheckbox({ filter, setFilter }) {

  const location = useLocation();

  function handleCheckbox() {
    setFilter((isFilterMovies) => !isFilterMovies);
    localStorage.setItem(location.pathname, !filter);
  }

  React.useEffect(() => {
    const filterChangeStatus = JSON.parse(localStorage.getItem(location.pathname));
    setFilter(filterChangeStatus);
  }, [filter])

  return (
    <div className="filtered-checkbox">
      <div className="checkbox__container">
        <input type="checkbox" id="highload1" name="highload1" onChange={handleCheckbox} checked={filter || false}></input>
        <label htmlFor="highload1" className="lb1"></label>
        <p className="checkbox__text">Короткометражки</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;
