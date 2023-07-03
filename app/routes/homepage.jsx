import {
  useActionData,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import { Typography, Alert, TextField, Button, Container } from "@mui/material";
import { WeatherCard } from "../components/WeatherCard";

export const action = async ({ request }) => {
  const form = await request.formData();
  const city = form.get("city");

  const apiKey = "146c9c424f0d4006836143440232806";
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );
  const data = await response.json();

  return data;
};

function homepage() {
  // fetch the data from a loader in another route
  const user = useRouteLoaderData("root");

  // access the data from a loader
  const data = useLoaderData();

  // access data from an action
  const actionData = useActionData();

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
      </Typography>
      <Container align="center">
        <Alert
          align="center"
          severity="success"
          m={2}
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
          Please select to a city.
        </Typography>
        <form method="post">
          <TextField
            id="outlined-basic"
            label="Enter city"
            variant="outlined"
            name="city"
            size="small"
          />
          <Button
            type="submit"
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
          >
            Add
          </Button>
        </form>
        <WeatherCard />
      </Container>
    </>
  );
}

export default homepage;
