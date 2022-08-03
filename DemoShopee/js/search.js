const GetListRestaurant = () =>{
    fetch("https://localhost:7186/api/Restaurant/listcityidrestauranttypeid",{
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body:(JSON.stringify({
            restaurantTypeId:restaurantTypesID,
            cityId:citiesID
        }))
    }).then(res=>res.json()).then(res=>{
            SetRestaurantSearch(res)
    })
}