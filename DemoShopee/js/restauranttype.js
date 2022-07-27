const GetAllRestaurantType = () => {
    fetch("https://localhost:7186/api/RestaurantType/categoryid-1")
      .then((response) => response.json())
      .then((data) => SetRestaurantType(data));
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

GetAllRestaurantType()