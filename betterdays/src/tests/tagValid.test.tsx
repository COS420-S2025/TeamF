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

//I want to test the tag's being passed and sorting lets start with a helper
const createMockTag = (id: string, name: string, color: string): Tag => {
  return {
    id,
    name,
    color
  };
};

//Now I want to test the sorting of tags
describe("Tag sorting", () => {
  test("should sort tags alphabetically by name", () => {
    const tags: Tag[] = [
      createMockTag("2", "Work", "#FF0000"),
      createMockTag("1", "Personal", "#00FF00"),
      createMockTag("3", "Urgent", "#0000FF")
    ];

    const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));

    expect(sortedTags[0].name).toBe("Personal");
    expect(sortedTags[1].name).toBe("Urgent");
    expect(sortedTags[2].name).toBe("Work");
  });
});

//I want to retrieve a tag from a mock database
describe("Tag retrieval", () => {
  test("should retrieve a tag by ID", () => {
    const tags: Tag[] = [
      createMockTag("1", "Personal", "#00FF00"),
      createMockTag("2", "Work", "#FF0000"),
      createMockTag("3", "Urgent", "#0000FF")
    ];

    const tagIdToRetrieve = "2";
    const retrievedTag = tags.find(tag => tag.id === tagIdToRetrieve);                                                                          
    expect(retrievedTag).toBeDefined();
    expect(retrievedTag?.name).toBe("Work");
    expect(retrievedTag?.color).toBe("#FF0000");
  });
});  

