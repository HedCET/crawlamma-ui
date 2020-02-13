import { Action, createReducer, on } from "@ngrx/store";

import * as AppActions from "./app.actions";
import { AppState, initialState } from "./app.state";

const AppReducer = createReducer(
  initialState,

  on(AppActions.sideMenuToggle, state => ({
    ...state,
    sideMenu: !state.sideMenu
  }))
);

export function reducer(state: AppState, action: Action) {
  return AppReducer(state, action);
}
