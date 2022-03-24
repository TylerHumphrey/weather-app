import * as API from './API'
import * as DOM from './DOM'
import * as Utils from './Utils'
import '../style/style.css'
import snowy from '../assets/snowy.jpg'



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
let background = snowy

console.log(snowy)
document.body.style.backgroundImage = 'url(' + snowy+ ')'


// Event Listeners
dailyButton.addEventListener('click', () => {
  if(activeForecast=='hourly'){
    dailyButton.classList.toggle('active-button')
    hourlyButton.classList.toggle('active-button')
    forwardButton.classList.toggle('hidden')
    backButton.classList.toggle('hidden')
    DOM.toggleForecast()
  activeForecast='daily'
  }
})
hourlyButton.addEventListener('click', () => {
  if(activeForecast=='daily'){
    dailyButton.classList.toggle('active-button')
    hourlyButton.classList.toggle('active-button')
    forwardButton.classList.toggle('hidden')
    backButton.classList.toggle('hidden')
    DOM.toggleForecast() 
  activeForecast='hourly'
  }
})
forwardButton.addEventListener('click', () => {
  if(hourlyStart < 40) {
    hourlyStart+=8
    hourlyEnd+=8
    backButton.classList.add('active-button')
  }
  if(hourlyStart == 40) {
    forwardButton.classList.remove('active-button')
  }
  DOM.setHourlyForecast(weatherdata, hourlyStart, hourlyEnd)
})
backButton.addEventListener('click', () => {
  if(hourlyStart > 0) {
    hourlyStart-=8
    hourlyEnd-=8
    forwardButton.classList.add('active-button')
  }
  if(hourlyEnd == 8) {
    backButton.classList.remove('active-button')
  }
  DOM.setHourlyForecast(weatherdata, hourlyStart, hourlyEnd)
})