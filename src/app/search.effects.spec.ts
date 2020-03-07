import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { search, searchError, searchSuccess } from "./app.actions";
import { HttpService } from "./http.service";
import { SearchApiEffects } from "./search.effects";
import { searchResponseInterface } from "./search.inerface";

describe("SearchApiEffects", () => {
  let actions: Observable<any>;
  let effects: SearchApiEffects;
  let httpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchApiEffects,
        provideMockActions(() => actions),
        {
          provide: HttpService,
          useValue: {
            search: jasmine.createSpy()
          }
        }
      ]
    });

    effects = TestBed.get(SearchApiEffects);
    httpService = TestBed.get(HttpService);
  });

  it("should return a stream with search success response", () => {
    const searchResponse: searchResponseInterface = {
      hits: [{ created_at: 1, tweeted_at: 1 }],
      total: 1
    };

    const action = search({ payload: "" });
    const actionSuccess = searchSuccess({ response: searchResponse });

    actions = hot("-a", { a: action });
    const response = cold("-a|", { a: searchResponse });
    httpService.search.and.returnValue(response);

    const expected = cold("--b", { b: actionSuccess });
    expect(effects.searchApi).toBeObservable(expected);
  });

  it("should return a stream with search error response", () => {
    const error = new Error("500") as any;

    const action = search({ payload: "" });
    const actionError = searchError({ error });

    actions = hot("-a", { a: action });
    const response = cold("-#|", {}, error);
    httpService.search.and.returnValue(response);

    const expected = cold("--b", { b: actionError });
    expect(effects.searchApi).toBeObservable(expected);
  });
});
