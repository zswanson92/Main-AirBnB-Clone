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
          <div className="no-results-found">
            <div className="no-results-found-icon-and-h1">
              <span className="icon-for-no-results">
                <i className="fa-solid fa-triangle-exclamation fa-10x"></i>
              </span>
              <h1>No Results Found</h1>
            </div>
            <div className="error-text-on-search">
              <h2>Please Check Your Search </h2>
              <h2> and Try Again</h2>
            </div>
          </div>
        </h2>
      </>
    );
  } else {
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
                <div className='question-detail-container'>
                  <div className='likes-answers'>
                    <span className='likes-count-question'>{obj.likes} likes</span>
                    <span className='answer-count'>{obj.answers.length} answers</span>

                  </div>
                  <Link className='title-link' style={{ textDecoration: 'none' }} to={`/questions/${obj.id}`}>
                    <p>{obj.title}</p>
                  </Link>
                  <p className='question-tried-expected-all-questions'>{obj.question} {obj.tried_expected.substring(0, 24)}...</p>
                  <div className='tags-username-all-questions'>
                    {obj.tags ?
                      <p className='question-detail-tags'>{obj.tags.split(',').join(', ').split(',').map((tag) => {
                        return <Link key={tag} to='/work-in-progress' className="questions-tag-link">[{tag}]</Link>
                      })}</p>
                      : null}
                    <span className='username-all-questions'>{" "}
                      <i className="fa-solid fa-circle-user" />{" "}
                      {obj.user_questions.username}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
};

export default SearchResults;
