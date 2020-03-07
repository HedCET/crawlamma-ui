import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { async, TestBed } from "@angular/core/testing";

import { HttpService } from "./http.service";
import { searchResponseInterface } from "./search.inerface";
import { wordartResponseInterface } from "./wordart.interface";
import { environment } from "../environments/environment";

describe("HttpService", () => {
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });

    httpService = TestBed.get(HttpService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it("should create the httpService", () => {
    expect(httpService).toBeTruthy();
  });

  it("should have a valid searchResponse", () => {
    const response: searchResponseInterface = {
      hits: [{ created_at: 1, tweeted_at: 1 }],
      total: 1
    };

    httpService.search("value").subscribe(r => {
      expect(r).toEqual(response);
    });

    const r = httpTestingController.expectOne(
      `${environment.server_base_url}/search?key=value`
    );
    expect(r.request.method).toBe("GET");
    r.flush(response);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
