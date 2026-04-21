import { useEffect, useState } from "react";
import { Tag } from "../utils/props/Objects";
import { fetchTags } from "../services/databaseManager";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";

interface tagPayload {
  name: string;
  color: string
}

export function useTags(loadTags = false) {
  const [tags, setTags] = useState<Tag[]>([]);

  const refreshTags = async () => {
    if (!loadTags) return;
    const data = await fetchTags();
    setTags(data);
  };

  useEffect(() => {
    if (loadTags) {
      refreshTags();
    }
  }, [loadTags]);

    const savetag = async (tagId: string | null, tagPayload: tagPayload) => {
    if (tagId) {
        const tagRef = doc(db, "tags", tagId);
        await setDoc(tagRef, tagPayload, { merge: true });
    } else {
        await addDoc(collection(db, "tags"), tagPayload);
    }
    };

  const removetag = async (tagId: string) => {
    await deleteDoc(doc(db, "tags", tagId));
    await refreshTags();
  };

  return {
    tags,
    setTags,
    refreshTags,
    savetag,
    removetag,
  };
}