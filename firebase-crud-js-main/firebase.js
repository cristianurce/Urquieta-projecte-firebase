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
export const firebaseConfig = {
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
 */
export const savePres = (persona, dataEntrada, dataSortida, delicte) =>
  addDoc(collection(db, "prision"), { persona, dataEntrada, dataSortida, delicte});

  
  export const onGetPresos = (callback) => onSnapshot(collection(db, "prision"), callback);
  
  /**
   *
   * @param {string} id: ID de la tasca
   */
  export const deletePres = (id) => deleteDoc(doc(db, "prision", id));
  export const getPres = (id) => getDoc(doc(db, "prision", id));
  export const updatePres = (id, newFields) =>  updateDoc(doc(db, "prision", id), newFields);
  export const getPresos = () => getDocs(collection(db, "prision"));
  
  
  export const savePolicia = (nomp, cognomp) =>  addDoc(collection(db, "policia"), { nomp, cognomp});
  export const updatePolicia = (id, newFields) =>  updateDoc(doc(db, "policia", id), newFields);
  export const deletePolicia= (id) => deleteDoc(doc(db, "policia", id));
  export const getPolicia = (id) => getDoc(doc(db, "policia", id));
  export const getPolicies = () => getDocs(collection(db, "policia"));
  export const onGetPolicia = (callback) => onSnapshot(collection(db, "policia"), callback);