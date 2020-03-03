import { ActionReducer, MetaReducer } from "@ngrx/store";

import { environment } from "../environments/environment";

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (!environment.production) console.log("state", state, "action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
