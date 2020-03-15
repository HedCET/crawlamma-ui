import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as AppActions from "./app.actions";
import { HttpService } from "./http.service";

@Injectable()
export class SearchApiEffects {
  searchApi = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.search),
      switchMap(action =>
        this.httpService.search(action.payload).pipe(
          map(response => AppActions.searchSuccess({ response })),
          catchError(error => of(AppActions.searchError({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions: Actions,
    private readonly httpService: HttpService
  ) {}
}