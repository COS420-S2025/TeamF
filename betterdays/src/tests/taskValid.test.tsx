import type { Task } from "../utils/props/Objects";

describe("Task object", () => {
  test("should create a valid task", () => {
    const task: Task = {
      id: "1",
      title: "Test Task",
      description: "Test the functionality of Task",
      completed: false,
      event: false,
      tags: ["annoying tests"],
      start: new Date("2026-04-17T09:00:00"),
      end: new Date("2026-04-17T10:00:00"),
      userId: "1"
    };

    expect(task.id).toBe("1");
    expect(task.title).toBe("Test Task");
    expect(task.completed).toBe(false);
    expect(task.tags).toEqual(["annoying tests"]);
    expect(task.start instanceof Date).toBe(true);
    expect(task.end instanceof Date).toBe(true);
    expect(task.userId).toBe("1");
  });
});