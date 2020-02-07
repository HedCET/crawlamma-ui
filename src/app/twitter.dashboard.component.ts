import { BreakpointObserver } from "@angular/cdk/layout";
// import { PlatformLocation } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";

import { reloadScriptElement } from "../functions";

@Component({
  selector: "dashboard-component",
  styleUrls: ["./twitter.dashboard.component.css"],
  templateUrl: "./twitter.dashboard.component.html"
})
export class TwitterDashboardComponent {
  width: string = "416px";

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly deviceDetectorService: DeviceDetectorService,
    // private readonly platformLocation: PlatformLocation,
    private readonly router: Router
  ) {
    this.breakpointObserver.observe(["(min-width: 480px)"]).subscribe(res => {
      this.width = res.matches ? "416px" : "calc(100vw - 64px)";
    });

    window[
      "DISPLAY_CLOUD_REDEFINE_URL_PATTERN"
    ] = this.deviceDetectorService.isDesktop() ? "//twitter.com/" : undefined;
    reloadScriptElement("//wordart.com/static/cdn/wordart.min.js");
  }

  open_in_new() {
    this.router.navigate(["/wordart"], {
      queryParams: { id: "liking" }
    });

    // window.open(
    //   `${(this.platformLocation as any).location.origin}/wordart?id=liking`
    // );
  }
}
