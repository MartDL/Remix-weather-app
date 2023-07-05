import { Form, useActionData, useNavigation } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import {
  Avatar,
  Typography,
  Grid,
  Box,
  Paper,
  CssBaseline,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import backgroundImage from "../assets/login-image.jpg";
import { getUser, storeUser } from "~/utils/users";

export const meta = () => {
  return [
    { title: "Log in to Weather App" },
    { name: "description", content: "Weather App log in" },
  ];
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  if (username === "ipgautomotive" && password === "carmaker") {
    const user = {
      username,
      password,
    };
    await storeUser(user);
    return redirect("/homepage");
  } else {
    return { message: "Invalid user credentials!" };
  }
};

export const loader = async () => {
  const users = await getUser();
  return users;
};

export default function Index() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Form method="post">
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Form>
          {data && (
            <>
              <Alert severity="error">{data.message}</Alert>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
