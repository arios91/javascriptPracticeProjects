class Weather{
    constructor(zip){
        this.apiKey = '3b99bbc61ed0e4d8c09ef453b2e650cb';
        this.zip = zip;
    }

    async getWeather(){
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.zip}&units=imperial&appid=${this.apiKey}`);
        const responseData = await response.json();

        return responseData;
    }

    changeLocation(zip){
        this.zip = zip;
    }
}