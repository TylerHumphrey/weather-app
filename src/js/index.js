import '../style/style.css'

async function getGeo(zip) {
  const response = await fetch('http://api.openweathermap.org/geo/1.0/zip?zip=' + zip + ',US&appid=156c948ff663e0dcef7a8dcb19efd432')
  const geoData = await response.json()
  console.log(geoData)
  return geoData
}
async function getWeather(geoData) {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ geoData.lat + '&lon=' + geoData.lon + '&units=imperial&appid=156c948ff663e0dcef7a8dcb19efd432')
  const weatherData = await response.json()
  console.log(weatherData)
  return weatherData
}
 async function displayLocalWeather(zip) {
  const container = document.querySelector('.local-weather')
  const geoData = await getGeo(zip)
  const weatherData = await getWeather(geoData)

  const description = document.createElement('div')
  description.classList.add('description')
  description.textContent = weatherData.weather[0].description
  container.appendChild(description)

  const city = document.createElement('div')
  city.classList.add('city')
  city.textContent = weatherData.name
  container.appendChild(city)

  const temperature = document.createElement('div')
  temperature.classList.add('current-temperature')
  temperature.textContent = weatherData.main.temp + ' °F'
  container.appendChild(temperature)
}
async function displayWeatherDetails(zip) {
  const container = document.querySelector('.local-weather-details')
  const geoData = await getGeo(zip)
  const weatherData = await getWeather(geoData)

  const feelsLike = document.createElement('div')
  feelsLike.classList.add('feels-like')
  feelsLike.textContent = 'Feels like ' + weatherData.main.feels_like
  container.appendChild(feelsLike)

  const humidity = document.createElement('div')
  humidity.classList.add('humidity')
  humidity.textContent = weatherData.main.humidity + '%'
  container.appendChild(humidity)
}

displayLocalWeather(48009)
displayWeatherDetails(48009)