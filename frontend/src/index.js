import axios from "axios";


window.showGuitars = function() {
    axios.get('http://localhost:8080/guitars')
        .then(response => {
            const allGuitars = response.data;
            const guitarTable = document.getElementById('tablebody');

            //LIMPIA LA LISTA ANTES DE RENDERIZAR LA LISTA DE GUITARRAS
            guitarTable.innerHTML = '';

            allGuitars.forEach(guitar => {
                //CREA UN ELEMENTO DE "FILA" Y LO GUARDA EN UNA VARIABLE
                const row = document.createElement('tr');
                //METE CODIGO HTML CON innerHTML
                row.innerHTML = '<td>' + guitar.model + '</td>' +
                                '<td>' + guitar.year + '</td>' +
                                '<td>' + guitar.condition + '</td>' +
                                '<a class="btn btn-warning" href="#" ">Modificar</a> <a class= "btn btn-danger" href= "javascript:delGuitars(' + guitar.id_guitar + ')">Eliminar</a>';

                //CREA UN HIJO EN LA CLASE QUE HEMOS CREADO EN DE LA FILA "ROW" GUARDADA
                guitarTable.appendChild(row);
            });
        })
}

//ESCUHAR AL FORMULARIO

document.getElementById('guitar-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const condition = document.getElementById('condition').value;

    // OBLIGAR A ESCRIBIR ALGO ANTES DE ENVIAR
    if (!model || !year || !condition) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    addGuitars(model, year, condition);
});


//LLAMAR LA METODO CON AXIOS (CON SUS PARAMETROS)
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

window.delGuitars = function(id_guitar) {
    if (confirm('¿Seguro que quieres eliminar guitarra de stock?')) {
    axios.delete('http://localhost:8080/guitars/' + id_guitar)
    .then(response => {
        console.log('guitarra eliminada', response.data)
        alert('guitarra eliminada correctamente')
        showGuitars();
})
.catch(error => {
    console.error("Error al eliminar guitarra:", error);
    alert("Hubo un error al eliminar la guitarra");
});
    }
}
//ASEGURARSE DE QUE SE CARGUE TODO EL CONTENIDO HTML ANTES DE UTILIZAR METODOS (SIN FOTOS, NI OTRAS CARGAS)
document.addEventListener('DOMContentLoaded', showGuitars);
