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
import { MaterialComponents } from "../material.components";
import { ObjectKeys } from "./objectKeys.pipe";
import { TwitterWordartComponent } from "./twitter.wordart.component";
import {
  featureName as WordartApiFeatureName,
  wordartApiInitialState as WordartApiInitialState
} from "./wordart.reducers";

describe("TwitterComponent", () => {
  let fixture: ComponentFixture<TwitterWordartComponent>;
  let component: TwitterWordartComponent;
  let store: MockStore<any>;

  let initialState = {
    [AppFeatureName]: AppInitialState,
    [RouterStoreFeatureName]: {
      state: { params: {}, queryParams: {}, url: "/" }
    },
    [WordartApiFeatureName]: WordartApiInitialState
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectKeys, TwitterWordartComponent],
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

    fixture = TestBed.createComponent(TwitterWordartComponent);
    component = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
  }));

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid form", () => {
    // component.selectForm.controls.selected.setValue("favourites");
    expect(component.selectForm.valid).toEqual(true);
  });

  it("[setState] should have a valid selected state", () => {
    store.setState({
      ...initialState,
      [RouterStoreFeatureName]: {
        state: { params: {}, queryParams: { key: "favourites" }, url: "/" }
      }
    });
    fixture.detectChanges();
    expect(component.selected.value).toEqual("favourites");
  });

  it("[overrideSelector] should have a valid selected state", () => {
    store.overrideSelector(routerState, {
      params: {},
      queryParams: { selected: "favourites" },
      url: "/"
    });
    fixture.detectChanges();
    expect(component.selected.value).toEqual("favourites");
  });
});
