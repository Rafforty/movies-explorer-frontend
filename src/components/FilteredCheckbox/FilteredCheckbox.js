import React from "react";
import "./FilteredCheckbox.css";

function FilterCheckbox({ changeFilter , isFilterMovies }) {

  function handleCheckbox() {
    changeFilter();
  }

  return (
    <div className="filtered-checkbox">
      <div className="checkbox__container">
        <input type="checkbox" id="highload1" name="highload1" onChange={handleCheckbox} checked={isFilterMovies}></input>
        <label htmlFor="highload1" className="lb1"></label>
        <p className="checkbox__text">Короткометражки</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;
