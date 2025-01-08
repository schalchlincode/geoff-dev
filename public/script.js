// Function for the typing effect
function typeEffect(element, text, speed = 50) {
  let i = 0; // Start at the first character
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML = text.slice(0, i + 1); // Take and render the first i+1 characters
      i++; // Move to the next character
    } else {
      clearInterval(interval); // Stop the interval when all characters are displayed
    }
  }, speed); // Set the typing speed in milliseconds
}

// Function to fetch and display weather data
async function getWeather(city) {
  const weatherDiv = document.getElementById("weather");
  const cursor = document.getElementById("cursor");

  cursor.style.display = "inline"; // Show blinking cursor
  weatherDiv.innerHTML = "Loading weather data<span id='cursor'>_</span>";

  try {
    const response = await fetch(`/weather?city=${city}`);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    const weatherText = `
      Location: ${data.location.name}, ${data.location.region}<br>
      Temperature: ${data.current.temp_f}°F<br>
      Condition: ${data.current.condition.text}
    `;

    weatherDiv.innerHTML = ""; // Clear loading message
    typeEffect(weatherDiv, weatherText, 50); // Apply typing effect
  } catch (error) {
    console.error("Error:", error);
    weatherDiv.innerHTML = `Error: Could not load weather data.`;
  } finally {
    setTimeout(() => {
      cursor.style.display = "none"; // Hide blinking cursor after data loads
    }, 1000); // Keep cursor visible briefly after typing
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
