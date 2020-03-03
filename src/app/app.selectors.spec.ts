import { sideMenu, toast, toastAction } from "./app.selectors";

describe("AppSelectors", () => {
  it("should have a valid sideMenu selector", () => {
    expect(sideMenu.projector({ sideMenu: false }, { sideMenu: true })).toEqual(
      true
    );
  });

  it("should have a valid toast selector", () => {
    expect(toast.projector({ toast: "{}" }, { toast: '{"args":[]}' })).toEqual(
      '{"args":[]}'
    );
  });

  it("should have a valid toastAction selector", () => {
    expect(
      toastAction.projector(
        { toastAction: "{}" },
        { toastAction: '{"key":"","value":""}' }
      )
    ).toEqual('{"key":"","value":""}');
  });
});
