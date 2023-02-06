import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getResultsThunk } from "../../store/search";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("name");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchResults = await dispatch(getResultsThunk(searchInput, filter));

    if (searchResults) {
      return history.push(`/search/?spot=${searchInput}?filter=${filter}`);
    }
  };

  return (
    <div className="searchbar-div">
      <form onSubmit={handleSubmit} className="search-form">
      <select
            className="queryParams"
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            required
          >
            <option disabled>Filters:</option>
            <option value={"name"}>By Name</option>
            <option value={"city"}>By City</option>
            <option value={"address"}>By Address</option>
          </select>
        <input
          type="search"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
          className="search-bar"
        />

        <button type="submit" className="searchbar-searchbutton"><i className="fa fa-search" aria-hidden="true"></i></button>
      </form>
    </div>
  );
};

export default SearchBar;
