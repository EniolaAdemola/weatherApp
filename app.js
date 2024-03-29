const express = require("express");
const https = require("node:https");
// const { parse } = require("node:path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    
    const cityQuery =  req.body.cityName;
    const apiKey = "802def9dc4ba3e0337a31083a062fd4e";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityQuery + "&appid=" + apiKey + "&unit=" + unit;

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {

            // convert the data into a JSON format
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is corrently " + weatherDescription + "</p>")
            res.write("<h1>The Temperature in " + cityQuery + " is " + temp + " degree celsius</h1>")
            res.write("<img src =" + iconUrl + ">")
            res.send()
        });
    });
})




app.listen(3000, () => {
    console.log("App running at port 3000")
});