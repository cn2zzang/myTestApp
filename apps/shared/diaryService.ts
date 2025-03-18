import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export interface Diary {
  date: string;
  title: string;
  content: string;
  imageUri: string | null;
}

export const saveDiary = (diary: Diary) => {
  try {
    setDoc(doc(collection(db, "diary"), diary.date), { ...diary });
  } catch (error) {
    console.error(error);
  }
};

export const getDiaries = async () => {
  try {
    const snapshot = await getDocs(collection(db, "diary"));
    const diaries = snapshot.docs.map((doc) => doc.data() as Diary);
    return diaries;
  } catch (error) {
    return [];
  }
};

export const getDiaryByDate = async (date: string) => {
  try {
    const docRef = doc(collection(db, "diary"), date);
    const docSnap = await getDoc(docRef);
    console.log("getDiaryByDate", { docSnap, data: docSnap.data() });
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    return null;
  }
};

export const updateDiaryFields = async (
  date: string,
  updates: Partial<Diary>
) => {
  try {
    const diaryRef = doc(db, "diary", date);
    await updateDoc(diaryRef, updates);
  } catch (error) {
    console.error(error);
  }
};
