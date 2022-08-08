let resID = []

resID=localStorage.getItem("resID");

const GetAllCategory = () => {
    fetch("https://localhost:7186/api/Category")
      .then((response) => response.json())
      .then((data) => SetCategoryNavbar(data));
};
  
const GetAllCity = () => {
    fetch("https://localhost:7186/api/City")
      .then((response) => response.json())
      .then((data) => SetCityDropdown(data));
};

const GetRestaurantDetail = () => {
    fetch(
        `https://localhost:7186/api/Restaurant/${resID}`
    )
    .then((response) => response.json())
    .then((data) => SetRestaurantDetail(data));
};

const GetRestaurantMenu = () => {
    fetch(
        `https://localhost:7186/api/Menu/restaurantid-${resID}`
    )
    .then((response) => response.json())
    .then((data) => SetRestaurantMenu(data));
};

const GetRestaurantMenuContent = () => {
    fetch(
        `https://localhost:7186/api/Menu/restaurantid-${resID}`
    )
    .then((response) => response.json())
    .then((data) => SetRestaurantMenuContent(data));
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

const SetRestaurantDetail = (restaurant) => { 
    const resImg=document.getElementsByClassName("detail-top-img")[0];
    const imgSrc=document.createElement("img")
    imgSrc.src=restaurant.restaurantImage
    resImg.appendChild(imgSrc)
    fetch(
        `https://localhost:7186/api/City/${restaurant.cityId}`
    )
    .then((response) => response.json())
    .then((data) => {
        const resCity=document.getElementsByClassName("restaurantCityDetail")[0]
        resCity.innerHTML=data.cityName
    });
    fetch(
        `https://localhost:7186/api/RestaurantType/${restaurant.restaurantTypeId}`
    )
    .then((response) => response.json())
    .then((data) => {
        const resType=document.getElementsByClassName("restaurantRestypeDetail")[0]
        resType.innerHTML=data.restaurantTypeName
    });
    const resName=document.getElementsByClassName("restaurantNameDetail")[0]
    resName.innerHTML=restaurant.restaurantName
    const restaurantNameh1=document.getElementsByClassName("restaurantNameh1")[0]
    restaurantNameh1.innerHTML=restaurant.restaurantName
    const restaurantAddress=document.getElementsByClassName("restaurantAddressdiv")[0]
    restaurantAddress.innerHTML=restaurant.restaurantAddress
    const restaurantStatus=document.getElementsByClassName("restaurant-status")[0]
    restaurantStatus.innerHTML=restaurant.status
};

const SetRestaurantMenu = (menus) =>
{
    const resMenu=document.getElementsByClassName("menu-restaurant-category")[0]
    menus.forEach(menu =>{
        const menuItem=document.createElement("div")
        menuItem.innerHTML=menu.menuName
        menuItem.style="padding: 5px;"
        resMenu.appendChild(menuItem)
    })
}

const SetRestaurantMenuContent = (menus) =>
{
    const menuContent=document.getElementsByClassName("menu-restaurant-detail")[0]
    menus.forEach(menu =>{
        const menuContentItem=document.createElement("div")
        menuContentItem.className="menu-restaurant-list"
        const menuGroup=document.createElement("div")
        menuGroup.className="menu-group"
        const menuTitle=document.createElement("div")
        menuTitle.className="title-menu"    
        menuTitle.innerHTML=menu.menuName
        menuGroup.appendChild(menuTitle)
        menuContentItem.appendChild(menuGroup)
        menuContent.appendChild(menuContentItem);
        fetch(
            `https://localhost:7186/api/Product/menuid-${menu.menuId}`
        )
        .then((response) => response.json())
        .then((data) => {
            data.forEach(product =>{
                const productItem=document.createElement("div")
                const productItemrow=document.createElement("div")
                const productItemImg=document.createElement("div")
                const productItemInfomation=document.createElement("div")
                const productItemPrice=document.createElement("div")
                const productItemInfomationName=document.createElement("h2")
                const productItemInfomationDesc=document.createElement("div")
                const productImgSrc=document.createElement("img")
                const priceItem=document.createElement("div")
                const productPriceInfo=document.createElement("div")
                const productPriceButton=document.createElement("div")
                const addProductButton=document.createElement("div") 
                productItem.className="item-restaurant-row"
                productItemrow.className="row"
                productItemImg.className="col-auto item-restaurant-img"
                productImgSrc.src=product.productImage
                productItemInfomation.className="col item-restaurant-info"
                productItemInfomationName.className="item-restaurant-name"
                productItemInfomationName.innerHTML=product.productName
                productItemInfomationDesc.className="item-restaurant-desc"
                productItemInfomationDesc.innerHTML=product.description
                productItemPrice.className="col-auto"
                priceItem.className="row"
                productPriceInfo.className="col-auto"
                productPriceInfo.innerHTML=product.productPrice+" đ"
                productPriceButton.className="col-auto txt-right"
                addProductButton.className="btn-adding"
                addProductButton.innerHTML="+"
                addProductButton.addEventListener("click",()=>{
                    const productModal = document.querySelector("#myModal2")
                    productModal.style="display:block;"
                    const modalInfoItem = document.getElementsByClassName("info-item-name")[0]
                    modalInfoItem.innerHTML=product.productName
                    const modalDescItem = document.getElementsByClassName("info-item-description")[0]
                    modalDescItem.innerHTML=product.description
                    const modalPriceItem = document.getElementsByClassName("info-item-price")[0]
                    modalPriceItem.innerHTML="Giá: "+product.productPrice+" đ"
                    const modalImgItem = document.getElementsByClassName("image-item float-left")[0]
                    modalImgItem.innerHTML=""
                    const modalImgSrcItem = document.createElement("img")
                    modalImgSrcItem.src=product.productImage
                    modalImgItem.appendChild(modalImgSrcItem)

                    fetch(
                        `https://localhost:7186/api/OptionType/detail-productid-${product.productId}`
                    )
                    .then((response) => response.json())
                    .then((data) =>{
                        const modalBody = document.querySelector("#modal-body-product")  
                        modalBody.innerHTML=""
                        data.forEach(optionType =>{
                            const modalOptionType = document.createElement("div")
                            const modalHr = document.createElement("div")
                            const modalHrOptionType = document.createElement("hr")
                            const modalOptionTypeList = document.createElement("div")
                            const modalItemSelectBody = document.createElement("div")
                            const modalItemselect=document.createElement("div")
                            const modalItemInput=document.createElement("input")
                            const modalItemName=document.createElement("div")
                            modalOptionTypeList.innerHTML=optionType.optionTypeName+" (Bắt buộc chọn 1 loại)"
                            modalOptionTypeList.style="font-weight: bold;"
                            modalItemSelectBody.className="clearfix"
                            modalItemselect.className="option-item float-left"
                            modalItemInput.type="checkbox"
                            modalItemInput.style="cursor: pointer;"
                            modalItemName.innerHTML=optionType.optionName
                            modalItemName.style="display: inline-block;"
                            modalItemselect.appendChild(modalItemInput)
                            modalItemselect.appendChild(modalItemName)
                            modalItemSelectBody.appendChild(modalItemselect)
                            modalOptionType.appendChild(modalOptionTypeList)
                            modalOptionType.appendChild(modalItemSelectBody)
                            modalHr.appendChild(modalHrOptionType)
                            modalBody.appendChild(modalHr)
                            modalBody.appendChild(modalOptionType)
                        })
                        var amount = 1;
                        const modalFooter=document.querySelector("#modal-footer-product")
                        modalFooter.innerHTML=""
                        const modalFooterleft=document.createElement("div")
                        const modalFooterright=document.createElement("div")
                        const footerButtonSub=document.createElement("button")
                        const footerAmount=document.createElement("span")
                        const footerButtonAdd=document.createElement("button")
                        const footerButtonAccept=document.createElement("button")
                        modalFooterleft.className="float-left"
                        modalFooterleft.style="margin: 20px"
                        modalFooterright.className="float-right"
                        modalFooterright.style="line-height: 50px;margin: 20px;"
                        footerButtonSub.innerHTML="-"
                        footerButtonAdd.innerHTML="+"
                        footerAmount.innerHTML=amount
                        var totalPrice=product.productPrice
                        footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                        footerButtonSub.addEventListener("click",()=>{
                            amount=amount-1
                            footerAmount.innerHTML=amount
                            totalPrice=totalPrice-product.productPrice
                            footerButtonAccept.innerHTML=""
                            footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                        });
                        footerButtonAdd.addEventListener("click",()=>{
                            amount=amount+1
                            footerAmount.innerHTML=amount
                            totalPrice=totalPrice+product.productPrice
                            footerButtonAccept.innerHTML=""
                            footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                        });
                        modalFooterright.appendChild(footerButtonAccept)
                        modalFooterleft.appendChild(footerButtonSub)
                        modalFooterleft.appendChild(footerAmount)
                        modalFooterleft.appendChild(footerButtonAdd)
                        modalFooter.appendChild(modalFooterleft)
                        modalFooter.appendChild(modalFooterright)
                    })
                })
                productPriceButton.appendChild(addProductButton)
                priceItem.appendChild(productPriceInfo)
                priceItem.appendChild(productPriceButton)
                productItemPrice.appendChild(priceItem)
                productItemImg.appendChild(productImgSrc)
                productItemInfomation.appendChild(productItemInfomationName)
                productItemInfomation.appendChild(productItemInfomationDesc)
                productItemrow.appendChild(productItemImg)
                productItemrow.appendChild(productItemInfomation)
                productItemrow.appendChild(productItemPrice)
                productItem.appendChild(productItemrow)
                menuContentItem.appendChild(productItem)
            })
        });
    })
}



GetAllCategory();
GetAllCity();
GetRestaurantDetail();
GetRestaurantMenu();
GetRestaurantMenuContent();