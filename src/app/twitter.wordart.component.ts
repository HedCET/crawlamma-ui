import { Component, ElementRef, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import * as moment from "moment";
import { Subscription } from "rxjs";
import * as url from "url";

import * as AppActions from "./app.actions";
import { wordartApiState } from "./app.selectors";
import { wordartResponseInterface } from "./wordart.interface";
import { environment } from "../environments/environment";
import { reloadScriptTag } from "../functions";

@Component({
  selector: "wordart-component",
  templateUrl: "./twitter.wordart.component.html",
})
export class TwitterWordartComponent implements OnInit {
  private subscription = new Subscription();

  loading = true;
  selectForm: FormGroup;
  selected: AbstractControl;
  services = ["followers", "friends", "likes", "lists", "tweeted_at"];
  wordartResponse: wordartResponseInterface = {};

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly store: Store<any>
  ) {
    this.selectForm = this.formBuilder.group({ selected: ["friends"] });
    this.selected = this.selectForm.controls["selected"];
  }

  ngOnInit() {
    this.store.dispatch(
      AppActions.wordart({
        payload: {
          key: "",
          tags: this.activatedRoute.snapshot.queryParams.tags,
        },
      })
    );

    this.subscription.add(
      this.store.pipe(select(wordartApiState)).subscribe((r) => {
        this.wordartResponse = r.response.response;
        this.loading = r.loading;

        if (r.error)
          this.store.dispatch(
            AppActions.toast({
              toast: JSON.stringify({ args: [r.error.message] }),
            })
          );
        else {
          reloadScriptTag(environment.wordart_min_js);
          this.addEventListener();
        }
      })
    );

    this.subscription.add(
      this.selected.valueChanges.subscribe((key) => {
        reloadScriptTag(environment.wordart_min_js);
        this.addEventListener();

        if (key !== this.activatedRoute.snapshot.queryParams.key)
          this.updateQueryParams({ key });
      })
    );

    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        if (
          this.services.includes(queryParams.key) &&
          queryParams.key !== this.selected.value
        )
          this.selected.setValue(queryParams.key);
      })
    );

    if (
      !this.activatedRoute.snapshot.queryParams.key ||
      !this.services.includes(this.activatedRoute.snapshot.queryParams.key)
    )
      this.updateQueryParams({ key: this.selected.value });

    window["DISPLAY_CLOUD_REDEFINE_URL_PATTERN"] = "https://twitter.com/";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateQueryParams(queryParams: Params = {}) {
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: "merge",
      relativeTo: this.activatedRoute,
    });
  }

  getSrc(key: string = "followers") {
    return url.resolve(
      environment.server_base_url,
      `wordart?key=${key}&tags=${
        this.activatedRoute.snapshot.queryParams.tags || ""
      }`
    );
  }

  getTimeString(startedAt?: string) {
    return moment(startedAt || undefined).format("YYYY-MM-DD hh:mm:ss A");
  }

  async addEventListener() {
    for (let i = 10; 0 < i; i--) {
      await new Promise((r) => setTimeout(r, 3000));

      const elementRef = this.elementRef.nativeElement.querySelector(
        "a.wordart-anchor"
      );

      if (elementRef) {
        elementRef.addEventListener("click", this.clickEvent.bind(this));
        break;
      }
    }
  }

  clickEvent(event: Event) {
    event.preventDefault();

    const document = this.elementRef.nativeElement;
    const elementRef = document.querySelector("a.wordart-anchor");

    if (elementRef && elementRef.href)
      this.store.dispatch(
        AppActions.toast({
          toast: JSON.stringify({
            args: [elementRef.href, "OPEN"],
            action: JSON.stringify({
              key: "open_in_browser",
              value: elementRef.href,
            }),
          }),
        })
      );
  }
}
