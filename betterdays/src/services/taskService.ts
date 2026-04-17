import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Task, Tag } from "../utils/props/Objects";

    export async function fetchTasks() {
        const snapshot = await getDocs(collection(db, "tasks"));

        const tasks: Task[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();

            return {
            id: docSnap.id,
            title: data.title,
            event: data.event,
            tags: data.tags ?? null,
            description: data.description,
            completed: data.completed,

            start: data.start.toDate(),
            end: data.end.toDate(),
            };
        });
        return tasks;
}
    export async function fetchTags() {
        const snapshot = await getDocs(collection(db, "tags"));

        const tags: Tag[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();

            return {
            id: docSnap.id,
            name: data.name,
            color: data.color,
            };
        });
        return tags;
}