import { Component } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";

import { reloadScriptTag } from "../functions";

@Component({
  selector: "wordart-component",
  styleUrls: ["./twitter.wordart.component.css"],
  templateUrl: "./twitter.wordart.component.html"
})
export class TwitterWordartComponent {
  width: string = "416px";

  constructor(private readonly deviceDetectorService: DeviceDetectorService) {
    this.deviceDetectorService.isDesktop();
  }
}
