//api_key of open weather API
const api_key = 'your_api_key'


const input = document.querySelector('input');
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');




window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`;
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});

input.addEventListener('keydown', logKey);



function logKey(e) {
    if (e.keyCode===13){
        const city_name = e.target.value;
        // const base = `https://api.openweathermap.org/data/2.5/weather?q=London&APPID=78aa05e04c096b2b9d28c00dd1d7604d`;
        updateValue(city_name);
        
    }
  }


function updateValue(city_name){

    const base_url = "https://api.openweathermap.org/data/2.5/weather?";
    let query_parameter = new URLSearchParams({
        APPID: api_key,
        q: city_name,
        units:'metric',
    });
    
    fetch(base_url+query_parameter)
    .then((Response)=>{
        return Response.json();
    })
    .then((data)=>{
        updateData(data);
    })
  }


function updateData(data){
    console.log(data);
    const { temp } = data.main;
    const place = data.name;
    const { description, icon } = data.weather[0];
    const { sunrise, sunset } = data.sys;

    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const fahrenheit = (temp * 9) / 5 + 32;
    const sunriseGMT = new Date(sunrise * 1000);
    const sunsetGMT = new Date(sunset * 1000);

    // Interacting with DOM to show data
    iconImg.src = iconUrl;
    loc.textContent = `${place}`;
    desc.textContent = `${description}`;
    tempC.textContent = `${temp.toFixed(2)} °C`;
    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
}

