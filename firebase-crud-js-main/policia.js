import {
    onGetPolicia,
    savePolicia,
    deletePolicia,
    getPolicia,
    updatePolicia,
    getPolicias,
  } from "./firebase.js";
  
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
            PoliciaForm["policia-persona"].value = policia.nomp;
            PoliciaForm["policia-cognom"].value = policia.cognomp;

  
            editStatus = true;
            id = doc.id;
            PoliciaForm["btn-policia-form"].innerText = "Update";
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