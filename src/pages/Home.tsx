import React, { useState } from 'react';
import '../text.scss';
import { Container, FormControl, FormLabel, Button } from 'react-bootstrap';
import './Home.css';


export default function Home(props: any) {
    const [cityName, setCityName] = useState("")

    //If user wants to get their local weather
    async function getLocal() {
        props.history.push("/weather/local");
    }

    //If user wants to get a particular city
    async function getCity() {
        props.history.push('/weather/' + cityName);
    }

    return (
        <Container className='Home-container'>
            <Container className="local-container">
                <h1 className='title-text'>Get Local Weather</h1>
                <Button className="local-btn" onClick={getLocal}>Get Local Weather</Button>
            </Container>

            <Container className='search-container'>
                <h1 className='title-text'>Search For A City</h1>
                <form onSubmit={getCity}>
                    <FormLabel className='form-label'>
                        Enter city name here:
                </FormLabel>
                    <FormControl className='form-control' onChange={e => setCityName(e.target.value)}></FormControl>
                    <Button type='submit' className='submit-btn'>Get Weather</Button>
                </form>
            </Container>
            <div className='v-l'></div>
        </Container>
    );
}