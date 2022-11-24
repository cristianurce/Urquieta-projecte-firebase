const taskForm = document.getElementById("pres-form");
const tasksContainer = document.getElementById("pres-container");
const divOcult = document.getElementById("ocult");
const divpolicia = document.getElementById("policia");

function ocultarinfo() {
    var x = document.getElementById("divinfo");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function policias() {
    var x = document.getElementById("divpolicia");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}