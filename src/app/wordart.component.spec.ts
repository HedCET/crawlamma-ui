import { async, ComponentFixture, TestBed } from "@angular/core/testing";
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
import { MaterialComponents } from "../material.components";
import { ObjectKeys } from "./objectKeys.pipe";
import { TwitterWordartComponent } from "./twitter.wordart.component";
import {
  featureName as WordartApiFeatureName,
  wordartApiInitialState as WordartApiInitialState,
} from "./wordart.reducers";

describe("TwitterComponent", () => {
  let store: MockStore<any>;
  let router: Router;
  let fixture: ComponentFixture<TwitterWordartComponent>;
  let component: TwitterWordartComponent;

  let initialState = {
    [AppFeatureName]: AppInitialState,
    [WordartApiFeatureName]: WordartApiInitialState,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectKeys, TwitterWordartComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialComponents,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get(Store);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(TwitterWordartComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid form", () => {
    // component.selectForm.controls.selected.setValue("tweeted_at");
    // fixture.detectChanges();
    expect(component.selectForm.valid).toEqual(true);
  });
});
