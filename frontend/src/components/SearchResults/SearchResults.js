import './SearchResults.css'
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const SearchResults = () => {
    const searchObj = useSelector((state) => {
        return state;
    });

    console.log("THIS IS SEARCH OBJ", searchObj)

    const history = useHistory()

    const search = Object.values(searchObj?.search?.allResults);


    if (search.length === 0) {
        return (
            <>
                <h2>
                    <div>
                        <div>
                            <h1>No Results Found</h1>
                        </div>
                        <div>
                            <h2>Please Check Your Search </h2>
                            <h2> and Try Again</h2>
                        </div>
                    </div>
                </h2>
            </>
        );
    }

    else {
        return (
            <div className='main-container'>

                <div className='questions-div'>
                    <div className='top-container'>

                        <div className='all-questions-and-button'>
                            <span className='all-questions-header'>Results</span>
                        </div>

                        <span className='question-count'>{search.length} Spots</span>
                    </div>
                    {search.map((obj) => {
                        return (
                            <div key={obj.id} className="question-detail">

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
};

export default SearchResults;
