const apiKey = '381244c481a34159bb3235607243006';
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';
const cardContainer = document.getElementById('cardContainer');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const userCard = document.getElementById('userChoice');
const alexCard = document.getElementById('alexCard');
const alexTemp = document.getElementById('alexTemp');
const alexDesc = document.getElementById('alexDesc');
const alexIcon = document.getElementById('alexicon');
const saintPetersburgCard = document.getElementById('saintPetersburgCard');
const saintpetersburgTemp = document.getElementById('saintpetersburgTemp');
const saintpetersburgDesc = document.getElementById('saintpetersburgDesc');
const saintpetersburgIcon = document.getElementById('saintpetersburgicon');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temp');
const descriptionElement = document.getElementById('desc');
const iconElement = document.getElementById('icon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        const loader = document.createElement("div");
        loader.className = "lds-heart"
        loader.innerHTML = `<div></div>`
        temperatureElement.innerText = "Made with";
        descriptionElement.innerText = "";
        descriptionElement.appendChild(loader);
        locationElement.innerText = "";
        iconElement.src = "";
        setTimeout(function(){
            loader.remove();
            fetchWeather(location);
        }, 3000)
        fadeOut(saintPetersburgCard);
        fadeOut(alexCard);
    }
});
addEventListener("DOMContentLoaded", (event) => {
    fetchOnLoad("Alexandria", "Saint Petersburg")
});
function fetchWeather(location) {
    const url = `${apiUrl}?key=${apiKey}&q=${location}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.location.name;
            temperatureElement.textContent = data.current.temp_c + '°C';
            descriptionElement.textContent = data.current.condition.text;
            iconElement.src = data.current.condition.icon;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = "We ran into a problem, are you sure the city exists?";
            temperatureElement.textContent = "";
            descriptionElement.textContent = "";
            iconElement.src = "";
        });
}

function fadeOut(elementID) {
    if(elementID != null) {
        elementID.style.transition = "opacity " + 2.5 + "s ease";
        elementID.style.opacity = 0;
        setTimeout(function() {
            elementID.parentNode.removeChild(elementID);
            cardContainer.style.gridTemplateColumns = "328px";
        }, 3000);
    }
}
function fetchOnLoad(location1, location2) {
    const url1 = `${apiUrl}?key=${apiKey}&q=${location1}`;
    const url2 = `${apiUrl}?key=${apiKey}&q=${location2}`;
    fetch(url1)
        .then(response => response.json())
        .then(data => {
            alexTemp.textContent = `${data.current.temp_c} °C`;
            alexDesc.textContent = data.current.condition.text;
            alexIcon.src = data.current.condition.icon;

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            console.log("Please contact administrator")
        });
    fetch(url2)
        .then(response => response.json())
        .then(data => {
            saintpetersburgTemp.textContent = `${data.current.temp_c} °C`;
            saintpetersburgDesc.textContent = data.current.condition.text;
            saintpetersburgIcon.src = data.current.condition.icon;

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            console.log("Please contact administrator")

        });
}