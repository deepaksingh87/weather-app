const iconElement=document.querySelector(".weather-icon");
const locationIcon=document.querySelector(".location-icon");
const tempElement=document.querySelector(".temprature-value p");
const descElement=document.querySelector(".temprature-description p");
const locationElement=document.querySelector(".location p")
const notificationElement=document.querySelector(".notification");


var input =document.getElementById("search");
let city="";
let latitude=0.0;
let longitude=0.0;
input.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        city=input.value
        getSearchWeather(city)
        console.log(city)
    }
})
const weather={}
weather.temprature={
    unit: "celsius"
}
const KELVIN=273;
const key='5a7e8e4105cd3e63508dcddc2908e8e4'
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,shoError)
}
else{
    notificationElement.style.display='block';
    notificationElement.innerHTML="<p>browser does not show geolocation</p>"
}
function setPosition(position){
    latitude=position.coords.latitude
    longitude=position.coords.longitude
    getWeather(latitude,longitude)
}
locationIcon.addEventListener("click",function(event){
    console.log("hey");
    getWeather(latitude,longitude)
})
function shoError(error){
notificationElement.st.display='block'
notificationElement.innerHTML=`<p>${error.message}</p>`
}
function getSearchWeather(city){
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    fetch(api)
    .then(function(response){
        let data=response.json()
        return data
    }).then(function(data){
        weather.temprature.value=Math.floor(data.main.temp -KELVIN)
        weather.description=data.weather[0].description
        weather.iconId=data.weather.icon
        weather.city=data.name 
        weather.country=data.sys.country
    }).then(function(){
        dislayWeather()
    })
}
function getWeather(latitude,longitude){
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
    .then(function(response){
        let data=response.json()
        return data
    }).then(function(data){
        weather.temprature.value=Math.floor(data.main.temp -KELVIN)
        weather.description=data.weather[0].description
        weather.iconId=data.weather.icon
        weather.city=data.name 
        weather.country=data.sys.country
    }).then(function(){
        displayWeather()
    })
}
function displayWeather(){
    iconElement.innerHTML=`<img src="icons/icon${weather.iconId}.jpg"/>`
    tempElement.innerHTML=`${weather.temprature.value}*<span>C</span>`
    descElement.innerHTML=weather.description
    locationElement.innerHTML=`${weather.city}, ${weather.country}`
}