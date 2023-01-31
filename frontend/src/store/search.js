const GET_RESULTS = "search/GET_RESULTS";

const getResults = (data) => {
  return {
    type: GET_RESULTS,
    data
  }
}


export const getResultsThunk = (searchInput) => async (dispatch) => {
  const response = await fetch(`/api/search?spots=${searchInput}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getResults(data));
    return response;
  }
};

const initialState = {allResults:{}};

const searchReducer = (state = initialState, action) => {
//   let newState = {};
  switch (action.type) {
    case GET_RESULTS:{
      const newState = {allResults:{}};
      for(const key in action.data){
        newState.allResults[key] = action.data[key];
      }
      return newState;
    }
    default:
      return state;
  }
};

export default searchReducer;
