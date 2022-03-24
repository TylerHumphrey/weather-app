import { format, addDays, add, addHours } from 'date-fns'

// Initializing Functions
function initialize() {
  const wrapper = document.createElement('div')
  wrapper.classList.add('body-wrapper')
  document.body.appendChild(wrapper)

  const container = document.createElement('div')
  container.classList.add('body-container')
  wrapper.appendChild(container)

  const main = document.createElement('main')
  container.appendChild(main)

  main.appendChild( initCurrentWeather() )
  main.appendChild( initForecast() )

  console.log('Page Initialized')
}
function initCurrentWeather(){
  const currentWeather = document.createElement('div')
  currentWeather.classList.add('current-weather')

  currentWeather.appendChild( initWeatherInfo() )
  currentWeather.appendChild( initWeatherDetails() )

  return currentWeather
}
function initWeatherInfo() {
  const weatherInfo = document.createElement('div')
  weatherInfo.classList.add('weather-info')

  const description = document.createElement('div')
  description.classList.add('weather-description')
  weatherInfo.appendChild(description)

  const city = document.createElement('div')
  city.classList.add('city')
  weatherInfo.appendChild(city)

  const currentTemperature = document.createElement('div')
  currentTemperature.classList.add('current-temperature')
  weatherInfo.appendChild(currentTemperature)

  const currentWeatherIcon = document.createElement('img')
  currentWeatherIcon.classList.add('current-weather-icon')
  weatherInfo.appendChild(currentWeatherIcon)

  return weatherInfo
}
function initWeatherDetails() {
  const weatherDetails = document.createElement('div')
  const addWeatherDetail = (descClassName, descriptionText) => {
    const container = document.createElement('div')
    container.classList.add('detail-container')
    container.classList.add(descClassName)

    const description = document.createElement('div')
    description.classList.add('detail-description')
    description.textContent = descriptionText
    container.appendChild(description)

    const value = document.createElement('div')
    value.classList.add('detail-value')
    container.appendChild(value)

    return container
  }

  weatherDetails.classList.add('weather-details')

  weatherDetails.appendChild( addWeatherDetail('feels-like', 'Feels like ') )
  weatherDetails.appendChild( addWeatherDetail('humidity', 'Humidity') )
  weatherDetails.appendChild( addWeatherDetail('rain-chance', 'Chance of rain') )
  weatherDetails.appendChild( addWeatherDetail('wind-speed', 'Wind Speed') )

  return weatherDetails
}
function initForecast() {
  const forecast = document.createElement('div')
  forecast.classList.add('forecast')

  forecast.appendChild( initDailyForecast() )
  forecast.appendChild( initHourlyForecast() )

  const buttonContainer = document.createElement('div')
  
  const dailyButton = document.createElement('button')
  dailyButton.classList.add('daily-button')
  dailyButton.textContent = 'Daily'

  const hourlyButton = document.createElement('button')
  hourlyButton.classList.add('hourly-button')
  hourlyButton.textContent = 'Hourly'

  forecast.prepend(hourlyButton)
  forecast.prepend(dailyButton)

  return forecast
}
function initDailyForecast() {
  const dailyForecast = document.createElement('div')
  dailyForecast.classList.add('daily-forecast')

  for(let i=0; i<7; i++) {
    const day = document.createElement('div')
    day.classList.add('day'+i)
    const dayName = document.createElement('div')
    dayName.classList.add('day-name')
    const temperature = document.createElement('div')
    temperature.classList.add('temperature')
    const icon = document.createElement('img')
    icon.classList.add('daily-icon')
    day.appendChild(dayName)
    day.appendChild(temperature)
    day.appendChild(icon)
    dailyForecast.appendChild(day)
  }
  return dailyForecast
}
function initHourlyForecast() {
  const hourlyForecastContainer = document.createElement('div')
  hourlyForecastContainer.classList.add('hourly-forecast-container')
  hourlyForecastContainer.classList.add('hidden')
  const hourlyForecast = document.createElement('div')
  hourlyForecast.classList.add('hourly-forecast')

  const buttonContainer = document.createElement('div')
  const backButton = document.createElement('button')
  backButton.classList.add('back-hourly')
  backButton.textContent = '<'
  const forwardButton = document.createElement('button')
  forwardButton.classList.add('forward-hourly')
  forwardButton.textContent = '>'
  buttonContainer.appendChild(backButton)
  buttonContainer.appendChild(forwardButton)
  hourlyForecastContainer.appendChild(buttonContainer)

  for(let i=0;i<48; i++) {
    const hourContainer = document.createElement('div')
    hourContainer.classList.add('hour'+i)
    hourContainer.classList.add('hourly')
    hourContainer.classList.add('hidden')

    const time = document.createElement('div')
    time.classList.add('time')

    const temperature = document.createElement('div')
    temperature.classList.add('temperature')

    const icon = document.createElement('img')
    icon.classList.add('hourly-icon')

    hourContainer.appendChild(time)
    hourContainer.appendChild(temperature)
    hourContainer.appendChild(icon)
    hourlyForecast.appendChild(hourContainer)
  }
  hourlyForecastContainer.appendChild(hourlyForecast)

  return hourlyForecastContainer
}

// Setting Functions
function setWeatherInformation(weatherData, locationData) {
  const weatherDescription = document.querySelector('.weather-description')
  const city = document.querySelector('.city')
  const currentTemperature = document.querySelector('.current-temperature')
  const currentWeatherIcon = document.querySelector('.current-weather-icon')

  const feelsLike = document.querySelector('.feels-like>.detail-value')
  const humidity = document.querySelector('.humidity>.detail-value')
  const rainChance = document.querySelector('.rain-chance>.detail-value')
  const windSpeed = document.querySelector('.wind-speed>.detail-value')

  weatherDescription.textContent = weatherData.current.weather[0].description
  city.textContent = locationData.name
  currentTemperature.textContent = Math.round(weatherData.current.temp) + ' \u00B0F'
  currentWeatherIcon.src = 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon +  '@2x.png'

  feelsLike.textContent = Math.round(weatherData.current.feels_like) + ' \u00B0F'
  humidity.textContent = weatherData.current.humidity
  rainChance.textContent = weatherData.daily[0].pop*100 + '%'
  windSpeed.textContent = Math.round(weatherData.current.wind_speed) + ' mph'
} 

function setDailyForecast(weatherData) {
  const forecast = document.querySelector('.daily-forecast')
  for(let i = 0; i<7; i++) {
    const dayName = document.querySelector('.day' + i + '>.day-name')
    const dayTemp = document.querySelector('.day' + i + '>.temperature')
    const dayIcon = document.querySelector('.day' + i + '>.daily-icon')

    dayName.textContent = format(addDays(new Date(), i), "eeee")
    dayTemp.textContent = Math.round(weatherData.daily[i].temp.day) + ' \u00B0F'
    dayIcon.src = 'http://openweathermap.org/img/wn/' + weatherData.daily[i].weather[0].icon +  '.png'
  }
}

function setHourlyForecast(weatherData, startTime, endTime) {
  const hourlyForecast = document.querySelector('.hourly-forecast')
  const shownHours = document.querySelectorAll('.hourly-forecast>.active')
  shownHours.forEach((hour) => {
    hour.classList.toggle('hidden')
    hour.classList.toggle('active')
  })

  for(let i = startTime; i<endTime; i++) {
    const hourContainer = document.querySelector('.hour' + i)
    hourContainer.classList.toggle('hidden')
    hourContainer.classList.toggle('active')
    const time = document.querySelector('.hour' + i + '>.time')
    const temperature = document.querySelector('.hour' + i + '>.temperature')
    const icon = document.querySelector('.hour' + i + '>.hourly-icon')

    time.textContent = format(addHours(new Date(), i), "h aaa")
    temperature.textContent = Math.round(weatherData.hourly[i].temp) + ' \u00B0F'
    icon.src = 'http://openweathermap.org/img/wn/' + weatherData.hourly[i].weather[0].icon +  '.png'
  }
}

function toggleForecast(activeForecast) {
  const dailyForecast = document.querySelector('.daily-forecast')
  dailyForecast.classList.toggle('hidden')  
  const hourlyForecast = document.querySelector('.hourly-forecast-container')
  hourlyForecast.classList.toggle('hidden')
}

export { initialize, setWeatherInformation, setDailyForecast, setHourlyForecast, toggleForecast }