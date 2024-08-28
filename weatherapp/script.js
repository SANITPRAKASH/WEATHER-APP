const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "fd80ded6bea8f2e47cc4222a16deb04b";

weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityinput.value.trim();

    if (city) {
        try {
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        } catch (error) {
            console.error(error);
            displayerror(error.message);
        }
    } else {
        displayerror("Please enter a city");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`; // Using metric units for Celsius
    const response = await fetch(apiurl);
    
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayweatherinfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${temp}°C`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    weatheremoji.textContent = getweatheremoji(id);

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid) {
    if (weatherid >= 200 && weatherid < 300) {
        return "⛈️"; // Thunderstorm
    } else if (weatherid >= 300 && weatherid < 500) {
        return "🌧️"; // Drizzle
    } else if (weatherid >= 500 && weatherid < 600) {
        return "🌧️"; // Rain
    } else if (weatherid >= 600 && weatherid < 700) {
        return "❄️"; // Snow
    } else if (weatherid >= 700 && weatherid < 800) {
        return "🌫️"; // Atmosphere (mist, fog, etc.)
    } else if (weatherid === 800) {
        return "☀️"; // Clear sky
    } else if (weatherid > 800) {
        return "☁️"; // Clouds
    } else {
        return "🌈"; // Default
    }
}

function displayerror(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
