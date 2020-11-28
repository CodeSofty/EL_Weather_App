
const apikey = "58f731d59f11a9e33904ddcf27e975da";
const search = document.getElementById('searchCity');

// On page load send new Request with Local Storage Data if Available
window.onload = async (event) => {
    if(localStorage.length === 0) {
        const defaultURL = createURL("hays,ks")
        const defaultData =  await fetchRequest(defaultURL);
        postInfo(defaultData)
    }else {
        const getLocalStore = localStorage.getItem("localStoreWeather");
        const localURL =  await createURL(getLocalStore);
        const localData =  await fetchRequest(localURL);
    postInfo(localData)
    }
}



// Click events for functionality of the app

// Starts a search procedure
search.addEventListener('click', (event) => {
    event.preventDefault();
    grabCurrentWeather();
})

// Starts a save to local storage
const saveLocal = document.getElementById('saveLocation');
saveLocal.addEventListener('click', (event) => {
    event.preventDefault();
    setLocalStore();

})

// Saving userInput to Local Storage
const setLocalStore  = () => {
    const userInput = document.getElementById('cityName').value;
    if (userInput==="") {
        alert("Please enter a city in the search field first");

    } else {
        localStorage.setItem("localStoreWeather", userInput);
    }
}




// Functionality for App

// Grab User Input and Pass To fetchRequest

const grabCurrentWeather = async () => {
    const input = document.getElementById('cityName').value;
    if(input === "") {
        alert("Please enter a city to run search");
    } else {
        const newURL = await createURL(input);
        const data = await fetchRequest(newURL);
postInfo(data);
    }
}

// Encode URL 
const createURL = (input, state) => {
    try{
    const URL = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${input},${state}&units=imperial&appid=${apikey}`);
    return URL
    }
    catch(e){
        console.log("There was an error while encoding the URL:", e.name, e.message);
    }
}

// Get JSON Response Using Fetch API with Encoded URL
const fetchRequest = async (newURL)  => {
    try{
        const response =  await fetch(`${newURL}`);
        if(response.status === 200) {
            const jsonData =  await response.json();
            return await jsonData;
        } else {
            console.log("The server status didn't return 200:", response.status);
        }
    } catch(e) {
        console.log("There was an error while trying to get a response from server:", e.name, e.message);
    }

}



// Post Requested Info to Page
const postInfo =  async (data) =>{
    try {
    const localIcon = document.getElementById('locWeatherIcon');
    localIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt= "an icon indicating weather conditions"> <br> ` +  Math.trunc(`${data.main.temp}`) +  `\u00B0 ` + `F <br>  ${data.weather[0].description}`;
    const setLocName = document.getElementById('location-Name').textContent = `${data.name}`;
    const setHumidity = document.getElementById('location-Humidity');
    setHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    const setFeelsLike = document.getElementById('feels_like');
    setFeelsLike.textContent = `Feels Like: ` +  Math.trunc(`${data.main.feels_like}`) + '\u00B0' + 'F';
    const setHiLo = document.getElementById('localHiLo');
    setHiLo.textContent = `High: ` + Math.trunc(`${data.main.temp_max}`) + '\u00B0' + 'F  ' + `  Low: ` +  Math.trunc(`${data.main.temp_min}`) + '\u00B0' + 'F';
    }

    catch(e){
        console.log("There was an error while posting to the page:", e.name, e.message);
    }
}
