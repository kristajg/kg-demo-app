import React from 'react';

const DropDownMenu = ({
  labelText,
  buttonText,
  id,
  listData = [],
  listDataId,
  listDataText,
  handleDropdownSelect,
  inputType,
  inputOnChange,
  inputValue,
  sublabelText,
  sublabelId,
}) => {
  return (
    <>
      {labelText && <label htmlFor={id} className="form-label">{labelText}</label>}
      <div className='input-group mb-1'>
        <button id={id} className='btn btn-outline-secondary dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">{buttonText}</button>
        <ul className="dropdown-menu">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          {listData.map((obj, i) => {
            return (
              <li key={`${id}-item-${i}`} style={{ cursor: 'pointer' }}>
                <a className='dropdown-item' id={obj[listDataId]} onClick={e => handleDropdownSelect(e, id)}>{obj[listDataText]}</a>
              </li>
            );
          })}
        </ul>
        <input type={inputType} className="form-control" id={id} aria-describedby={sublabelId} onChange={inputOnChange} value={inputValue} />
      </div>
      {sublabelText && <div id={sublabelId} className="form-text">{sublabelText}</div>}
    </>
  );
}

export default DropDownMenu;
