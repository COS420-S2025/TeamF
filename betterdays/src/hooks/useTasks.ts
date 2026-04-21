import { useEffect, useState } from "react";
import { Task, Tag } from "../utils/props/Objects";
import { fetchTasks, fetchTags } from "../services/databaseManager";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";

interface TaskPayload {
  title: string;
  description: string;
  completed: boolean;
  event: boolean;
  tags: string[];
  start: Date;
  end: Date;
}

export function useTasks(loadTags = false) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const refreshTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const refreshTags = async () => {
    if (!loadTags) return;
    const data = await fetchTags();
    setTags(data);
  };

  useEffect(() => {
    refreshTasks();
    if (loadTags) {
      refreshTags();
    }
  }, [loadTags]);

    const saveTask = async (taskId: string | null, taskPayload: TaskPayload) => {
    if (taskId) {
        const taskRef = doc(db, "tasks", taskId);
        await setDoc(taskRef, taskPayload, { merge: true });
    } else {
        await addDoc(collection(db, "tasks"), taskPayload);
    }
    };

  const removeTask = async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId));
    await refreshTasks();
  };

  return {
    tasks,
    setTasks,
    tags,
    refreshTasks,
    refreshTags,
    saveTask,
    removeTask,
  };
}