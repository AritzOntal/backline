
window.loadGuitar = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const guiarId = queryParams.get('id');

};


window.getGuitar = function() {
    axios.get('http://localhost:8080/guitars/guiarId')
    .then(response => { 
        const guitarDate = response.data;
    })
}


window.editGuitar = function() {
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const condition = document.getElementById('condition').value;

}