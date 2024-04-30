const lang = "fr";
const grid_item1 = document.querySelector(".grid-item1");

const weatherInfo = {
  location: "",
  temperature: "",
  description: "",
  icon: "",
};
async function getLocationData() {
  const location_value = document.getElementById("location-value").value;
  grid_item1.innerHTML = "";
  const loaderDiv = document.createElement("div");
  loaderDiv.setAttribute("id", "loader");
  grid_item1.appendChild(loaderDiv);

  try {
    const result = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=18f6a35ce8974f4db3162215241504&lang=${lang}&q=${location_value}`
    );
    const data = await result.json();
    console.log(data);
    setWeatherInfo(data);
    addToHtml();
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    // Gérer les erreurs ici
  }
}

function setWeatherInfo(data) {
  weatherInfo.location = data.location.name;
  weatherInfo.temperature = data.current.temp_c;
  weatherInfo.description = data.current.condition.text;
  weatherInfo.icon = data.current.condition.icon;
}
function addToHtml() {
  grid_item1.innerHTML = "";
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id", "content");

  const locationHeader = document.createElement("h2");
  locationHeader.setAttribute("id", "location");
  locationHeader.innerHTML = weatherInfo.location;

  const informationDiv = document.createElement("div");
  informationDiv.classList.add("information");

  const tempHeader = document.createElement("h3");
  tempHeader.setAttribute("id", "temp-c");
  tempHeader.innerHTML = `${weatherInfo.temperature}°C`;

  const weatherIconImg = document.createElement("img");
  weatherIconImg.setAttribute("id", "weather-icon");
  weatherIconImg.setAttribute("alt", "icon de soleil");
  weatherIconImg.setAttribute("src", `${weatherInfo.icon}`);

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.setAttribute("id", "description");
  descriptionParagraph.innerHTML = weatherInfo.description;

  // Ajouter les éléments au DOM
  informationDiv.appendChild(tempHeader);
  informationDiv.appendChild(weatherIconImg);

  contentDiv.appendChild(locationHeader);
  contentDiv.appendChild(informationDiv);
  contentDiv.appendChild(descriptionParagraph);

  // Ajouter le contenu au document
  grid_item1.appendChild(contentDiv);
}
// Fonction pour montrer le loader
function showLoader() {
  loader.style.display = "block";
}

// Fonction pour cacher le loader
function hideLoader() {
  loader.style.display = "none";
}
