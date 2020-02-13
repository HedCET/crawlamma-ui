import { trigger, style, animate, transition } from "@angular/animations";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { debounceTime, map, switchAll, tap } from "rxjs/operators";
import { Subscription } from "rxjs";
import * as url from "url";

import { HttpService } from "./http.service";
import { searchResponseInterface } from "./search.inerface";
import { environment } from "../environments/environment";

@Component({
  animations: [
    trigger("sideMenuAnimation", [
      transition("void => *", [
        style({ transform: "translateX(-100%)" }),
        animate(200)
      ]),
      transition("* => void", [
        animate(200, style({ transform: "translateX(-100%)" }))
      ])
    ])
  ],
  selector: "twitter-component",
  styleUrls: ["./twitter.component.css"],
  templateUrl: "./twitter.component.html"
})
export class TwitterComponent implements OnInit {
  private subscription = new Subscription();

  searchForm: FormGroup;
  searchInput: AbstractControl;
  searchResponse: searchResponseInterface = { hits: [], total: 0 };
  searching = false;
  sideMenu = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private readonly router: Router
  ) {
    this.searchForm = this.formBuilder.group({ searchInput: [""] });
    this.searchInput = this.searchForm.controls["searchInput"];
  }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParams
        .pipe(
          tap(() => {
            this.searching = true;
          }),
          map(queryParams => {
            if (queryParams.key) this.searchInput.setValue(queryParams.key);
            return this.httpService.search(queryParams.key);
          }),
          switchAll(),
          tap(() => {
            this.searching = false;
          })
        )
        .subscribe((searchResponse: searchResponseInterface) => {
          this.searchResponse = searchResponse;
        })
    );

    // this.subscription.add(
    //   this.breakpointObserver
    //     .observe(["(min-width: 768px)"])
    //     .subscribe(breakpoint => {
    //       console.log("breakpoint", breakpoint);
    //     })
    // );

    this.subscription.add(
      this.searchInput.valueChanges.pipe(debounceTime(400)).subscribe(value => {
        this.updateQueryParams({ key: value });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateQueryParams(queryParams: Params) {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: "merge",
      relativeTo: this.activatedRoute
    });
  }

  sideMenuToggle() {
    this.sideMenu = !this.sideMenu;
  }

  openInBrowser(twitterId) {
    window.open(url.resolve(environment.twitter_url, twitterId));
  }
}
