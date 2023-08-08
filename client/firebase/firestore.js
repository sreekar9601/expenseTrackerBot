

import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';

export function addExpense(uid, name, amount, date) {
  return addDoc(collection(db, "users", uid, "expenses"), {
    name,
    amount,
    date
  })
}

export async function getExpense(uid) {
  const exp = query(collection(db, "users", uid, "expenses"), orderBy("date"));
  try{
const querySnapshot = await getDocs(exp);
const expenses = [];
querySnapshot.forEach((doc)=>{
  const expenseData = doc.data();//gets name amount date
  expenses.push({
    id:doc.id,
    ...expenseData// Spread operator combines id and expenseData(...)
  });
});
return expenses;
  }
  catch(err){
    console.log(err);
  }

          

}
//TODO: ADD DELETEEXPENSE FUNCTION