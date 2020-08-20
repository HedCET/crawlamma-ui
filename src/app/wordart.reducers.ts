import { Action, createReducer, on } from "@ngrx/store";

import * as AppActions from "./app.actions";
import { GeneralAPI } from "./general.api.interface";

export const featureName = "wordartApi";
export const wordartApiInitialState: GeneralAPI = {
  error: null,
  loading: false,
  resultSet: { payload: "", response: {} },
};

const WordartApiReducer = createReducer(
  wordartApiInitialState,

  on(AppActions.wordart, (state, action) => ({
    ...state,
    error: null,
    loading: true,
    resultSet: { ...state.resultSet, payload: action.payload },
  })),

  on(AppActions.wordartError, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    resultSet: { ...state.resultSet, response: {} },
  })),

  on(AppActions.wordartSuccess, (state, action) => ({
    ...state,
    loading: false,
    resultSet: { ...state.resultSet, response: action.response },
  }))
);

export function reducer(state: GeneralAPI, action: Action) {
  return WordartApiReducer(state, action);
}
