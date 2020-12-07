console.log('Client side JS');





const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //so page wont keep refreshing while submitting
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}&units=m`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                errorMessage.innerHTML = data.error;
            } else {
                successMessage.innerHTML = ` The forecast for ${data.location} is ${data.weather} and temperature is ${data.temperature} `;
            }

        })
    })
})