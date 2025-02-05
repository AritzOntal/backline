import axios from "axios";


function showGuitars() {
    axios.get('http://localhost:8080/guitars')
        .then(response => {
            const allGuitars = response.data;
            const guitarList = document.getElementById('guitar-list');

            //LIMPIA LA LISTA ANTES DE RENDERIZAR LA LISTA DE GUITARRAS
            guitarList.innerHTML = '';

            allGuitars.forEach(guitar => {
                const listItem = document.createElement('li');
                listItem.textContent = `model: ${guitar.model}, year: ${guitar.year}, condition: ${guitar.condition}`;
                guitarList.appendChild(listItem);
            });
        })
}

//ESCUHAR AL FORMULARIO

document.getElementById('guitar-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtener los valores del formulario
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const condition = document.getElementById('condition').value;

    // Verificar que los campos no estén vacíos
    if (!model || !year || !condition) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    addGuitars(model, year, condition);

});

//LLAMAR LA METODO CON AXIOS

function addGuitars(model, year, condition) {
    axios.post('http://localhost:8080/guitars', { model, year, condition })
        .then(response => {
            console.log('guitarra añadida', response.data)
            alert('guitarra añadida correctamente')
            //limpiamos el formulario
            document.getElementById('guitar-form').reset();
            //volvemmos a mostrar la lista actualizada
            showGuitars();
        })
        .catch(error => {
            console.error("Error al añadir guitarra:", error);
            alert("Hubo un error al añadir la guitarra");
        });

}

//ASEGURARSE DE QUE SE CARGUE TODO EL CONTENIDO HTML ANTES DE UTILIZAR METODOS (SIN FOTOS, NI OTRAS CARGAS)
document.addEventListener('DOMContentLoaded', showGuitars);
