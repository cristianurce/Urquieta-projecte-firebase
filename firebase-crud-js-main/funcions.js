const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("task-container");


function ocultarinfo() {
    var x = document.getElementById("divinfo");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}