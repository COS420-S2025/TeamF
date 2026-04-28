import { db } from "../firebase";
import { Task, Tag, CheckboxStatus } from "../utils/props/Objects";
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState, useCallback } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs
} from "firebase/firestore";
    export async function fetchTasks(user: string | undefined) {
      const snapshot = await getDocs(collection(db, "tasks"));
      const tasks: Task[] = snapshot.docs
        .filter((docSnap) => docSnap.data().userId === user)
        .map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title,
            event: data.event,
            tags: data.tags ?? null,
            description: data.description,
            completed: data.completed,
            userId: data.userId,
            filterNum: data.filterNum,
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
interface TaskPayload {
  title: string;
  description: string;
  completed: CheckboxStatus;
  event: boolean;
  tags: string[];
  start: Date;
  end: Date;
  filterNum: number;
}

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]); // tags the user created

  const refreshTasks = useCallback(async () => {
    const data = await fetchTasks(user?.uid);
    setTasks(data);
  }, [user?.uid]);

  const refreshTags = useCallback(async () => {
    const data = await fetchTags();
    setTagOptions(data);
  }, []);

  useEffect(() => {
    refreshTasks();
      refreshTags();
  });

    const saveTask = async (taskId: string | null, taskPayload: TaskPayload) => {
    try {
      if (taskId) {
        const taskRef = doc(db, "tasks", taskId);
        await setDoc(taskRef, {...taskPayload,userId:user?.uid}, { merge: true });
    } else {
        await addDoc(collection(db, "tasks"), {...taskPayload,userId:user?.uid});
    }
    } catch (error) {
    console.error("Error saving task:", error);
    alert("Failed to save task.");
    }
    };

  const removeTask = async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId));
    await refreshTasks();
  };

  return {
    tasks,
    setTasks,
    tagOptions,
    refreshTasks,
    refreshTags,
    saveTask,
    removeTask,
  };
}
interface tagPayload {
  name: string;
  color: string
}

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);

  const refreshTags = async () => {
    const data = await fetchTags();
    setTags(data);
  };

  useEffect(() => {
    refreshTags();
  });

    const saveTag = async (tagId: string | null, tagPayload: tagPayload) => {
    if (tagId) {
        const tagRef = doc(db, "tags", tagId);
        await setDoc(tagRef, tagPayload, { merge: true });
    } else {
        await addDoc(collection(db, "tags"), tagPayload);
    }
    };

  const removeTag = async (tagId: string) => {
    await deleteDoc(doc(db, "tags", tagId));
    await refreshTags();
  };

  return {
    tags,
    setTags,
    refreshTags,
    saveTag,
    removeTag,
  };
}