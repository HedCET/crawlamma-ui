import { createFeatureSelector, createSelector } from "@ngrx/store";

import { featureName as AppFeatureName } from "./app.reducers";
import { AppState } from "./app.state.interface";
import { GeneralAPI } from "./general.api.interface";
import { featureName as SearchApiFeatureName } from "./search.reducers";

export const appState = createFeatureSelector<AppState>(AppFeatureName);
export const sideMenu = createSelector(
  appState,
  (state, props: { sideMenu: boolean }) =>
    props && props.sideMenu ? props.sideMenu : state.sideMenu
);
export const toast = createSelector(appState, state => state.toast);
export const toastAction = createSelector(
  appState,
  (state, props: { toastAction: string }) =>
    props && props.toastAction ? props.toastAction : state.toastAction
);

export const searchApiState = createFeatureSelector<GeneralAPI>(
  SearchApiFeatureName
);
