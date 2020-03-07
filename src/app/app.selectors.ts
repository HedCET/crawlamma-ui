import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterReducerState } from "@ngrx/router-store";

import { routerStoreFeatureName as RouterStoreFeatureName } from "./app.constants";
import { featureName as AppFeatureName } from "./app.reducers";
import { AppState } from "./app.state.interface";
import { GeneralAPI } from "./general.api.interface";
import { RouterState } from "./router.state.interface";
import { featureName as SearchApiFeatureName } from "./search.reducers";
import { featureName as WordartApiFeatureName } from "./wordart.reducers";

export const appState = createFeatureSelector<AppState>(AppFeatureName);
export const toast = createSelector(appState, state => state.toast);
export const toastAction = createSelector(
  appState,
  (state, props: { toastAction: string }) =>
    props && props.toastAction ? props.toastAction : state.toastAction
);

export const searchApiState = createFeatureSelector<GeneralAPI>(
  SearchApiFeatureName
);

export const wordartApiState = createFeatureSelector<GeneralAPI>(
  WordartApiFeatureName
);

export const routerReducerState = createFeatureSelector<
  RouterReducerState<RouterState>
>(RouterStoreFeatureName);

export const routerState = createSelector(
  routerReducerState,
  state => state.state
);
