import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TestService {
  constructor(private readonly httpClient: HttpClient) {}

  getUser() {
    return this.httpClient.get(`https://localhost`);
  }
}
