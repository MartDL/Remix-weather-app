import { CardContent, Typography, Card, Button } from "@mui/material";
import { Form } from "@remix-run/react";
import CloseIcon from "@mui/icons-material/Close";

export const WeatherCard = ({ data }) => {
  return (
    data && (
      <div>
        <Card sx={{ width: 210, height: 290, margin: 1, padding: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <img
              src={data.current.condition.icon}
              alt="Image"
              style={{ width: "50%" }}
            />
            <Form method="post">
              <input type="hidden" name="id" value={data.location.name} />
              <Button
                type="submit"
                name="_action"
                value="deleteCity"
                sx={{ borderRadius: "50px", width: "20px", color: "#888" }}
              >
                <CloseIcon />
              </Button>
            </Form>
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.location.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Condition: {data.current.condition.text}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Temperature: {data.current.temp_c}C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Humidity: {data.current.humidity} C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Precipitation: {data.current.precip_mm} C
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  );
};
