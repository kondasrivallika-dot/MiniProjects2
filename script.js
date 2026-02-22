const button = document.getElementById("btn");

button.addEventListener("click", getWeather);

async function getWeather() {

  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  const apiKey = "PASTE_API_KEY_HERE";

  if(city === ""){
    result.innerHTML = "Enter city name!";
    return;
  }

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {

    result.innerHTML = "Loading...";

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod == 401){
      result.innerHTML = "Invalid API Key!";
      return;
    }

    if(data.cod == 404){
      result.innerHTML = "City not found!";
      return;
    }

    result.innerHTML = `
      <h3>${data.name}</h3>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

  } catch(error){
    result.innerHTML = "Internet or API problem!";
  }
}