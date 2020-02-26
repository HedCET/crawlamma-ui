import { createFeatureSelector, createSelector } from "@ngrx/store";
import { isJSON } from "validator";

import { AppState } from "./app.state";

export const appState = createFeatureSelector<AppState>("app");

export const sideMenu = createSelector(
  appState,
  (state: AppState, props: { sideMenu: boolean }) =>
    props && props.sideMenu ? props.sideMenu : state.sideMenu
);

export const toast = createSelector(
  appState,
  (state: AppState, props: { toast: string }) =>
    props && props.toast && isJSON(props.toast) ? props.toast : state.toast
);

export const toastAction = createSelector(
  appState,
  (state: AppState, props: { toastAction: string }) =>
    props && props.toastAction && isJSON(props.toastAction)
      ? props.toastAction
      : state.toastAction
);
