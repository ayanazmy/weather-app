//api ==> https://api.weatherapi.com/v1/forecast.json?key=c7e2ff2508c8495fbbf71549221306&q=cairo&days=3

const day_1_name = document.querySelector(".day-1 .weekday");
const day_1_date = document.querySelector(".day-1 .date");
const day_1_city = document.querySelector(".day-1 .city");
const day_1_temp = document.querySelector(".day-1 .temperature")
const day_1_condition_text = document.querySelector(".day-1 .condition .text");
const day_1_condition_icon = document.querySelector(".day-1 .condition .icon img");
const day_1_wind_kph = document.querySelector(".day-1 .wind-kph span");
const day_1_wind_dir = document.querySelector(".day-1 .wind-dir span");

const day_2_name = document.querySelector(".day-2 .day");
const day_2_condition_text = document.querySelector(".day-2 .condition");
const day_2_condition_icon = document.querySelector(".day-2 .icon img");
const day_2_max_temp = document.querySelector(".day-2 .max-temp");
const day_2_min_temp = document.querySelector(".day-2 .min-temp");

const day_3_name = document.querySelector(".day-3 .day");
const day_3_condition_text = document.querySelector(".day-3 .condition");
const day_3_condition_icon = document.querySelector(".day-3 .icon img");
const day_3_max_temp = document.querySelector(".day-3 .max-temp");
const day_3_min_temp = document.querySelector(".day-3 .min-temp");

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search .search-icon");

searchInput.value = "";

const weekDays = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

function getFullDate(dateObject) {
    const day = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
}


async function getWeather(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            day_1_name.innerHTML = weekDays[new Date(data.location.localtime).getDay()];
            day_1_date.innerHTML = getFullDate(new Date(data.location.localtime));
            day_1_city.innerHTML = data.location.name;
            day_1_temp.innerHTML = `${data.current.temp_c}<sup>o</sup> C`;
            day_1_condition_text.innerHTML = data.current.condition.text;
            day_1_condition_icon.src = data.current.condition.icon;
            day_1_wind_kph.innerHTML = data.current.wind_kph;
            day_1_wind_dir.innerHTML = data.current.wind_dir;

            day_2_name.innerHTML = weekDays[new Date(data.location.localtime).getDay() + 1];
            day_2_max_temp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup> C`;
            day_2_min_temp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup> C`;
            day_2_condition_icon.src = data.forecast.forecastday[1].day.condition.icon;
            day_2_condition_text.innerHTML = data.forecast.forecastday[1].day.condition.text;

            day_3_name.innerHTML = weekDays[new Date(data.location.localtime).getDay() + 2];
            day_3_max_temp.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup> C`;
            day_3_min_temp.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup> C`;
            day_3_condition_icon.src = data.forecast.forecastday[2].day.condition.icon;
            day_3_condition_text.innerHTML = data.forecast.forecastday[2].day.condition.text;
        }).catch(err => console.log("data is still loading"));
}



getWeather(`https://api.weatherapi.com/v1/forecast.json?key=c7e2ff2508c8495fbbf71549221306&q=cairo&days=3`);

async function searchWeather(searchValue) {
    getWeather(`https://api.weatherapi.com/v1/forecast.json?key=c7e2ff2508c8495fbbf71549221306&q=${searchValue}&days=3`);
}

searchInput.addEventListener("input", () => {
    searchWeather(searchInput.value);
});

searchBtn.addEventListener("click", () => {
    searchWeather(searchInput.value)
});
