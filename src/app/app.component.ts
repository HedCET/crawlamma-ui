import { BreakpointObserver } from "@angular/cdk/layout";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  marginTop: string = "128px";
  width: string = "480px";

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(["(min-width: 480px)"]).subscribe(res => {
      this.marginTop = res.matches ? "128px" : "0";
      this.width = res.matches ? "480px" : "100%";
    });
  }
}
