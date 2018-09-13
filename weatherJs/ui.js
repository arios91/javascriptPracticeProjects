class UI{
    constructor() {
        this.location = document.querySelector('#w-location');
        this.desc = document.querySelector('#w-desc');
        this.string = document.querySelector('#w-string');
        this.icon = document.querySelector('#w-icon');
        this.details = document.querySelector('#w-details');
        this.humidity = document.querySelector('#w-humidity');
        this.wind = document.querySelector('#w-wind');
        this.visibility = document.querySelector('#w-visibility');
    }

    paint(data){
        this.location.textContent = `${data.name}`;
        this.desc.textContent = data.weather[0].description;
        this.string.textContent = `${data.main.temp} F (${this.farenheitToCelsius(data.main.temp)} C)`;
        this.humidity.textContent = `Relative Humidity: ${data.main.humidity}%`;
        this.wind.textContent = `Wind Speed: ${data.wind.speed} mph`;
        this.visibility.textContent = `Visibility: ${this.metersToMiles(data.visibility)} miles`;
    }

    farenheitToCelsius(f){
        return Math.round((f-32) * .5556);
    }
    
    metersToMiles(meters){
        return Math.round(meters/1609.344);
    }

    changeLocation(zip){
        this.zip = zip;
    }
}