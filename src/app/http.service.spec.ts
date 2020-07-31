import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { async, TestBed } from "@angular/core/testing";

import { HttpService } from "./http.service";
import { wordartResponseInterface } from "./wordart.interface";
import { environment } from "../environments/environment";

describe("HttpService", () => {
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    httpService = TestBed.get(HttpService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it("should create the httpService", () => {
    expect(httpService).toBeTruthy();
  });

  it("should have a valid wordartResponse", () => {
    const response: wordartResponseInterface = {
      tweeted_at: {
        hits: [],
        startAt: "1970-01-01T00:00:00Z",
      },
    };

    httpService.wordart("").subscribe((r) => {
      expect(r).toEqual(response);
    });

    const r = httpTestingController.expectOne(
      `${environment.server_base_url}/wordart?key=`
    );
    expect(r.request.method).toBe("GET");
    r.flush(response);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
