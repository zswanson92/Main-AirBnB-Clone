import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getResultsThunk } from "../../store/search";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
//   const [filter, setFilter] = useState("title");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchResults = await dispatch(getResultsThunk(searchInput));

    if (searchResults) {
      return history.push(`/search/?spot=${searchInput}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="search"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
          className="search-bar"
        />
        <label className="search-filter">

        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
