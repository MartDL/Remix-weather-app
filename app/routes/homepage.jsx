import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { WeatherCard } from "../components/WeatherCard";
import {
  Typography,
  Alert,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";

export const loader = () => {
  const data = {
    locations: [
      {
        title: "London",
        condition: "Cloudy",
        temp: "28",
        humidity: "29",
        precid: "0",
      },
      {
        title: "Sheffield",
        condition: "Cloudy",
        temp: "28",
        humidity: "29",
        precid: "0",
      },
      {
        title: "Leicester",
        condition: "Cloudy",
        temp: "28",
        humidity: "29",
        precid: "0",
      },
      {
        title: "Manchester",
        condition: "Cloudy",
        temp: "28",
        humidity: "29",
        precid: "0",
      },
      {
        title: "Glasgow",
        condition: "Cloudy",
        temp: "28",
        humidity: "29",
        precid: "0",
      },
    ],
  };
  return data;
};

export const action = async ({ request }) => {
  const form = await request.formData();

  const title = form.get("title");
  console.log("title", title);
  return form;
};

function homepage() {
  const user = useRouteLoaderData("root");
  const data = useLoaderData();
  console.log("data", data);

  return (
    <>
      <Typography
        variant="h2"
        component="div"
        sx={{
          flexGrow: 1,
          backgroundColor: "#87CEEB",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          fontWeight: 500,
          color: "#fff",
        }}
      >
        Weather App
        <Button
          variant="outlined"
          onClick={() => {}}
          sx={{
            position: "absolute",
            top: "33px",
            right: "50px",
            backgroundColor: "#fff",
            color: "#888",
            "&:hover": {
              backgroundColor: "lightgray",
              border: "1px solid #888",
            },
          }}
        >
          Logout
        </Button>
      </Typography>
      <Container align="center">
        <Alert
          align="center"
          severity="success"
          m={2}
          onClose={() => {}}
          sx={{ width: "fit-content" }}
        >
          Welcome to the Weather App {user.username}!
        </Alert>
      </Container>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "100vw", justifyContent: "center" }}
      >
        <Typography
          variant="p"
          component="div"
          sx={{ flexGrow: 1, margin: "30px 0 10px 0" }}
        >
          Please select up to 5 cities to view.
        </Typography>
        <form method="POST">
          <div>
            <label>City</label>
            <input type="text" name="city" id="city" />
          </div>
          <button type="submit">Add City</button>
        </form>
        {/* <TextField
          id="outlined-basic"
          label="Enter city"
          variant="outlined"
          size="small"
          value={""}
          onChange={""}
          disabled={false}
        />
        <Button
          variant="contained"
          disabled={false}
          sx={{
            ml: 1,
            mb: 2,
            "&:hover": {
              color: "#fff",
              cursor: "pointer",
            },
          }}
          onClick={() => {}}
        >
          Add
        </Button>
        <Button
          variant="contained"
          disabled={false}
          sx={{
            ml: 2,
            mb: 2,
            "&:hover": {
              color: "#fff",
              cursor: "pointer",
            },
          }}
          onClick={() => {}}
        >
          Clear all
        </Button> */}
        {data.locations.map((city, index) => (
          <WeatherCard key={index} city={city} />
        ))}
      </Container>
    </>
  );
}

export default homepage;
