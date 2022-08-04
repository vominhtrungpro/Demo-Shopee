const GetListRestaurant = () =>{
    fetch("https://localhost:7186/api/Restaurant/paging-cityids-restypeids",{
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body:(JSON.stringify({
            restaurantTypeIds:restaurantTypesID,
            cityIds:citiesID,
            page:pagesID
        }))
    }).then(res=>res.json()).then(res=>{
            SetRestaurantSearch(res)
    })
}

let pagesID = 1;

const pagesArray = ["<<","1","2","3","4","5","6","7","8",">>"]

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
    
}

SetPaging()

