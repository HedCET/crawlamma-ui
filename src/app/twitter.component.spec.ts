import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

import { routerStoreFeatureName as RouterStoreFeatureName } from "./app.constants";
import { routerState } from "./app.selectors";
import {
  featureName as AppFeatureName,
  initialState as AppInitialState
} from "./app.reducers";
import {
  featureName as SearchApiFeatureName,
  searchApiInitialState as SearchApiInitialState
} from "./search.reducers";
import { TwitterComponent } from "./twitter.component";
import {
  featureName as WordartApiFeatureName,
  wordartApiInitialState as WordartApiInitialState
} from "./wordart.reducers";
import { MaterialComponents } from "../material.components";

describe("TwitterComponent", () => {
  let fixture: ComponentFixture<TwitterComponent>;
  let component: TwitterComponent;
  let store: MockStore<any>;

  let initialState = {
    [AppFeatureName]: AppInitialState,
    [RouterStoreFeatureName]: {
      state: { params: {}, queryParams: {}, url: "/" }
    },
    [SearchApiFeatureName]: SearchApiInitialState,
    [WordartApiFeatureName]: WordartApiInitialState
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialComponents,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({
          initialState
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TwitterComponent);
    component = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
  }));

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid form", () => {
    // component.searchForm.controls.searchInput.setValue("");
    expect(component.searchForm.valid).toEqual(true);
  });

  it("[setState] should have a valid sideMenu state", () => {
    store.setState({
      ...initialState,
      [RouterStoreFeatureName]: {
        state: { params: {}, queryParams: { sideMenu: 1 }, url: "/" }
      }
    });
    fixture.detectChanges();
    expect(component.sideMenu).toEqual(true);
  });

  it("[overrideSelector] should have a valid sideMenu state", () => {
    store.overrideSelector(routerState, {
      params: {},
      queryParams: { sideMenu: 1 },
      url: "/"
    });
    fixture.detectChanges();
    expect(component.sideMenu).toEqual(true);
  });
});
