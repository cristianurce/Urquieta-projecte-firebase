import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.persona}</h3>
    <p>${task.dataEntrada}</p>
    <p>${task.dataSortida}</p>
    <p>${task.delicte}</p>
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

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-persona"].value = task.persona;
          taskForm["task-dataE"].value = task.dataEntrada;
          taskForm["task-dataS"].value = task.dataSortida;
          taskForm["task-delicte"].value = task.delicte;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const persona = taskForm["task-persona"];
  const dataEntrada = taskForm["task-dataE"];
  const dataSortida = taskForm["task-dataS"];
  const delicte = taskForm["task-delicte"];

  try {
    if (!editStatus) {
      await saveTask(persona.value, dataEntrada.value, dataSortida.value, delicte.value);
    } else {
      await updateTask(id, {
        persona: persona.value,
        dataEntrada: dataEntrada.value,
        dataSortida: dataSortida.value,
        delicte: delicte.value
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    persona.focus();
  } catch (error) {
    console.log(error);
  }
});
