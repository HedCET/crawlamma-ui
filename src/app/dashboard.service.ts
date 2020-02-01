import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(private readonly httpClient: HttpClient) {}

  getUser() {
    return this.httpClient.get(`localhost/user`);
  }
}
