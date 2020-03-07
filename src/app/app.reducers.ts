import { Action, createReducer, on } from "@ngrx/store";
import { isJSON } from "validator";

import * as AppActions from "./app.actions";
import { AppState } from "./app.state.interface";

export const featureName = "app";
export const initialState: AppState = {};

const AppReducer = createReducer(
  initialState,

  on(AppActions.toast, (state, action) => ({
    ...state,
    toast: action.toast && isJSON(action.toast) ? action.toast : ""
  })),

  on(AppActions.toastAction, (state, action) => ({
    ...state,
    toastAction:
      action.toastAction && isJSON(action.toastAction) ? action.toastAction : ""
  }))
);

export function reducer(state: AppState, action: Action) {
  return AppReducer(state, action);
}
