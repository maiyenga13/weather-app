import React, { useState, useEffect, } from 'react';
import { Container, Image, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './CurrentWeather.css';
import thermometer from '../icons/thermometer.png';
import sunrise_pic from '../icons/sunrise.png';
import sunset_pic from '../icons/sunset.png';
import wind_pic from '../icons/wind.png';
import water from '../icons/water.png';

export default function CurrentWeather(props: any) {
    const [city, setCity] = useState("")
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)

    const [icon, setIcon] = useState("")
    const [desc, setDescr] = useState("")
    const [humidity, setHumidity] = useState(0)
    const [sunrise, setSunrise] = useState(0)
    const [sunset, setSunset] = useState(0)
    const [wind, setWind] = useState(0)
    const [cTemp, setCTemp] = useState(0)
    const [fTemp, setfTemp] = useState(0)
    const [isC, setIsC] = useState(false);
    const [cFeels, setCFeels] = useState(0);
    const [fFeels, setFFeels] = useState(0);


    useEffect(() => {

        //Gets city name or if the user wants to get
        //the local weather
        let cityName = props.match.params.city
        setCity(cityName);
        if (cityName === 'local') {
            getLocalWeather()
        } else {
            getWeather();
        }

        //Calls the backend to get weather data for that city
        async function getWeather() {
            let data = {
                cityName,
            };

            axios
                .post('http://localhost:3001/weather', data)
                .then((r) => {
                    console.log(r)
                    setData(r.data)
                })
                .catch(err => {
                    console.error(err);
                });
        }

        //Calls the backend to get weather data for the local area
        async function getLocalWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    setLat(pos.coords.latitude)
                    setLon(pos.coords.longitude)
                });

            } else { //If the user doesn't click to share location
                alert("Geolocation is not supported by this browser.");
                window.location.hash = "/"
            }
            let data = {
                lat: lat,
                lon: lon,
            };
            axios.post('http://localhost:3001/weather/local', data)
                .then((r) => {
                    setCity("Local Weather")
                    console.log(r.status)
                    setData(r.data)
                })
                .catch(err => {
                    console.error(err);
                });


        }
        //Updates the React states when given the response from the Weather API
        async function setData(weather_obj: any) {
            setCTemp(+toCelsius(weather_obj.main.temp).toFixed(0));
            setfTemp(+toFahrenheit(weather_obj.main.temp).toFixed(0));

            setHumidity(weather_obj.main.humidity)
            setWind(weather_obj.wind.speed)
            setDescr(weather_obj.weather[0].description)
            setIcon(weather_obj.weather[0].icon)
            setCFeels(+toCelsius(weather_obj.main.feels_like).toFixed(0));
            setFFeels(+toFahrenheit(weather_obj.main.feels_like).toFixed(0))

            //Converts the sunrise and sunset to 12-hour time
            let rise = new Date(weather_obj.sys.sunrise);
            let rise_hour = rise.getHours().toString();
            let rise_minute = (rise.getMinutes() > 10) ? (rise.getMinutes().toString()) : ("0" + rise.getMinutes().toString());
            let rise_string = rise_hour + ":" + rise_minute + " AM" as any;
            setSunrise(rise_string);
            let set = new Date(weather_obj.sys.sunset);
            let set_hour = set.getHours().toString();
            let set_minute = (set.getMinutes() > 10) ? (set.getMinutes().toString()) : ("0" + set.getMinutes().toString());
            let set_string = set_hour + ":" + set_minute + " PM" as any;
            setSunset(set_string);

        }
        //converts Kelvin to Celsius
        function toCelsius(temp: number) {
            return temp - 273.15;
        }

        //convers Kelvin to Fahrenheit
        function toFahrenheit(temp: number) {
            let cel_temp = toCelsius(temp);
            return ((cel_temp * 9) / 5) + 32;
        }


    }, [lat, lon, props.match.params.city])







    return (
        <Container fluid className='CurrentWeather-container' >
            <Button onClick={() => props.history.push('/')} className='home-btn'>Back</Button>
            <h1 className="city-text">{city}</h1>
            <h2 className='description'>{desc}</h2>
            <Card className='temp-card'>

                <Image className="icon" src={'http://openweathermap.org/img/wn/' + icon + '@2x.png'}></Image>
                <h1 className="temp-text">{(isC) ? (cTemp + "°C") : (fTemp + "°F")}</h1>
                <Button onClick={() => setIsC(true)} variant="primary" className='c-button'>Celsius</Button>
                <Button onClick={() => setIsC(false)} className='f-button'>Fahrenheit</Button>


            </Card>
            <Card className="feelsLike-card">
                <Container className="feelsLike-container">
                    <h2 className='feelsLike-text'>Feels Like</h2>
                    <h1 className='feelsTemp-text'>{(isC) ? (cFeels + "°C") : (fFeels + "°F")}</h1>
                </Container>
                <Image className='thermometer'
                    src={thermometer}
                ></Image>
            </Card>

            <Card className='sun-card'>
                <Container className='sunrise-container'><h2>Sunrise: </h2>
                    <Image className='sunrise' src={sunrise_pic}></Image>
                    <h2>{sunrise}</h2></Container>
                <div className='vl'></div>
                <Container className='sunset-container'>
                    <h2>Sunset: </h2>
                    <Image className='sunset' src={sunset_pic}></Image>
                    <h2>{sunset}</h2>
                </Container>

            </Card>
            <Card className='wind-card'>
                <h2 className='wind-text'>Wind Speed</h2>
                <Image src={wind_pic} className='wind'></Image>
                <h2 className='wind-text'>{wind + ' m/s'}</h2>
            </Card>
            <Card className='water-card'>
                <h2 className='water-text'>Humidity</h2>
                <Image className='water' src={water}></Image>
                <h2 className='water-text'>{humidity + '%'}</h2>

            </Card>
        </Container>
    )
}