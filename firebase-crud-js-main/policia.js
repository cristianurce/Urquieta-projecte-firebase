import {
    onGetPolicia,
    savePolicia,
    deletePolicia,
    getPolicia,
    updatePolicia,
    getPolicies,
  } from "./firebase.js";


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

import { db } from "./firebase.js";


// La configuració de Firebase de la vostra aplicació web
// const firebaseConfig = {
//   apiKey: "AIzaSyB9qQv4ZuoF_Xz-pFba4xm3RY8Ol_7vyWg",
//   authDomain: "urquieta-firebase-js-crud.firebaseapp.com",
//   projectId: "urquieta-firebase-js-crud",
//   storageBucket: "urquieta-firebase-js-crud.appspot.com",
//   messagingSenderId: "992930675063",
//   appId: "1:992930675063:web:c8d083c59a731124f48972"
// };
  // Put you credentials here



// Inicialitzar Firebase
// export const app = initializeApp(firebaseConfig);

// export const db = getFirestore();

/**
 * Gaurda una nova tascas al Firestore
 * @param {string} nomp: el titol de la tasca
 * @param {string} cognomp: la descrinció de la tasca
 */
// export const savePolicia = (nomp, cognomp) =>
//   addDoc(collection(db, "prision"), { nomp, cognomp});

// export const onGetPolicia = (callback) =>
//   onSnapshot(collection(db, "prision"), callback);

/**
 *
 * @param {string} id: ID de la tasca
 */
// export const deletePoliciaTask = (id) => deleteDoc(doc(db, "prision", id));

// export const getPolicia = (id) => getDoc(doc(db, "prision", id));

// export const updatePolicia = (id, newFields) =>
//   updateDoc(doc(db, "prision", id), newFields);

// export const getPolicias = () => getDocs(collection(db, "prision"));
  
  const policiaForm = document.getElementById("policia-form");
  const policiaContainer = document.getElementById("policia-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetPolicia((querySnapshot) => {
      policiaContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const policia = doc.data();
  
        policiaContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <p>${policia.nomp}</p>
      <p>${policia.cognomp}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Edit
        </button>
      </div>
    </div>`;
      });
  
      const btnsDelete = policiaContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deletePolicia(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = policiaContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getPolicia(e.target.dataset.id);
            const policia = doc.data();
            policiaForm["policia-persona"].value = policia.nomp;
            policiaForm["policia-cognom"].value = policia.cognomp;

  
            editStatus = true;
            id = doc.id;
            policiaForm["btn-policia-form"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  policiaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const nomp = policiaForm["policia-persona"];
    const cognomp = policiaForm["policia-cognom"];
  
    try {
      if (!editStatus) {
        await savePolicia(nomp.value, cognomp.value);
      } else {
        await updatePolicia(id, {
          nomp: nomp.value,
          cognomp: cognomp.value,
        });
  
        editStatus = false;
        id = "";
        policiaForm["btn-policia-form"].innerText = "Save";
      }
  
      policiaForm.reset();
      persona.focus();
    } catch (error) {
      console.log(error);
    }
  });