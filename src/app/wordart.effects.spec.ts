import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";

import { wordart, wordartError, wordartSuccess } from "./app.actions";
import { HttpService } from "./http.service";
import { WordartApiEffects } from "./wordart.effects";
import { wordartResponseInterface } from "./wordart.interface";

describe("WordartApiEffects", () => {
  let actions: Observable<any>;
  let effects: WordartApiEffects;
  let httpService: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WordartApiEffects,
        provideMockActions(() => actions),
        {
          provide: HttpService,
          useValue: {
            wordart: jasmine.createSpy(),
          },
        },
      ],
    });

    effects = TestBed.get(WordartApiEffects);
    httpService = TestBed.get(HttpService);
  });

  it("should return a stream with wordart success response", () => {
    const wordartResponse: wordartResponseInterface = {
      tweeted_at: {
        hits: [],
        startedAt: "1970-01-01T00:00:00Z",
      },
    };

    const action = wordart({ payload: { key: "" } });
    const actionSuccess = wordartSuccess({ response: wordartResponse });

    actions = hot("-a", { a: action });
    const response = cold("-a|", { a: wordartResponse });
    httpService.wordart.and.returnValue(response);

    const expected = cold("--b", { b: actionSuccess });
    expect(effects.wordartApi).toBeObservable(expected);
  });

  it("should return a stream with wordart error response", () => {
    const error = new Error("500") as any;

    const action = wordart({ payload: { key: "" } });
    const actionError = wordartError({ error });

    actions = hot("-a", { a: action });
    const response = cold("-#|", {}, error);
    httpService.wordart.and.returnValue(response);

    const expected = cold("--b", { b: actionError });
    expect(effects.wordartApi).toBeObservable(expected);
  });
});
