// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value

      // - Get a reference to the element containing the user-entered days
      let daysInput = document.querySelector(`#days`)

      // - Get the user-entered days from the element's value
      let days = daysInput.value

      // - Check to see if the user entered anything; if so:
      if (location.length > 0 && days.length > 0) {

        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=53a0155e46494151b76200952212604&q=${location}&days=3`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the returned location, current weather conditions, the forecast, current temperature
        let interpretedLocation = json.location
        let currentWeatherConditions = json.current.condition
        let dailyForecast = json.forecast.forecastday
        let currentTemperature = json.current.temp_f
  
        // Store a reference to the "current" element
        let currentElement = document.querySelector(`.current`) 

        // Clear the old information and just display the new input
        currentElement.innerHTML = ``
  
        // Fill the current element with the location and current weather conditions
        currentElement.insertAdjacentHTML(`beforeend`,`
        <div class="text-center space-y-2">
        <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
        <div class="hero container max-w-screen-lg mx-auto text-center font-bold">
          <img src="http:${currentWeatherConditions.icon}" class="inline-block">
          <span class="temperature">${currentTemperature}</span>° 
          and
          <span class="conditions">${currentWeatherConditions.text}</span>
        </div>
      </div>
        `)

        // To display a daily weather forecast

        // Store a reference to the "forecast" element
        let forecastElement = document.querySelector(`.forecast`)

        // Clear the old information and just display the new input
        forecastElement.innerHTML = ``

        // Fill the forecast element with the number of days
        forecastElement.insertAdjacentHTML(`beforeend`,`
        <div class="text-center space-y-8">
        <div class="font-bold text-3xl">${days} Day Forecast</div>
        <div>
        `)

        // For the number of days provided by the end-user (the loop), display the weather forecast: the date, high and low temperature, and a summary of the conditions
        for (let i=0; i < days; i++) {

            // Store each item in the Array in memory
            let forecastDay = json.forecast.forecastday[i]

            // Store the forecast Date, forecast weather conditions, forecast High temperature, forecast Low temperature
            let forecastDate = forecastDay.date
            let forecastHigh = forecastDay.day.maxtemp_f
            let forecastLow = forecastDay.day.mintemp_f
            let forecastWeatherConditions = forecastDay.day.condition 

            // Fill the forecast element with the forecast weather condition 
            forecastElement.insertAdjacentHTML(`beforeend`, `
            <div class="hero container max-w-screen-lg mx-auto text-center">
                <img src="http:${dailyForecast[i].day.condition.icon}" class="inline-block">
                <h1 class="text-2xl text-bold text-gray-500">${forecastDate}</h1>
                <h2 class="text-xl">High ${forecastHigh}° – Low ${forecastLow}°</h2>
                <p class="text-gray-500">${forecastWeatherConditions.text}</h1>
            </div>
          `)
            } 

        
      }
    })
  })