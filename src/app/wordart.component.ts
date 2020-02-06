import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "wordart-component",
  styleUrls: ["./wordart.component.css"],
  templateUrl: "./wordart.component.html"
})
export class WordartComponent {
  private id: string = "liking";

  constructor(private readonly activatedRoute: ActivatedRoute) {
    window["DISPLAY_CLOUD_REDEFINE_URL_PATTERN"] = "//twitter.com/";

    activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams["id"]) this.id = queryParams["id"];
    });
  }
}
