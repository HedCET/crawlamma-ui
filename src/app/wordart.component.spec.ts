import { Location } from "@angular/common";
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

import {
  featureName as AppFeatureName,
  initialState as AppInitialState,
} from "./app.reducers";
import { wordartApiState } from "./app.selectors";
import { routes } from "./app.routing.module";
import { MaterialComponents } from "../material.components";
import { ObjectKeys } from "./objectKeys.pipe";
import { TwitterComponent } from "./twitter.component";
import { TwitterWordartComponent } from "./twitter.wordart.component";
import {
  featureName as WordartApiFeatureName,
  wordartApiInitialState as WordartApiInitialState,
} from "./wordart.reducers";

describe("TwitterComponent", () => {
  let store: MockStore<any>;
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<TwitterWordartComponent>;
  let component: TwitterWordartComponent;

  let initialState = {
    [AppFeatureName]: AppInitialState,
    [WordartApiFeatureName]: WordartApiInitialState,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectKeys, TwitterComponent, TwitterWordartComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialComponents,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get(Store);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(TwitterWordartComponent);
    component = fixture.debugElement.componentInstance;

    router.initialNavigation();
  }));

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid form", () => {
    // component.selectForm.controls.selected.setValue("tweeted_at");
    // fixture.detectChanges();
    expect(component.selectForm.valid).toEqual(true);
  });

  it('navigation ("/twitter/wordart?key=tweeted_at") should change selection', fakeAsync(() => {
    router.navigate(["/twitter/wordart"], {
      queryParams: { key: "tweeted_at" },
    });

    tick();
    expect(location.path()).toEqual("/twitter/wordart?key=tweeted_at");

    store.overrideSelector(wordartApiState, {
      error: null,
      loading: false,
      response: {
        payload: { key: "tweeted_at" },
        response: { tweeted_at: { hits: [], total: 0 } },
      },
    });

    fixture.detectChanges();

    tick(1000 * 30);
    expect(component.selected.value).toEqual("tweeted_at");
  }));
});
