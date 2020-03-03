import { NgModule } from "@angular/core";
import { ActionReducer, META_REDUCERS, MetaReducer } from "@ngrx/store";
import { AppState } from "./app.state.interface";

import { environment } from "../environments/environment";

export function metaReducerFactory(): MetaReducer<AppState> {
  return (reducer: ActionReducer<any>) => (state, action) => {
    if (!environment.production) console.log("state", state, "action", action);
    return reducer(state, action);
  };
}

@NgModule({
  providers: [
    {
      multi: true,
      provide: META_REDUCERS,
      useFactory: metaReducerFactory
    }
  ]
})
export class MetaReducerModule {}
