const apiKey = '1af07cb078ea98c3b4b4661a1ba6f347'
const wURL = 'https://api.openweathermap.org/data/2.5/weather?'

const weather = document.querySelector('#weather-data')
const city = document.querySelector('#select-city')
const search = document.querySelector('button')

const getWeatherSearch = async (city) => {
  const cityWeather = `${wURL}q=${city}&appid=${apiKey}${unitF}`
  try {
    const response = await axios.get(cityWeather)
    currWeather = response.data
    toggleWeather(currWeather)
    return currWeather
  } catch (error) {
    console.error(error)
  }
}

function renderWeatherDataImperial(currWeather) {
  toggleWeatherBool = true
  let weatherInfo = `
    <section id='city'>
      <h1>${currWeather.name}</h1>
    </section>
    <section class="bottom">
      <div id="icon">
        <img src='http://openweathermap.org/img/wn/${currWeather.weather[0].icon}@4x.png'>
      </div>
    </section>
    <section id="current-temperature">
      <h4>Current Temperature</h4>
      <p id="temp"class="output">${currWeather.main.temp}˚F</p>
    </section>
    <section id="current-weather">
      <h4>Current Weather</h4>
      <p class="output">${currWeather.weather[0].main}</p>
    </section>
    <section id="humidity">
      <h4>Humidity</h4>
      <p class="output">${currWeather.main.humidity}%</p>
    </section>
    <section id="wind">
      <h4>Wind</h4>
      <p class="output">${currWeather.wind.speed} MPH</p>
    </section>
    <section id="prep">
      <h4>Preparation Suggestion</h4>
      <p class="output">${suggestions(currWeather)}</p>
    </section>
    `
    document.querySelector('#weather-data').insertAdjacentHTML('beforeend', weatherInfo)
    return weatherInfo
}

search.addEventListener('click', (e) => {
  e.preventDefault()
  const searchResult = document.querySelector('#location-search').value
  toggleWeatherBool = true
  getWeatherSearch(searchResult)
  removeElements(weather, city)
  document.querySelector('#location-search').value = ''
})

function removeElements(weather, city) {
  while (weather.lastChild) {
    weather.removeChild(weather.lastChild)
  } while (city.lastChild) {
    city.removeChild(city.lastChild)
  }
}

function renderWeatherDataMetric(currWeather) {
  let tempCel = ((currWeather.main.temp - 32) * (5 / 9)).toFixed(2)
  let windKPH = ((currWeather.wind.speed * 1.6)).toFixed(2)
  let weatherInfo = `
    <section id='city'>
      <h1>${currWeather.name}</h1>
    </section>
    <section class="bottom">
      <div id="icon">
        <img src='http://openweathermap.org/img/wn/${currWeather.weather[0].icon}@4x.png'>
      </div>
    </section>
    <section id="current-temperature">
      <h4>Current Temperature</h4>
      <p id="temp"class="output">${tempCel}˚C</p>
    </section>
    <section id="current-weather">
      <h4>Current Weather</h4>
      <p class="output">${currWeather.weather[0].main}</p>
    </section>
    <section id="humidity">
      <h4>Humidity</h4>
      <p class="output">${currWeather.main.humidity}%</p>
    </section>
    <section id="wind">
      <h4>Wind</h4>
      <p class="output">${windKPH} KPH</p>
    </section>
    <section id="prep">
      <h4>Preparation Suggestion</h4>
      <p class="output">${suggestions(currWeather)}</p>
    </section>
    `
    document.querySelector('#weather-data').insertAdjacentHTML('beforeend', weatherInfo)
    return weatherInfo
}

let toMetricButton = document.querySelector('.metric')
toMetricButton.addEventListener('click', () => {
  removeElements(weather, city)
  toggleWeatherBool = false
  toggleWeather(currWeather)
})

let toImperialButton = document.querySelector('.imperial')
toImperialButton.addEventListener('click', () => {
  removeElements(weather, city)
  toggleWeatherBool = true
  toggleWeather(currWeather)
})