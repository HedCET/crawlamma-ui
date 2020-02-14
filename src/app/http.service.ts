import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as url from "url";

import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  search(key: string = "") {
    return this.httpClient.get(
      url.resolve(environment.server_base_url, `search?key=${key}`)
    );
  }

  wordart(key: string = "") {
    return this.httpClient.get(
      url.resolve(environment.server_base_url, `wordart?key=${key}`)
    );
  }
}
