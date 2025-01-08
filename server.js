import dotenv from "dotenv"; // Import dotenv
import express from "express"; // Import express
import fetch from "node-fetch"; // Import node-fetch

dotenv.config(); // Load .env variables

const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Define a route to fetch weather data
app.get("/weather", async (req, res) => {
  const city = req.query.city || "Austin";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
