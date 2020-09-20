const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const env = require('dotenv').config();

app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const city = req.body.cityName;
    const id = env.parsed.idKey;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + id + "&units=" + unit;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write("<p>The weather in " + city + " is currently " + description + "</p>");
            res.write('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="">');
            res.write("<h1>The temperature in " + city + " is " + temp + " degreesl</h1>");
            res.send();
        });
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
