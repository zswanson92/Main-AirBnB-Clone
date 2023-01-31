import './SearchResults.css'
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const SearchResults = () => {
    const searchObj = useSelector((state) => {
        return state;
    });

    // console.log("THIS IS SEARCH OBJ", searchObj)

    const history = useHistory()

    const search = Object.values(searchObj?.search?.allResults);
    // console.log("THIS IS SEARCH", search)

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

                    {/* <div className='all-spots-corner'>
                        <span className='all-spots-results'>Results: {search.length} Spots</span>
                    </div> */}

                    {search.map((obj) => {
                        return (
                            <div key={obj.id} className="spot-links">
                                <Link className='search-map-links' to={`/spots/${obj.id}`}>
                                <img className='search-img' src={obj.lat[0].url}/>
                                <div className='search-map-name-div'>{obj.name} - ${obj.price} / night</div>
                                <div className='search-map-name-div'>{obj.address}, {obj.city} {obj.state}</div>
                                </Link>
                            </div>
                        )
                    })}

            </div>
        )
    }
};

export default SearchResults;
