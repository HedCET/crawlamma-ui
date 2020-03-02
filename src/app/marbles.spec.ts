import { cold, hot } from "jasmine-marbles";
import { of } from "rxjs";

describe("jasmine-marbles", () => {
  it("should understand marble diagram", () => {
    const source = cold("--");
    const expected = cold("--");

    expect(source).toBeObservable(expected);
  });

  describe("cold observable", () => {
    it("should support cold observable", () => {
      const source = cold("-a-|", { a: { key: "value" } });
      const expected = cold("-a-|", { a: { key: "value" } });

      expect(source).toBeObservable(expected);
    });

    it("should support custom error", () => {
      const source = cold("--#", null, new Error("oops!"));
      const expected = cold("--#", null, new Error("oops!"));

      expect(source).toBeObservable(expected);
    });

    it("should support multiple emission", () => {
      const source = of(1, 2, 3);
      const expected = cold("(abc|)", { a: 1, b: 2, c: 3 });

      expect(source).toBeObservable(expected);
    });
  });

  describe("hot observable", () => {
    it("should support hot observable", () => {
      const source = hot("-^a-|", { a: 5 });
      const expected = cold("-a-|", { a: 5 });

      expect(source).toBeObservable(expected);
    });

    it("should support subscription", () => {
      const source = hot("--^-a-b-c-|");
      const subs = "^-------!";
      const expected = cold("--a-b-c-|");

      expect(source).toBeObservable(expected);
      expect(source).toHaveSubscriptions(subs);
    });
  });
});
