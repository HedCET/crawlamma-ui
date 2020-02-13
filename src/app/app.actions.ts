import { Action, ActionCreator } from "redux";

export const sideMenuOpen: string = "sideMenuOpen";
export const sideMenuOpenAction: ActionCreator<Action> = () => ({
  type: sideMenuOpen
});

export const sideMenuClose: string = "sideMenuClose";
export const sideMenuCloseAction: ActionCreator<Action> = () => ({
  type: sideMenuClose
});
