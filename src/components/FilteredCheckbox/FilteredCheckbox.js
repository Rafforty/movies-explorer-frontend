import React from "react";
import "./FilteredCheckbox.css";

function FilterCheckbox() {
  
  const [isCheckbox, setIsCheckbox] = React.useState(false);

  function handleCheckbox() {
    isCheckbox ? setIsCheckbox(false) : setIsCheckbox(true);
  }

  return (
    <div className="filtered-checkbox">
      <div className="checkbox__container">
        <input type="checkbox" id="highload1" name="highload1"></input>
        <label htmlFor="highload1" className="lb1" onClick={handleCheckbox}></label>
        <p className="checkbox__text">Короткометражки</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;
