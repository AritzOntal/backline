import axios from "axios";


function showGuitars() {
    axios.get('http://localhost:8080/guitars')
        .then(response => {
            const allGuitars = response.data;
            const guitarList = document.getElementById('guitar-list');
        
    allGuitars.forEach(guitar => {
        const listItem = document.createElement('li');
        listItem.textContent = `model: ${guitar.model}, year: ${guitar.year}, condition: ${guitar.condition}`;
        guitarList.appendChild(listItem);
    });
})

}
document.addEventListener('DOMContentLoaded', showGuitars);

