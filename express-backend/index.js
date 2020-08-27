//Getting required modules
var dotenv = require('dotenv');
var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");

var request = require("request");
const API_URL = "api.openweathermap.org/data/2.5/weather?";
dotenv.config();
const API_KEY = process.env.API_KEY;



var app = express();
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json()


//Gets city name from frontend
//Makes request to OpenWeatherAPI
//Sends data back
app.post("/weather", jsonParser, async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var name = req.body.cityName;

    var fullURL = 'https://' + API_URL + 'q=' + name + API_KEY; //creates full URL needed to get data
    console.log(fullURL)
    axios.get(fullURL)
        .then(response => {

            res.send(response.data)
        })
        .catch(err => {
            console.log(err);
        });

});

//Gets latitude and longitude from frontend
//Makes request to OpenWeatherAPI
//Sends data back
app.post("/weather/local", jsonParser, async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var lat = req.body.lat; //gets city name from form
    var lon = req.body.lon;
    var fullURL = 'https://' + API_URL + 'lat=' + lat + '&lon=' + lon + API_KEY; //creates full URL needed to get data

    axios.get(fullURL)
        .then(response => {

            res.send(response.data)
        })
        .catch(err => {
            console.log(err);
        });

});
let port = process.env.port || 3001
app.listen(port);
console.log('Listening at port ' + port);