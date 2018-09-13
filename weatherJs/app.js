//initialize objects
const ui = new UI();
const storage = new Storage();
//get stored weather location
const storedZip = storage.getStoredZip();
//initialize weather object with stored location
const weather = new Weather(storedZip);

//get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

//change location event
document.querySelector('#w-changeButton').addEventListener('click', (e) => {
    const zip = document.querySelector('#zip').value;
    //change location
    weather.changeLocation(zip);
    //set location to local storage
    storage.setStoredZip(zip);
    //update ui
    getWeather();

    //close modal with jquery
    $('#locModal').modal('hide');
})


function getWeather(){
    weather.getWeather()
    .then(data => {
        ui.paint(data);
    })
    .catch(err => console.log(err));
}