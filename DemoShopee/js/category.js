const GetAllCategory = () => {
  fetch("https://localhost:7186/api/Category")
    .then((response) => response.json())
    .then((data) => SetCategoryNavbar(data));
};

const SetCategoryNavbar = (categories) => {
  const navbar = document.querySelector("#category-nav");
  categories.forEach((category) => {
    const newItem = document.createElement("a");
    newItem.className = "nav-item";
    newItem.style = "padding: 10px 12px 21px;cursor: pointer;";
    newItem.innerHTML = category.categoryName;
    newItem.id = category.categoryId;
    // add event
    const listRestaurantType = document.querySelector("#restaurant-type-body");
    const listRestaurant = document.querySelector("#top-list-restaurant")
    newItem.addEventListener("click", () => {
    listRestaurantType.innerHTML = "";
    listRestaurant.innerHTML="";
    const all = document.createElement("a");
    all.href = "/search.html";
    all.className = "category-item";
    all.innerHTML = "All";
    listRestaurantType.appendChild(all) 
    fetch(
        `https://localhost:7186/api/RestaurantType/categoryid-${category.categoryId}`
    )
        .then((response) => response.json())
        .then((data) => {
          data.forEach(restype=>{
            const newRestaurantType=document.createElement("a")
            newRestaurantType.className="category-item"
            newRestaurantType.innerHTML=restype.restaurantTypeName
            //newRestaurantType.href=
            listRestaurantType.appendChild(newRestaurantType)
          })
        });
    fetch(
            `https://localhost:7186/api/Restaurant/categoryid-${category.categoryId}`
    )
        .then((response) => response.json())
        .then((data) => {
            data.forEach(res=>{
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
                resContent.className="item-content"
                // resContent.href=
                resImg.className="img-restaurant"
                resInfo.className="info-restaurant"
                imgItem.src=res.restaurantImage
                basicInfo.className="info-basic-res"
                contentPromo.className="content-promotion"
                h4.className="name-res"
                h4.innerHTML=res.restaurantName
                addrRes.className="address-res"
                addrRes.innerHTML=res.restaurantAddress
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
                listRestaurant.appendChild(newRes)
            })
        });
    });
    navbar.appendChild(newItem);
  });
};

GetAllCategory();
