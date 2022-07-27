const GetAllRestaurant = () => {
    fetch("https://localhost:7186/api/Restaurant/categoryid-1")
      .then((response) => response.json())
      .then((data) => SetRestaurant(data));
  };

const SetRestaurant = (restaurants) => {
    const listitem=document.querySelector("#top-list-restaurant")
    restaurants.forEach(restaurant => {
        const newItem=document.createElement("div")
        const newItem2=document.createElement("a")
        const newItem3=document.createElement("div")
        const newItem4=document.createElement("div")
        const imgItem=document.createElement("img")
        const infoItem=document.createElement("div")
        const contentItem=document.createElement("div")
        const h4Item=document.createElement("h4")
        const addrItem=document.createElement("div")

        newItem.className="item-restaurant"
        newItem.id=restaurant.restaurantId
        newItem2.className="item-content"
        newItem3.className="img-restaurant"
        infoItem.className="info-basic-res"
        contentItem.className="content-promotion"
        imgItem.src=restaurant.restaurantImage
        newItem4.className="info-restaurant"
        h4Item.className="name-res"
        h4Item.innerText=restaurant.restaurantName
        addrItem.className="address-res"
        addrItem.innerText=restaurant.restaurantAddress
        contentItem.innerText="Giảm món"

        infoItem.appendChild(h4Item)
        infoItem.appendChild(addrItem)
        newItem3.appendChild(imgItem)
        newItem4.appendChild(infoItem)
        newItem4.appendChild(contentItem)
        newItem2.appendChild(newItem3)
        newItem2.appendChild(newItem4)
        newItem.appendChild(newItem2)
        listitem.appendChild(newItem)
    });
};

GetAllRestaurant()