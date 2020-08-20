import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { iif, of, throwError } from "rxjs";
import { concatMap, delay, retryWhen } from "rxjs/operators";
import * as url from "url";

import { environment } from "../environments/environment";

@Injectable()
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  wordart(key: string = "", tags: string = "") {
    return this.httpClient
      .get(
        url.resolve(
          environment.server_base_url,
          `wordart?key=${key}&tags=${tags}`
        )
      )
      .pipe(
        retryWhen((e) =>
          e.pipe(
            concatMap((e, i) =>
              iif(() => i > 3, throwError(e), of(e).pipe(delay(1000 * 10)))
            )
          )
        )
      );
  }
}
