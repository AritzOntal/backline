import axios from "axios";

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM completamente cargado.");
    loadGuitar();
});

window.loadGuitar = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const guitarId = queryParams.get('id');
    axios.get('http://localhost:8080/guitars/' + guitarId)
    .then(response => {
            const guitarData = response.data;
            console.log("Datos de guitarra:", guitarData);
            document.getElementById("model").value = guitarData.model;
            document.getElementById("year").value = guitarData.year;
            document.getElementById("condition").value = guitarData.condition;
        })
        .catch(error => {
            console.error("Error al obtener la guitarra:", error);
        });
}
