let restaurantTypesID = []

const GetAllRestaurantType = () => {
    fetch("https://localhost:7186/api/RestaurantType/categoryid-1")
      .then((response) => response.json())
      .then((data) => SetRestaurantType(data));
  };

const GetAllRestaurantTypeSearch = () => {
    fetch("https://localhost:7186/api/RestaurantType")
      .then((response) => response.json())
      .then((data) => SetRestaurantTypeSearch(data));
};

const SetRestaurantType = (restauranttypes) => {
    const restype=document.querySelector("#restaurant-type-body")
    restauranttypes.forEach(restauranttype => {
        const newItem=document.createElement("a")
        newItem.className="category-item"
        newItem.innerText=restauranttype.restaurantTypeName
        newItem.id=restauranttype.restaurantTypeId
        restype.appendChild(newItem)
    });
};

const SetRestaurantTypeSearch =(restauranttypes) =>{
    const dropDowntypeSearch=document.querySelector("#myDropdown4")
    restauranttypes.forEach(restauranttype => {
        const newItem=document.createElement("div")
        const newItemInput=document.createElement("input")
        const newItemLabel=document.createElement("label")

        newItem.className="filter-checkbox"
        newItem.id=restauranttype.restaurantTypeId
        newItemInput.type="checkbox"
        newItemInput.className="restauranttype-checkbox"
        newItemInput.id=restauranttype.restaurantTypeId
        newItemLabel.innerHTML=restauranttype.restaurantTypeName

        newItem.appendChild(newItemInput)
        newItem.appendChild(newItemLabel)
        dropDowntypeSearch.appendChild(newItem)
        newItemInput.addEventListener('change', function() {
            if(newItemInput.checked)
                {
                    restaurantTypesID=[...restaurantTypesID,newItemInput.id]
                }
            else 
                {
                    restaurantTypesID=restaurantTypesID.splice(newItemInput.id.indexOf(restaurantTypesID)+1,1)
                }
            if(citiesID.length!=0 || restaurantTypesID.length!=0)
            {
                GetListRestaurant()
            }   
            if(citiesID.length==0 || restaurantTypesID.length==0)
            {
                GetListRestaurant()
            }
          });
    });
};


GetAllRestaurantType()
GetAllRestaurantTypeSearch()