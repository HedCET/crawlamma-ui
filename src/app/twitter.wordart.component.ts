import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import * as AppActions from "./app.actions";
import { AppState } from "./app.state";
// import { reloadScriptTag } from "../functions";

@Component({
  selector: "wordart-component",
  styleUrls: ["./twitter.wordart.component.css"],
  templateUrl: "./twitter.wordart.component.html"
})
export class TwitterWordartComponent {
  selected = "favourites";

  constructor(private readonly store: Store<{ app: AppState }>) {}

  sideMenuToggle() {
    this.store.dispatch(AppActions.sideMenuToggle());
  }
}
