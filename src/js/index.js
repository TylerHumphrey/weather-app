import * as API from './API'
import * as DOM from './DOM'
import * as Utils from './Utils'
import '../style/style.css'
import snowy from '../assets/backgrounds/snowy.jpg'
import sunny from '../assets/backgrounds/sunny.jpg'
import rain from '../assets/backgrounds/rain.jpg'

// Variable Declarations/Initializations
let activeForecast = 'daily'
let hourlyStart = 0
let hourlyEnd = 8
let coordUrl
let coords
let weatherURL
let weatherData

// Page Load Functions
async function initializePage (){
  console.log('Initializing Page')
  DOM.initialize()

  coordUrl = await API.getRequestCoordsUrl(48009)
  coords = await API.getCoordsByZip(coordUrl)
  weatherURL = await API.getRequestWeatherUrl(coords)
  weatherData = await API.getWeatherData(weatherURL)

  console.log (weatherData)
  DOM.setWeatherInformation(weatherData, coords)
  DOM.setDailyForecast(weatherData)
  DOM.setHourlyForecast(weatherData, hourlyStart, hourlyEnd)
  
  let weatherID = weatherData.current.weather[0].id
  console.log(weatherID)
  
  if(weatherID >= 200 && weatherID <= 232) {
    console.log('Thunderstorm')
    document.body.style.backgroundImage = 'url(' + rain+ ')'
  } else if (weatherID >= 300 && weatherID <= 321) {
    console.log('Drizzle')
    document.body.style.backgroundImage = 'url(' + rain+ ')'
  } else if(weatherID >= 500 && weatherID <= 531) {
    console.log('Rain')
    document.body.style.backgroundImage = 'url(' + rain+ ')'
  } else if(weatherID >= 600 && weatherID <= 622) {
    console.log('Snow')
    document.body.style.backgroundImage = 'url(' + snowy+ ')'
  } else if(weatherID >= 801 && weatherID <= 804) {
    console.log('Clouds')
    document.body.style.backgroundImage = 'url(' + sunny+ ')'
  } else if (weatherID = 800) {
    console.log('Clear Skies')
    document.body.style.backgroundImage = 'url(' + sunny+ ')'
  }

  
}
initializePage()

// Query Selectors
const dailyButton = document.querySelector('.daily-button')
const hourlyButton = document.querySelector('.hourly-button')
const forwardButton = document.querySelector('.forward-hourly')
const backButton = document.querySelector('.back-hourly')
let background = snowy

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
  DOM.setHourlyForecast(weatherData, hourlyStart, hourlyEnd)
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
  DOM.setHourlyForecast(weatherData, hourlyStart, hourlyEnd)
})