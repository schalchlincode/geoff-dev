// Function to fetch and display weather data
async function getWeather(city) {
  const weatherDiv = document.getElementById("weather");
  try {
    const response = await fetch(`/weather?city=${city}`);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    weatherDiv.innerHTML = `
      Location: ${data.location.name}, ${data.location.region}<br>
      Temperature: ${data.current.temp_c}°C<br>
      Condition: ${data.current.condition.text}
    `;
  } catch (error) {
    console.error("Error:", error);
    weatherDiv.innerHTML = `Error: Could not load weather data.`;
  }
}

// Default city on page load
getWeather("Austin");

// Handle city search
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getWeather(city);
  }
});
