const apiKey = '156c948ff663e0dcef7a8dcb19efd432'

function getRequestCoordsUrl(zip) {
  return 'http://api.openweathermap.org/geo/1.0/zip?zip=' + zip + '&appid=' + apiKey
}

function getRequestWeatherUrl(coords) {
  return 'https://api.openweathermap.org/data/2.5/onecall?lat=' + coords.lat + '&lon=' + coords.lon + '&units=imperial&appid=' + apiKey
}

async function getCoordsByZip(url) {
  const response = await fetch(url)
  const coordData = await response.json()
  return coordData
}

async function getWeatherData(url) {
  const response = await fetch(url)
  const weatherData = await response.json()
  return weatherData
}

export { getRequestCoordsUrl, getRequestWeatherUrl, getCoordsByZip, getWeatherData }