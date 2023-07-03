import { useState, useEffect } from "react";
import { CardContent, Typography, Card, Button } from "@mui/material";

export const loader = async ({}) => {
  const apiKey = "146c9c424f0d4006836143440232806";
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`
  );
  const data = await response.json();
  console.log("data", data);

  return data;
};

export const WeatherCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "146c9c424f0d4006836143440232806";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          setError(data.error.message);
        }
      } catch (error) {
        setError("An error occurred while fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  console.log("weatherData", weatherData);

  return (
    <div>
      <Card sx={{ width: 210, height: 290, margin: 1, padding: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* <img
              src={weatherData.current.condition.icon}
              alt="Image"
              style={{ width: '50%' }}
            /> */}
          <Button
            onClick={() => {}}
            sx={{ borderRadius: "50px", width: "20px", color: "#888" }}
          >
            {/* <CloseIcon /> */}
          </Button>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {city.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Condition: {city.condition}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Temperature: {city.temp}C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            humidity: {city.humidity} C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            precipitation: {city.precid} C
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
