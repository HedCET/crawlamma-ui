import { Action, createReducer, on } from "@ngrx/store";

import * as AppActions from "./app.actions";
import { GeneralAPI } from "./general.api.interface";

export const featureName = "wordartApi";
export const wordartApiInitialState: GeneralAPI = {
  error: null,
  loading: false,
  response: { payload: "", response: {} },
};

const WordartApiReducer = createReducer(
  wordartApiInitialState,

  on(AppActions.wordart, (state, action) => ({
    ...state,
    error: null,
    loading: true,
    response: { ...state.response, payload: action.payload },
  })),

  on(AppActions.wordartError, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    response: { ...state.response, response: {} },
  })),

  on(AppActions.wordartSuccess, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    response: { ...state.response, response: action.response },
  }))
);

export function reducer(state: GeneralAPI, action: Action) {
  return WordartApiReducer(state, action);
}
