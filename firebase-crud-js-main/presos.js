import {
  onGetPresos,
  savePres,
  deletePres,
  getPres,
  updatePres,
  getPresos,
} from "./firebase.js";

const presForm = document.getElementById("pres-form");
const presContainer = document.getElementById("pres-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getPress();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  onGetPresos((querySnapshot) => {
    presContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const pres = doc.data();

      presContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${pres.persona}</h3>
    <p>${pres.dataEntrada}</p>
    <p>${pres.dataSortida}</p>
    <p>${pres.delicte}</p>
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

    const btnsDelete = presContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deletePres(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = presContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getPres(e.target.dataset.id);
          const Pres = doc.data();
          presForm["pres-persona"].value = Pres.persona;
          presForm["pres-dataE"].value = Pres.dataEntrada;
          presForm["pres-dataS"].value = Pres.dataSortida;
          presForm["pres-delicte"].value = Pres.delicte;

          editStatus = true;
          id = doc.id;
          presForm["btn-pres-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

presForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const persona = presForm["pres-persona"];
  const dataEntrada = presForm["pres-dataE"];
  const dataSortida = presForm["pres-dataS"];
  const delicte = presForm["pres-delicte"];

  try {
    if (!editStatus) {
      await savePres(persona.value, dataEntrada.value, dataSortida.value, delicte.value);
    } else {
      await updatePres(id, {
        persona: persona.value,
        dataEntrada: dataEntrada.value,
        dataSortida: dataSortida.value,
        delicte: delicte.value
      });

      editStatus = false;
      id = "";
      presForm["btn-pres-form"].innerText = "Save";
    }

    presForm.reset();
    persona.focus();
  } catch (error) {
    console.log(error);
  }
});