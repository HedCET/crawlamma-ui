import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureName as AppFeatureName } from "./app.reducers";
import { AppState } from "./app.state.interface";
import { GeneralAPI } from "./general.api.interface";
import { featureName as WordartApiFeatureName } from "./wordart.reducers";

export const appState = createFeatureSelector<AppState>(AppFeatureName);
export const toast = createSelector(appState, (state) => state.toast);
export const toastAction = createSelector(
  appState,
  (state, props: { toastAction: string }) =>
    props && props.toastAction ? props.toastAction : state.toastAction
);

export const wordartApiState = createFeatureSelector<GeneralAPI>(
  WordartApiFeatureName
);
