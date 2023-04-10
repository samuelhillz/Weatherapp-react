import react from 'react'
import './Weather.css'
import { useState } from 'react'



const Weather = () => {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const [date, setDate] = useState(new Date().toDateString())

    const apiKeys = 'ffe31be12d722e335f58bfe223670f09';

    const getCity = (e) => {
        setInput(e.target.value)

    }
    
    const getData = (e)=>{
       
        
        if(e.key ==='Enter' && input ===''){
            setErrorMsg('Input cannot be empty');
            setError(true);
        }
        if( e.key ==='Enter' && input !==''){
            setIsLoading(true)            
            setError(true)
           fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&&APPID=${apiKeys}`)
           .then((res)=>{
            if(!res.ok){
                throw Error( 'Failed to fetch data')
            }
            return res.json();
           })
           .then((data)=>{
            setWeather(data);
            setInput('')
            setError(false)
            setIsLoading(false)
           })
           .catch((err) =>{
            setError(true)
            setErrorMsg(err.message)
            setIsLoading(false);
           });
           
        };
        

    };

   


  return (
    <section className="wrapper">
        <section className='bg'>
        <div className="weather">
            <h1 className='app'>Weather App</h1>
            <p className='date'>{date}</p>
            
                <input type="text" value={input} onChange={getCity} onKeyPress={getData} placeholder='Search city name' />

            
            
            {error ? (
                <p className={errorMsg !== '' ? 'error': ''}>{errorMsg}</p>
            ): (
                <div className="data-container">
                <h1>{weather.name}, {weather.sys.country} </h1>
                <p>Temp: {Math.round(weather.main.temp)}°c </p>
                <p>Weather: {weather.weather[0]['main']}</p>
                <p>Temp Range: {Math.round(weather.main.temp_min)}°c / {Math.round(weather.main.temp_max)}°c </p>
            </div>

            )}
            {isLoading && <h3>Loading...</h3> }

            
        </div>
        
    
    
    
    
    
    </section>
    </section>
  )
}

export default Weather