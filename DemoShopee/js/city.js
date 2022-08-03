let citiesID = []



const GetAllCity = () => {
  fetch("https://localhost:7186/api/City")
    .then((response) => response.json())
    .then((data) => SetCityDropdown(data));
};

const GetAllCitySearch = () => {
    fetch("https://localhost:7186/api/City")
      .then((response) => response.json())
      .then((data) => SetCityDropdownSearch(data));
};


const SetCityDropdown = (cities) => { 
    const dropDown=document.querySelector("#myDropdown")
    cities.forEach(city => {
        const newItem=document.createElement("a")
        newItem.innerText=city.cityName
        newItem.id=city.cityId
        newItem.className="city-dropdown"
        dropDown.appendChild(newItem)
        const listRestaurant = document.querySelector("#top-list-restaurant")
        newItem.addEventListener("click", () =>{
            const category = document.getElementsByClassName("nav-item active")
            const categoryID = category[0].id
            listRestaurant.innerHTML="";
            if(categoryID)
            fetch(
                `https://localhost:7186/api/Restaurant/more-categoryid-${categoryID}-cityid-${city.cityId}`
            )
            .then((response) => response.json())
            .then((data) => {
                data.forEach(res=>{
                    const newRes=newItemContent(res.restaurantImage,res.restaurantName,res.restaurantAddress)
                    listRestaurant.appendChild(newRes)
                })
            });
            
        });
    });

};

const SetCityDropdownSearch =(cities) =>{
    const dropDownSearch=document.querySelector("#myDropdown3")
    cities.forEach(city => {
        const newItem=document.createElement("div")
        const newItemInput=document.createElement("input")
        const newItemLabel=document.createElement("label")

        newItem.className="filter-checkbox"
        newItem.id=city.cityId
        newItemInput.type="checkbox"
        newItemInput.className="city-checkbox"
        newItemInput.id=city.cityId
        newItemLabel.innerHTML=city.cityName

        newItem.appendChild(newItemInput)
        newItem.appendChild(newItemLabel)
        dropDownSearch.appendChild(newItem)

        newItemInput.addEventListener('change', function() {
            if(newItemInput.checked)
                {
                    citiesID=[...citiesID,newItemInput.id]
                }
            else 
                {
                    citiesID=citiesID.splice(newItemInput.id.indexOf(citiesID)+1,1)
                }
            if(citiesID.length!=0 || restaurantTypesID.length!=0)
            {
                GetListRestaurant()
            }
            if(citiesID.length==0 || restaurantTypesID.length==0)
            {
                GetAllRestaurantSearch()
            }
          });
    })
};

GetAllCity()
GetAllCitySearch()