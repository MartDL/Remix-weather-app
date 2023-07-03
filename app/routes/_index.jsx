import React, { useState } from "react";
import {
  useNavigate,
  useLoaderData,
  useActionData,
  Form,
} from "@remix-run/react";
import { redirect } from "@remix-run/node";
import {
  Alert,
  Avatar,
  Typography,
  Grid,
  Box,
  Paper,
  CssBaseline,
  TextField,
  Button,
} from "@mui/material";

export const meta = () => {
  return [
    { title: "Weather App" },
    { name: "description", content: "Weather App!" },
  ];
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  if (username === "ipgautomotive" && password === "carmaker") {
    return redirect("/homepage");
  } else {
    return null;
  }
};

export default function Index() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Form>
          {/* {loginError && (
            <>
              <Alert severity="error">
                Your log in credentials are incorrect!
              </Alert>
            </>
          )} */}
        </Box>
      </Grid>
    </Grid>
  );
}
