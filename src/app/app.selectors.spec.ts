import { toastAction } from "./app.selectors";

describe("AppSelectors", () => {
  it("should have a valid toastAction selector", () => {
    expect(
      toastAction.projector(
        { toastAction: "{}" },
        { toastAction: '{"key":"","value":""}' }
      )
    ).toEqual('{"key":"","value":""}');
  });
});
