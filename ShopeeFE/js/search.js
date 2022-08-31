const pagesArray = ["<<","1","2","3","4","5","6","7","8",">>"]

let citiesID = []

let restaurantTypesID = []

let url = "http://113.161.231.116:8081/api"

if (localStorage.getItem("ResTypeID")!="") {
    restaurantTypesID=[localStorage.getItem("ResTypeID")]
}
else
{
    restaurantTypesID=[]
}


let pagesID = 1;

const GetAllCategory = () => {
    fetch(url+"/Category")
      .then((response) => response.json())
      .then((data) => SetCategoryNavbar(data));
};
  
const GetAllCity = () => {
    fetch(url+"/City")
      .then((response) => response.json())
      .then((data) => SetCityDropdown(data));
};

const GetListRestaurant = () =>{
    fetch(url+"/Restaurant/paging-with-textcityIdsrestypeIds",{
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body:(JSON.stringify({
            restaurantTypeIds:restaurantTypesID,
            cityIds:citiesID,
            text:localStorage.getItem("restaurantName"),
            page:pagesID
        }))
    }).then(res=>res.json()).then(res=>{
            SetRestaurantSearch(res)
    }) 
}

const GetAllRestaurantSearch = () => {
    fetch(url+"/Restaurant")
      .then((response) => response.json())
      .then((data) => GetListRestaurant(data));
};

const GetAllCitySearch = () => {
    fetch(url+"/City")
      .then((response) => response.json())
      .then((data) => SetCityDropdownSearch(data)); 
};

const GetAllRestaurantTypeSearch = () => {
    fetch(url+"/RestaurantType")
      .then((response) => response.json())
      .then((data) => SetRestaurantTypeSearch(data));
};


const SetCategoryNavbar = (categories) => {
    const navbar = document.querySelector("#category-nav");
    categories.forEach((category) => {
      const newItem = document.createElement("a");
      newItem.className = "nav-item";
      newItem.style = "padding: 10px 12px 21px;cursor: pointer;";
      newItem.innerHTML = category.categoryName;
      newItem.id = category.categoryId;
      newItem.addEventListener("click", () => {
      var elems = document.querySelector(".active");
      if(elems !==null){
      elems.classList.remove("active");
      }
      newItem.classList.add("active");
      });
      navbar.appendChild(newItem);
    });
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
    });
};

const SetPaging =() => {
    const pageSearch = document.querySelector("#myPages");
    pagesArray.forEach(page => {
        const newItem=document.createElement("li")
        const aSearch=document.createElement("a")
        newItem.className="pagination-item"
        newItem.id=page.toString()
        aSearch.innerHTML=page.toString()
        newItem.appendChild(aSearch)
        pageSearch.appendChild(newItem)
        aSearch.addEventListener("click",()=>{
            var elems = document.querySelector(".active");
            if(elems !==null){
                elems.classList.remove("active");
            }
            newItem.classList.add("active");
            pagesID=""
            pagesID=aSearch.innerHTML
            GetListRestaurant()
        })
    });
    const firstPage = document.getElementsByClassName("pagination-item")[1]
    firstPage.classList.add("active");
}

const SetRestaurantSearch = (restaurants) => {
    const listitem=document.querySelector("#top-list-restaurant-search")
    listitem.innerHTML=""
    restaurants.forEach(restaurant => {
        const newItem=newItemContentSearch(restaurant.restaurantImage,restaurant.restaurantName,restaurant.restaurantAddress)
        listitem.appendChild(newItem)
        newItem.addEventListener("click",function(){
            localStorage.setItem("resID",restaurant.restaurantId);
            window.location.href="/detail.html";
        })
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
                GetListRestaurant()
            }
          });
    })
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
        if(newItemInput.id==localStorage.getItem("ResTypeID"))
            newItemInput.checked=true
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

const newItemContentSearch=(restaurantImage,restaurantName,restaurantAddress)=>{
    const newItem=document.createElement("div")
    const newItemContent=document.createElement("a")
    const newItemImg=document.createElement("div")
    const newItemInfo=document.createElement("div")
    const newItemImgsrc=document.createElement("img")
    const infores=document.createElement("div")
    const contentres=document.createElement("div")
    const h4res=document.createElement("h4")
    const address=document.createElement("div")
    


    newItem.className="item-restaurant"
    newItemContent.className="item-content"
    newItemImg.className="img-restaurant"
    newItemInfo.className="info-restaurant"
    newItemImgsrc.src=restaurantImage
    infores.className="info-res-top"
    contentres.className="content-restaurant"
    contentres.innerHTML="Giảm món"
    h4res.className="name-restaurant"
    h4res.innerHTML=restaurantName
    address.className="address-restaurant"
    address.innerHTML=restaurantAddress


    infores.appendChild(h4res)
    infores.appendChild(address)
    newItemInfo.appendChild(infores)
    newItemInfo.appendChild(contentres)
    newItemImg.appendChild(newItemImgsrc)
    newItemContent.appendChild(newItemImg)
    newItemContent.appendChild(newItemInfo)
    newItem.appendChild(newItemContent)
    return newItem
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
  

UserIndentity();
GetAllCategory();
GetAllCity();
SetPaging();
GetAllRestaurantSearch();
GetAllCitySearch();
GetAllRestaurantTypeSearch();
