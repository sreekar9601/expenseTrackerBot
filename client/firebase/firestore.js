

import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

export function addExpense(uid, name, amount, date) {
  return addDoc(collection(db, "users", uid, "expenses"), {
    name,
    amount,
    date
  })
}