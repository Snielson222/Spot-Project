import React from "react";

export default function SearchNav() {

    function submitForm() {

    }

    return (
        <div className="searchNav">
        <label className="searchLabel">Where
        <form>
          <input placeholder='Search destinations' className="searchInput"></input>
          <button id="searchButton" type="submit" onClick={submitForm}><i class="fa fa-search" aria-hidden="true"></i> Search</button>
        </form>
        </label>
      </div>
    )
}