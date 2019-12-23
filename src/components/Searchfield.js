import React, { useState } from "react";

const SearchField = props => {
  return (
    <div className='col-11 col-md-6 col-lg-6 mx-auto'>
      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter a city'
          onChange={props.onSearchCityChange}
          value={props.searchCity}
          onKeyDown={props.onSearchSubmit}
        />
        <div className='input-group-append'>
          <button
            type='submit'
            className='ml-1 input-group-text btn btn-outline-success my-sm-0'
            onClick={props.handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
