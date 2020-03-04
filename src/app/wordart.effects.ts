import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as AppActions from "./app.actions";
import { HttpService } from "./http.service";

@Injectable()
export class WordartApiEffects {
  wordartApi = createEffect(() =>
    this.actions.pipe(
      ofType(AppActions.wordart),
      switchMap(action =>
        this.httpService.wordart(action.payload).pipe(
          map(response => AppActions.wordartSuccess({ response })),
          catchError(error => of(AppActions.wordartError({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions: Actions,
    private readonly httpService: HttpService
  ) {}
}
