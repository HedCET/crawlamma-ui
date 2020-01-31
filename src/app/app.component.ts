import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html"
})
export class AppComponent {
  constructor(private readonly breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(["(min-width: 768px)"]).subscribe(result => {
      this.drawerLeftMode = result.matches ? "side" : "over";
      this.drawerLeftOpened = !!result.matches;
    });
  }

  drawerLeftOpened: boolean = true;
  drawerLeftMode: string = "side";
  title: string = "LEADERBOARD";

  toggleDrawerLeft() {
    this.drawerLeftOpened = !this.drawerLeftOpened;
  }
}
