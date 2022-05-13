//importing stanard
import { changeweather, changemap } from "./func.js"
//get elements
let input = document.getElementById("input")
let copyright = document.querySelector('.copyright') 
//show weather in currwnt position
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude
    let lan = position.coords.longitude
  
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&units=metric&appid=5ba9e5618fd61f5267214ead8ede7cd4`).then(res => res.json()).then(
    data => {
      input.value = data.name
      
      changemap()
      changeweather()
    })
  })
//search by clicking the search button
input.onchange = () => {
  //map
  changemap()
  //weather
  changeweather()
}
//standard
copyright.onclick = () => { alert("All rights reseved by Abdelrahman \n Hireme: abdelrahmanshaheen2007@gmail.com") }