async function getWeather(day = 'today') {
  let city = document.getElementById("city").value;
  let apiKey = "266461cd3c24ecb524e318830fa41e1e"; // Replace with your OpenWeatherMap API key
  try {
    let weatherData;
    if(day === 'today') {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      let response = await fetch(url);
      if (!response.ok) { alert("City not found!"); return; }
      weatherData = await response.json();

      document.getElementById("cityName").textContent = weatherData.name;
      document.getElementById("date").textContent = "Date: " + new Date().toLocaleDateString();
      document.getElementById("temperature").textContent = "Temperature: " + weatherData.main.temp + "°C";
      document.getElementById("condition").textContent = "Weather: " + weatherData.weather[0].description;
      document.getElementById("humidity").textContent = "Humidity: " + weatherData.main.humidity + "%";
      document.getElementById("wind").textContent = "Wind Speed: " + weatherData.wind.speed + " m/s";
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

      setBackground(weatherData.weather[0].main);

    } else if(day === 'tomorrow') {
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      let response = await fetch(url);
      if (!response.ok) { alert("City not found!"); return; }
      weatherData = await response.json();

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tomorrowDate = tomorrow.toISOString().split("T")[0];
      let tomorrowData = weatherData.list.find(item => item.dt_txt.includes(tomorrowDate));

      document.getElementById("cityName").textContent = weatherData.city.name;
      document.getElementById("date").textContent = "Date: " + tomorrow.toLocaleDateString();
      document.getElementById("temperature").textContent = "Temperature: " + tomorrowData.main.temp + "°C";
      document.getElementById("condition").textContent = "Weather: " + tomorrowData.weather[0].description;
      document.getElementById("humidity").textContent = "Humidity: " + tomorrowData.main.humidity + "%";
      document.getElementById("wind").textContent = "Wind Speed: " + tomorrowData.wind.speed + " m/s";
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${tomorrowData.weather[0].icon}@2x.png`;

      setBackground(tomorrowData.weather[0].main);
    }

    document.getElementById("weatherCard").style.display = "block";

  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
}

// Change background based on weather
function setBackground(weatherMain) {
  if(weatherMain.includes("Cloud")) {
    document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
  } else if(weatherMain.includes("Rain")) {
    document.body.style.background = "linear-gradient(to bottom, #2980b9, #6dd5fa)";
  } else if(weatherMain.includes("Sun") || weatherMain.includes("Clear")) {
    document.body.style.background = "linear-gradient(to bottom, #fbc2eb, #a6c1ee)";
  } else if(weatherMain.includes("Snow")) {
    document.body.style.background = "linear-gradient(to bottom, #83a4d4, #b6fbff)";
  } else {
    document.body.style.background = "linear-gradient(to bottom, #74ebd5, #ACB6E5)";
  }
}