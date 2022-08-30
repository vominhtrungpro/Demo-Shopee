
let url = "http://113.161.231.116:8081/api"

const GetAllCategory = () => {
    fetch(url+"/Category")
      .then((response) => response.json())
      .then((data) => SetCategoryNavbar(data));
};

const GetAllCity = () => {
    fetch(url+"/City")
      .then((response) => response.json())
      .then((data) =>
      { 
        SetCityDropdown(data)
      } 
      );
};

const GetAllRestaurant = () => {
    fetch(url+"/Restaurant/more-categoryid-1-cityid-1")
      .then((response) => response.json())
      .then((data) => SetRestaurant(data));
};

const GetAllRestaurantType = () => {
    fetch(url+"/RestaurantType/categoryid-1")
      .then((response) => response.json())
      .then((data) => SetRestaurantType(data));
};

const UserIndentity =()=> {
    var button=document.querySelector("#login-logout-button")
    if(localStorage.getItem("CustomerID")==null)
    {
        button.innerHTML="Đăng nhập"
    }
    else
    {
        button.innerHTML="Đăng xuất"
        fetch(url+`/Customer/${localStorage.getItem("CustomerID")}`)
        .then((response)=>response.json())
        .then((data) => {
            button.innerHTML=data.customerFullname
            button.addEventListener("click", () => {
                localStorage.clear();
                window.location.href = "/homepage.html";
            })
        })
        
    }
}

  
const SetCategoryNavbar = (categories) => {
    const navbar = document.querySelector("#category-nav");
    categories.forEach((category) => {
      const newItem = document.createElement("a");
      newItem.className = "nav-item";
      newItem.style = "padding: 10px 12px 21px;cursor: pointer;";
      newItem.innerHTML = category.categoryName;
      newItem.id = category.categoryId;
      const listRestaurantType = document.querySelector("#restaurant-type-body");
      const listRestaurant = document.querySelector("#top-list-restaurant")
      newItem.addEventListener("click", () => {
        const city = document.getElementsByClassName("dropbtn dropdown-city")
        const cityID = city[0].id
      listRestaurantType.innerHTML = "";
      listRestaurant.innerHTML="";
      var elems = document.querySelector(".active");
      if(elems !==null){
      elems.classList.remove("active");
      }
      newItem.classList.add("active");
      const all = document.createElement("a");
      all.href = "/search.html";
      all.className = "category-item";
      all.innerHTML = "All";
      listRestaurantType.appendChild(all) 
      fetch(
          url+`/RestaurantType/categoryid-${category.categoryId}`
      )
          .then((response) => response.json())
          .then((data) => {
            data.forEach(restype=>{
              const newRestaurantType=document.createElement("a")
              newRestaurantType.className="category-item"
              newRestaurantType.id=restype.restaurantTypeId
              newRestaurantType.innerHTML=restype.restaurantTypeName
              newRestaurantType.addEventListener("click",function(){
                localStorage.setItem("ResTypeID", newRestaurantType.id);
                newRestaurantType.href="/search.html"
            })
              listRestaurantType.appendChild(newRestaurantType)
            })
          });
      fetch(
              url+`/Restaurant/more-categoryid-${category.categoryId}-cityid-${cityID}`
      )
          .then((response) => response.json())
          .then((data) => {
              data.forEach(res=>{
                const newRes=newItemContent(res.restaurantImage,res.restaurantName,res.restaurantAddress,res.restaurantId)
                      listRestaurant.appendChild(newRes) 
              })
          });
      });
      navbar.appendChild(newItem);
    });
    const firstCategory = document.getElementsByClassName("nav-item")[0]
    firstCategory.classList.add("active");
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
                url+`/Restaurant/more-categoryid-${categoryID}-cityid-${city.cityId}`
            )
            .then((response) => response.json())
            .then((data) => {
                data.forEach(res=>{
                    const newRes=newItemContent(res.restaurantImage,res.restaurantName,res.restaurantAddress,res.restaurantId)
                    listRestaurant.appendChild(newRes)
                })
            });
        });
    });

};

const SetRestaurant = (restaurants) => {
    const listitem=document.querySelector("#top-list-restaurant")
    restaurants.forEach(restaurant => {
        const newItem=newItemContent(restaurant.restaurantImage,restaurant.restaurantName,restaurant.restaurantAddress,restaurant.restaurantId)

        listitem.appendChild(newItem)
    });
};

const SetRestaurantType = (restauranttypes) => {
    const restype=document.querySelector("#restaurant-type-body")
    restauranttypes.forEach(restauranttype => {
        const newItem=document.createElement("a")
        newItem.className="category-item"
        newItem.innerText=restauranttype.restaurantTypeName
        newItem.id=restauranttype.restaurantTypeId
        restype.appendChild(newItem)
        newItem.addEventListener("click",function(){
            localStorage.setItem("ResTypeID", newItem.id);
            newItem.href="/search.html"
        })
    });
};
  
const newItemContent=(restaurantImage,restaurantName,restaurantAddress,restaurantId)=>{
    const newRes=document.createElement("div")
    const resContent=document.createElement("a")
    const resImg=document.createElement("div")
    const resInfo=document.createElement("div")
    const imgItem=document.createElement("img")
    const basicInfo=document.createElement("div")
    const contentPromo=document.createElement("p")
    const h4=document.createElement("h4")
    const addrRes=document.createElement("div")
    newRes.className="item-restaurant"
    newRes.id=restaurantId
    newRes.addEventListener("click",function(){
        localStorage.setItem("resID",newRes.id);
    })
    resContent.className="item-content"
    resContent.href = "/detail.html";
    resImg.className="img-restaurant"
    resInfo.className="info-restaurant"
    imgItem.src=restaurantImage
    basicInfo.className="info-basic-res"
    contentPromo.className="content-promotion"
    h4.className="name-res"
    h4.innerHTML=restaurantName
    addrRes.className="address-res"
    addrRes.innerHTML=restaurantAddress
    contentPromo.className="content-promotion"
    contentPromo.innerHTML="Giảm món"
    basicInfo.appendChild(h4)
    basicInfo.appendChild(addrRes)
    resImg.appendChild(imgItem)
    resInfo.appendChild(basicInfo)
    resInfo.appendChild(contentPromo)
    resContent.appendChild(resImg)
    resContent.appendChild(resInfo)
    newRes.appendChild(resContent)
    return newRes
}

UserIndentity();
GetAllCategory();
GetAllCity();
GetAllRestaurant();
GetAllRestaurantType();
localStorage.setItem("ResTypeID","");
localStorage.setItem("resID","");


