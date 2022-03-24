import * as API from './API'
import * as DOM from './DOM'
import * as Utils from './Utils'
import '../style/style.css'
import '../assets/snowy.jpg'



// Variable Declarations/Initializations
let activeForecast = 'daily'
let hourlyStart = 0
let hourlyEnd = 8
let coordUrl
let coords
let weatherURL
let weatherdata

// Page Load Functions
async function initializePage (){
  console.log('Initializing Page')
  DOM.initialize()

  coordUrl = await API.getRequestCoordsUrl(48009)
  coords = await API.getCoordsByZip(coordUrl)
  weatherURL = await API.getRequestWeatherUrl(coords)
  weatherdata = await API.getWeatherData(weatherURL)

  console.log (weatherdata)
  DOM.setWeatherInformation(weatherdata, coords)
  DOM.setDailyForecast(weatherdata)
  DOM.setHourlyForecast(weatherdata, hourlyStart, hourlyEnd)
}
initializePage()

// Query Selectors
const dailyButton = document.querySelector('.daily-button')
const hourlyButton = document.querySelector('.hourly-button')
const forwardButton = document.querySelector('.forward-hourly')
const backButton = document.querySelector('.back-hourly')

document.body.style.backgroundImage = "url('../assets/snowy.jpg')"

// Event Listeners
dailyButton.addEventListener('click', () => {
  if(activeForecast=='hourly'){
    DOM.toggleForecast(activeForecast)
  activeForecast='daily'
  }
})
hourlyButton.addEventListener('click', () => {
  if(activeForecast=='daily'){
      DOM.toggleForecast(activeForecast) 
  activeForecast='hourly'
  }
})
forwardButton.addEventListener('click', () => {
  if(hourlyStart < 40) {
    hourlyStart+=8
    hourlyEnd+=8
  }
  DOM.setHourlyForecast(weatherdata, hourlyStart, hourlyEnd)
})
backButton.addEventListener('click', () => {
  if(hourlyStart > 0) {
    hourlyStart-=8
    hourlyEnd-=8
  }
  DOM.setHourlyForecast(weatherdata, hourlyStart, hourlyEnd)
})