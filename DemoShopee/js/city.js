const GetAllCity = () => {
  fetch("https://localhost:7186/api/City")
    .then((response) => response.json())
    .then((data) => SetCityDropdown(data));
};

const SetCityDropdown = (cities) => {
    const dropDown=document.querySelector("#myDropdown")
    cities.forEach(city => {
        const newItem=document.createElement("a")
        newItem.innerText=city.cityName
        newItem.id="city"+city.cityId
        newItem.className="city-dropdown"
        dropDown.appendChild(newItem)
    });
};

GetAllCity()