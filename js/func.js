//addicon
export function addicon(img) {
  let icon = document.getElementById("icon")

  icon.src = `http://openweathermap.org/img/w/${img}.png`;
}

//addtemp
export function addtemp(temp, feelslike, humidity) {
  let tempp = document.getElementById("tempp")
  let humidityp = document.getElementById("humidity")
  let feelslikep = document.getElementById("feelslike")
  tempp.innerText = `${temp}`;
  humidityp.innerText = `${humidity}`;
  feelslikep.innerText = `${feelslike}`;
}
//more1
export function addmore1(maxtemp,mintemp,grnd_level,description,pressure) {
  let maxtempp= document.getElementById("maxtemp")
  let mintempp= document.getElementById("mintemp")
  let grnd_levelp= document.getElementById("grnd_level")
  let descriptionp= document.getElementById("description")
  let pressurep = document.getElementById("pressure")
  
  maxtempp.innerText = `${maxtemp}`;
  mintempp.innerText = `${mintemp}`;
  grnd_levelp.innerText = `${grnd_level}`;
  descriptionp.innerText = `${description}`;
  pressurep.innerText = `${pressure}`;
}
//more2
export function addmore2(deg,speed,gust) {
  let degp = document.getElementById("winddeg")
  let speedp = document.getElementById("windspeed")
  let gustp = document.getElementById("windgust")
  degp.innerText = `${deg}`;
  speedp.innerText = `${speed}`;
  gustp.innerText = `${gust}`;
}
//more3
export function addmore3(name, timezone, lat,lon) {
  let namep = document.getElementById("name")
  let timezonep = document.getElementById("timezone")
  let latp = document.getElementById("lat")
  let lonp = document.getElementById("lon")
  
  namep.innerText = `${name}`;
  timezonep.innerText = `${timezone}`;
  latp.innerText = `${lat}`;
  lonp.innerText = `${lon}`;
}
//changema
export function changemap() {
  async function getlanlat() {
    let res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${input.value}&format=json&apiKey=bebd760660de4eb481f09d13d7e559cf`)

    let data = await res.json()

    return data
  }

  function showinmap(data) {
      //map
      let tempsection = document.querySelector(".tempsection")

      tempsection.removeChild(tempsection.children[1])
      //append map div
      var elem = document.createElement('div');
      elem.id = 'map'
      elem.className = "map"
      tempsection.appendChild(elem);

      var map = L.map('map').setView([data.results[0].lat, data.results[0].lon], 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 10,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWJkZWxyYWhtYW40NTUiLCJhIjoiY2wzM3llb2hlMHN2ZzNpbXc1Z3dxcHN6ZSJ9.HAdG3-KtgWJlp6Gtato2vg'
      }).addTo(map);

    }
    getlanlat().then(data => {
      showinmap(data)
    })
  }

//changeweather
export function changeweather() {
  //main object Api Informations
  let weather = {
    Api_Key: "5ba9e5618fd61f5267214ead8ede7cd4",
    units: "metric"
  }

  async function getWeather() {
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=${weather.units}&appid=${weather.Api_Key}`

    let response = await fetch(api)
    let data = await response.json()

    return data
  }

  function showweatherdata(data) {
    //auto get position map by search the placec
    addicon(data.weather[0].icon)
    addtemp(data.main.temp, data.main.feels_like, data.main.humidity)
    addmore1(data.main.temp_max,data.main.temp_min,data.main.grnd_level,data.weather[0].description,data.main.pressure)
    addmore2(data.wind.deg,data.wind.speed,data.wind.gust)
    addmore3(data.name,data.timezone,data.coord.lat,data.coord.lon)
  }

  getWeather().then(weatherdata => {
    showweatherdata(weatherdata)
  })
}
