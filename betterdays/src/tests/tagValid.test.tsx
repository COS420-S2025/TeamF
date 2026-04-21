import type { Tag } from "../utils/props/Objects";

describe("Tag object", () => {
  test("should create a valid Tag", () => {
    const Tag: Tag = {
      id: "1",
      name: "Test Tag",
      color : "#800815"
    };

    expect(Tag.id).toBe("1");
    expect(Tag.name).toBe("Test Tag");
    expect(Tag.color).toBe("#800815");
  });
});