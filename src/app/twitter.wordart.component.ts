import { Component, Inject } from "@angular/core";
// import { DeviceDetectorService } from "ngx-device-detector";
import { Store } from "redux";

import * as AppActions from "./app.actions";
import { AppState } from "./app.state";
import { AppStore } from "./app.store";
import { reloadScriptTag } from "../functions";

@Component({
  selector: "wordart-component",
  styleUrls: ["./twitter.wordart.component.css"],
  templateUrl: "./twitter.wordart.component.html"
})
export class TwitterWordartComponent {
  selected = "favourites";

  constructor(
    // private readonly deviceDetectorService: DeviceDetectorService,
    @Inject(AppStore) private readonly store: Store<AppState>
  ) {
    // this.deviceDetectorService.isDesktop();
  }

  open() {
    this.store.dispatch(AppActions.sideMenuOpenAction());
  }
}
