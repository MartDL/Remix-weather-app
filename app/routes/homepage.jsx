import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import {
  Typography,
  Alert,
  TextField,
  Grid,
  Button,
  Container,
} from "@mui/material";
import { WeatherCard } from "../components/WeatherCard";
import {
  getStoredLocations,
  storeLocation,
  clearAllLocations,
} from "~/utils/locations";
import { getUser, storeUser } from "~/utils/users";
import { useEffect, useRef } from "react";

export const action = async ({ request }) => {
  // TODO: move apiKey to .env
  const apiKey = "146c9c424f0d4006836143440232806";
  const existingLocations = await getStoredLocations();
  const form = await request.formData();
  const { _action, ...value } = Object.fromEntries(form);

  if (_action === "addCity") {
    if (existingLocations.length < 5) {
      const city = form.get("city");
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const storeCity = await response.json();
      const updateLocations = existingLocations.concat(storeCity);
      await storeLocation(updateLocations);
      return updateLocations;
    } else {
      return null;
    }
  }
  if (_action === "clearAll") {
    await clearAllLocations([]);
    return value;
  }
  if (_action === "deleteCity") {
    const updateLocations = existingLocations.filter(
      (item) => item.location.name !== value.id
    );
    await storeLocation(updateLocations);
    return value;
  }
  if (_action === "logout") {
    await storeUser([]);
    return redirect("/");
    return value;
  }
};

export const loader = async () => {
  const locations = await getStoredLocations();
  const user = await getUser();
  const data = {
    locations,
    user,
  };
  return data;
};

function homepage() {
  // access the data from a loader
  const data = useLoaderData();

  const navigation = useNavigation();
  // changes the state of the button whilst location is selected
  const addingCity = navigation.state === "submitting";

  const formRef = useRef();

  useEffect(() => {
    if (!addingCity) {
      formRef.current?.reset();
    }
  }, [addingCity]);

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
        <Form method="post">
          <input type="hidden" name="id" value="logout" />
          <Button
            type="submit"
            variant="contained"
            name="_action"
            value="logout"
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
        </Form>
      </Typography>
      <Container align="center">
        <Alert
          align="center"
          severity="success"
          m={2}
          sx={{ width: "fit-content" }}
        >
          Welcome to the Weather App {data.user.username}!
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
        <Form ref={formRef} method="post">
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
            name="_action"
            value="addCity"
            disabled={data.locations.length > 4}
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
        </Form>
        <Form method="post">
          <Button
            type="submit"
            name="_action"
            value="clearAll"
            variant="contained"
            disabled={data.locations.length === 0}
            sx={{
              ml: 1,
              mb: 2,
              "&:hover": {
                color: "#fff",
                cursor: "pointer",
              },
            }}
          >
            Clear all
          </Button>
        </Form>
        <Grid container spacing={1} justify="center" alignItems="center">
          {data.locations &&
            data.locations.map((city, index) => (
              <Grid item key={index}>
                <WeatherCard key={index} data={city} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default homepage;
