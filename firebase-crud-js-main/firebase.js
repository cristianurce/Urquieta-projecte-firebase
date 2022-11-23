// Importeu les funcions que necessiteu dels SDK que necessiteu
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Afegiu SDK per als productes de Firebase que vulgueu utilitzar
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// La configuració de Firebase de la vostra aplicació web
const firebaseConfig = {
  apiKey: "AIzaSyB9qQv4ZuoF_Xz-pFba4xm3RY8Ol_7vyWg",
  authDomain: "urquieta-firebase-js-crud.firebaseapp.com",
  projectId: "urquieta-firebase-js-crud",
  storageBucket: "urquieta-firebase-js-crud.appspot.com",
  messagingSenderId: "992930675063",
  appId: "1:992930675063:web:c8d083c59a731124f48972"
};
  // Put you credentials here



// Inicialitzar Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Gaurda una nova tascas al Firestore
 * @param {string} persona: el titol de la tasca
 * @param {string} dataEntrada: la descrinció de la tasca
 * @param {string} dataSortida
 * @param {string} delicte
 * @param {string} nomp
 * @param {string} cognomp
 */
export const saveTask = (persona, dataEntrada, dataSortida, delicte, nomp, cognom) =>
  addDoc(collection(db, "prision"), { persona, dataEntrada, dataSortida, delicte, nomp, cognom});

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "prision"), callback);

/**
 *
 * @param {string} id: ID de la tasca
 */
export const deleteTask = (id) => deleteDoc(doc(db, "prision", id));

export const getTask = (id) => getDoc(doc(db, "prision", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "prision", id), newFields);

export const getTasks = () => getDocs(collection(db, "prision"));