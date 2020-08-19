import { Pipe, PipeTransform } from "@angular/core";
import { shuffle } from "lodash";

@Pipe({ name: "objectKeys", pure: false })
export class ObjectKeys implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return shuffle(Object.keys(value));
  }
}
