import { Action, createReducer, on } from "@ngrx/store";

import * as AppActions from "./app.actions";
import { GeneralAPI } from "./general.api.interface";

export const featureName = "searchApi";
const searchApiInitialState: GeneralAPI = {
  error: null,
  loading: false,
  resultSet: { payload: "", response: { hits: [], total: 0 } }
};

const SearchApiReducer = createReducer(
  searchApiInitialState,

  on(AppActions.search, (state, action) => ({
    ...state,
    error: null,
    loading: true,
    resultSet: { ...state.resultSet, payload: action.payload }
  })),

  on(AppActions.searchError, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    resultSet: { ...state.resultSet, response: { hits: [], total: 0 } }
  })),

  on(AppActions.searchSuccess, (state, action) => ({
    ...state,
    loading: false,
    resultSet: { ...state.resultSet, response: action.response }
  }))
);

export function reducer(state: GeneralAPI, action: Action) {
  return SearchApiReducer(state, action);
}
