import { BreakpointObserver } from "@angular/cdk/layout";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";

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
    private readonly router: Router
  ) {
    this.breakpointObserver.observe(["(min-width: 480px)"]).subscribe(res => {
      this.width = res.matches ? "416px" : "calc(100vw - 64px)";
    });

    window[
      "DISPLAY_CLOUD_REDEFINE_URL_PATTERN"
    ] = this.deviceDetectorService.isDesktop() ? "//twitter.com/" : undefined;
  }

  open_in_browser() {
    // this.router.navigate(["/wordart"], {
    //   queryParams: { id: "liking" }
    // });

    window.open("//linto-1.web.app/wordart?id=liking");
  }
}
