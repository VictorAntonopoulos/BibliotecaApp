import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface Book {
  title: string;
  author: string;
  genre?: string;
  status?: "Quero ler" | "Lendo" | "Lido";
  favorite?: boolean;
  [key: string]: any;
}

const booksRef = collection(db, "books");

export const addBook = async (book: Book, userId: string): Promise<void> => {
  await addDoc(booksRef, {
    ...book,
    userId,
    createdAt: serverTimestamp(),
  });
};


export const getBooks = async (
  userId: string
): Promise<(Book & { id: string })[]> => {
  const q = query(booksRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Book),
  }));
};


export const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<void> => {
  const ref = doc(db, "books", id);
  await updateDoc(ref, data);
};


export const deleteBook = async (id: string): Promise<void> => {
  const ref = doc(db, "books", id);
  await deleteDoc(ref);
};


export const toggleFavorite = async (
  id: string,
  current: boolean
): Promise<void> => {
  const ref = doc(db, "books", id);
  await updateDoc(ref, { favorite: !current });
};


export const updateStatus = async (
  id: string,
  status: Book["status"]
): Promise<void> => {
  const ref = doc(db, "books", id);
  await updateDoc(ref, { status });
};
