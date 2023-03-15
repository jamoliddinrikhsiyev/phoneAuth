import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

import { app } from "/js/firebase.js";

const db = getFirestore(app);

function addDoc() {}

(async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
})();
