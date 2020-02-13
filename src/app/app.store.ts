import { InjectionToken } from "@angular/core";
import { Action, compose, createStore, Store, StoreEnhancer } from "redux";

import { reducer } from "./app.reducer";
import { AppState } from "./app.state";

export const AppStore = new InjectionToken("AppStore");
const devTools: StoreEnhancer<AppState> = window["devToolsExtension"]
  ? window["devToolsExtension"]()
  : f => f;

export const appStoreProviders = [
  {
    provide: AppStore,
    useFactory() {
      return createStore<AppState>(reducer, compose(devTools));
    }
  }
];
