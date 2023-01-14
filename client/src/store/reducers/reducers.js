import * as actions from "../constants/actionTypes";

const initialState = {
  projects: [],
}

export const main = (state = initialState, {type, payload}) => {

  switch (type) {
    case actions.ALL_PROJECTS_LOADED:
      return {
        ...state, 
        projects: payload.projects
      };
    default: {
      return state
    }
  }
};

// export const getMovieReducer = (state={}, {type, payload}) => {
//   switch (type) {
//     case actions.ONE_MOVIE_LOADED:
//       return { 
//         ...state, 
//         ...payload 
//       }
//     default: {
//       return state;
//     }
//   }
// };


// export const searchMoviesReducer = (state = initialState, {type, payload}) => {
//   switch (type) {
//     case actions.SEARCHED_MOVIES_LOADED: 
//       return {
//         ...state, 
//         ...payload
//       }
//     default:
//       return state
//   }
// }