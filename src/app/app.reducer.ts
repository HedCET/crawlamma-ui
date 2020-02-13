import { Action, Reducer } from "redux";

import { sideMenuClose, sideMenuOpen } from "./app.actions";
import { AppState, initialState } from "./app.state";

export const reducer: Reducer<AppState> = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case sideMenuClose:
      return Object.assign({}, state, { sideMenu: false });

    case sideMenuOpen:
      return Object.assign({}, state, { sideMenu: true });

    default:
      return state;
  }
};
