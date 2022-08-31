let resID = []

let totalPriceUncal = 0;

let totalPricePurchased = 0;

const purchasedinfo=""

let orderIDconfirm = 0;

var today = new Date();

let url = "http://113.161.231.116:8081/api"

resID=localStorage.getItem("resID");

function showFlashMessage(element) {
    var event = new CustomEvent('showFlashMessage');
    element.dispatchEvent(event);
};

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

const GetRestaurantDetail = () => {
    fetch(
        url+`/Restaurant/${resID}`
    )
    .then((response) => response.json())
    .then((data) => SetRestaurantDetail(data));
};

const GetRestaurantMenu = () => {
    fetch(
        url+`/Menu/restaurantid-${resID}`
    )
    .then((response) => response.json())
    .then((data) => SetRestaurantMenu(data));
};

const GetRestaurantMenuContent = () => {
    fetch(
        url+`/Menu/restaurantid-${resID}`
    )
    .then((response) => response.json())
    .then((data) => SetRestaurantMenuContent(data));
};

const ResetPurchased = () => {
    const resetBtn = document.querySelector("#reset-purchased-bt");
    resetBtn.addEventListener("click",()=>{
        const menuRight=document.querySelector("#menu-right");
        menuRight.innerHTML=""
        const priceAll=document.querySelector("#price-of-all");
        priceAll.innerHTML=""
        totalPriceUncal=0
    })
}

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
        url+`/City/${restaurant.cityId}`
    )
    .then((response) => response.json())
    .then((data) => {
        const resCity=document.getElementsByClassName("restaurantCityDetail")[0]
        resCity.innerHTML=data.cityName
    });
    fetch(
        url+`/RestaurantType/${restaurant.restaurantTypeId}`
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

const SetConfirmModal =() =>{
    const buttonConfirm=document.querySelector("#confirm-purchase-button")
    buttonConfirm.addEventListener("click",()=>{
        const confirmModal=document.querySelector("#myModal3")
        confirmModal.style="display:block;"
        fetch(
            url+`/Restaurant/${resID}`
        )
        .then((response) => response.json())
        .then((data) => {
            const senderName=document.querySelector("#sender-info-name")
            senderName.innerHTML=data.restaurantName
            const senderDesc=document.querySelector("#sender-info-description")
            senderDesc.innerHTML=data.restaurantAddress
            purchasedinfo.value1=data.restaurantAddress
        });
        fetch(
            url+`/Customer/${localStorage.getItem("CustomerID")}`
        )
        .then((response) => response.json())
        .then((data) =>{
            const receiverName=document.querySelector("#receiver-info-name")
            receiverName.innerHTML=data.customerFullname
            const receiverDesc=document.querySelector("#receiver-info-desc")
            receiverDesc.innerHTML=data.customerAddress
        });
        var itemPurchased=document.querySelectorAll(".item-purchased");
        const listPurchased=document.querySelector("#item-list-purchased")
        listPurchased.innerHTML=""
        totalPricePurchased=0
        itemPurchased.forEach((item)=>{
            const itemPurchasedInfo=document.createElement("div")
            itemPurchasedInfo.className=""
            itemPurchasedInfo.innerHTML="Tên:"+item.value1+". Số lượng:"+item.value2+". Option:"+item.value3+". Giá:"+item.value4
            itemPurchasedInfo.value=item.value5
            listPurchased.appendChild(itemPurchasedInfo)
            totalPricePurchased=totalPricePurchased+item.value4
        })
        const totalPricePurchasedItem=document.getElementsByClassName("total-price float-right")[0]
        totalPricePurchasedItem.innerHTML=""
        totalPricePurchasedItem.innerHTML=totalPricePurchased+" đ"
        const finaltotalPricePurchasedItem=document.getElementsByClassName("temp-fee float-right")[0]
        finaltotalPricePurchasedItem.innerHTML=""
        finaltotalPricePurchasedItem.innerHTML=totalPricePurchased+" đ"
    })
    const confirmButton=document.querySelector("#confirm-button")
        confirmButton.addEventListener("click",()=>{
            const receiverDesc=document.querySelector("#receiver-info-desc")
            var id = localStorage.getItem("CustomerID")
            if(id==null)
            {
                const flashMessages = document.querySelector("#flashMessage1");
                flashMessages.style="background-color: #e55353;"
                flashMessages.innerHTML = "Vui lòng đăng nhập!";
                return showFlashMessage(flashMessages);
            }
            if(totalPricePurchased==0)
            {
                const flashMessages = document.querySelector("#flashMessage1");
                flashMessages.style="background-color: #e55353;"
                flashMessages.innerHTML = "Vui lòng chọn món!";
                setTimeout(function(){location.href="detail.html"},2000);   
                showFlashMessage(flashMessages);
            }
            else
            {
                fetch(url+"/Order",{
                    method: 'POST', 
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:(JSON.stringify({
                        customerId:localStorage.getItem("CustomerID"),
                        totalPrice:totalPricePurchased,
                        timeOrder:today,
                        placeOrder:receiverDesc.innerHTML,
                        description:"test",
                        status:"Active"
                }))
            }).then(res=>res.json()).then(res=>{   
                const flashMessages = document.querySelector("#flashMessage1");
                flashMessages.style="background-color:  #2eb85c;"
                flashMessages.innerHTML = "Mua hàng thành công! Mã đơn hàng: "+res.orderId;
                showFlashMessage(flashMessages);
                setTimeout(function(){location.href="detail.html"} , 2000);   
                itemPurchased.forEach((item)=>{  
                    fetch(url+"/OrderDetail",{
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:(JSON.stringify({
                            orderId:res.orderId,
                            productId:item.value5,
                            amount:item.value2,
                            price:item.value4
                    }))
                })
                .then((res)=>{
                    if(!res.ok)
                    {
                        res.text().then((msg) => {
                            const flashMessages = document.querySelector("#flashMessage1");
                            flashMessages.style="background-color:  #e55353;"
                            if(msg=="Out of stock")
                            flashMessages.innerHTML = "Hàng đã hết. Vui lòng chọn món khác!";
                            showFlashMessage(flashMessages);
                            setTimeout(function(){location.href="detail.html"} , 2000);   
                           });
                    }
                    else
                    {
                        // const flashMessages = document.querySelector("#flashMessage1");
                        // flashMessages.style="background-color:  #2eb85c;"
                        // flashMessages.innerHTML = "Mua hàng thành công! ID Product: "+item.value5+".";
                        // showFlashMessage(flashMessages);
                    }
                })
            })
            })
            
            }
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
            url+`/Product/menuid-${menu.menuId}`
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
                        url+`/OptionType/detail-productid-${product.productId}`
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
                            modalItemInput.value=optionType.optionName
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
                        amount = 1;
                        const modalFooter=document.querySelector("#modal-footer-product")
                        modalFooter.innerHTML=""
                        const modalFooterleft=document.createElement("div")
                        const modalFooterright=document.createElement("div")
                        const footerButtonSub=document.createElement("button")
                        const footerAmount=document.createElement("input")
                        const footerButtonAdd=document.createElement("button")
                        const footerButtonAccept=document.createElement("button")
                        modalFooterleft.className="float-left"
                        modalFooterleft.style="margin: 20px"
                        modalFooterright.className="float-right"
                        modalFooterright.style="line-height: 50px;margin: 20px;"
                        footerButtonSub.innerHTML="-"
                        footerButtonAdd.innerHTML="+"
                        footerButtonAdd.style="margin-left :20px;padding: 15px"
                        footerButtonSub.style="margin-right :20px;padding: 15px"
                        footerAmount.style="font-size: 20px;width: 35px"
                        footerAmount.value=amount
                        var totalPrice=product.productPrice
                        footerButtonAccept.style="padding: 15px"
                        footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                        footerAmount.addEventListener("keyup",(e)=>{
                            var arr = ['1', '2', '3','4','5','6','7','8','9','0'];
                            if(!arr.includes(e.key))
                            {
                                footerAmount.value=footerAmount.value.substring(0,footerAmount.value.length-1)
                                amount=footerAmount.value;
                                totalPrice=0
                                totalPrice=product.productPrice*footerAmount.value
                                footerButtonAccept.innerHTML=""
                                footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                            }
                            if(footerAmount.value.length==3)
                            {
                                footerAmount.value=footerAmount.value.substring(0,footerAmount.value.length-1)
                                amount=footerAmount.value;
                                totalPrice=0
                                totalPrice=product.productPrice*footerAmount.value
                                footerButtonAccept.innerHTML=""
                                footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                            }
                            if(footerAmount.value==0||footerAmount.value=="")
                            {
                                footerAmount.value=1
                                amount=footerAmount.value;
                                totalPrice=0
                                totalPrice=product.productPrice*footerAmount.value
                                footerButtonAccept.innerHTML=""
                                footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                            }
                            else
                            {
                                amount=footerAmount.value;
                                totalPrice=0
                                totalPrice=product.productPrice*footerAmount.value
                                footerButtonAccept.innerHTML=""
                                footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                            }  
                        })
                        footerButtonSub.addEventListener("click",()=>{
                            amount=amount-1
                            if(amount==0)
                            {
                                return amount=1
                                
                            }
                            else
                            {
                                footerAmount.value=amount
                                totalPrice=totalPrice-product.productPrice
                                footerButtonAccept.innerHTML=""
                                footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                            }
                            
                        });
                        footerButtonAdd.addEventListener("click",()=>{
                            amount++
                            footerAmount.value=amount
                            totalPrice=totalPrice+product.productPrice
                            footerButtonAccept.innerHTML=""
                            footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                        });
                        footerButtonAccept.addEventListener("click",()=>{
                            const itemCompare=document.querySelectorAll("#item-purchased")
                            itemCompare.forEach(itemComparenos => {
                                if(itemComparenos.value1==product.productName)
                                {      
                                    amount=parseInt(amount)+itemComparenos.value2
                                    totalPrice=totalPrice+itemComparenos.value4
                                    totalPriceUncal=totalPriceUncal-itemComparenos.value4
                                    footerAmount.value=amount
                                    footerButtonAccept.innerHTML=""
                                    footerButtonAccept.innerHTML="Đồng ý + "+totalPrice+" đ"
                                    itemComparenos.remove();
                                }
                            });
                            var textinputs = document.querySelectorAll('input[type=checkbox]'); 
                            var itemOption=""
                            textinputs.forEach((textinput)=>{
                                if(textinput.checked==true)
                                {
                                    itemOption=itemOption+" "+textinput.value
                                }
                            })
                            const menuRight=document.querySelector("#menu-right");
                            const itemProductDetail=document.createElement("div")
                            const itemProductInfo=document.createElement("div")
                            const itemProductNote=document.createElement("div")
                            const itemProductAmountEdit=document.createElement("div")
                            const itemProductAmountSub=document.createElement("button")
                            const itemProductAmountText=document.createElement("span")
                            const itemProductAmountAdd=document.createElement("button")
                            const itemProductName=document.createElement("div")
                            const itemProductAmount=document.createElement("div")
                            const itemProductPrice=document.createElement("div")
                            itemProductDetail.style="text-align: left;"
                            itemProductDetail.className="item-purchased"
                            itemProductDetail.id="item-purchased"
                            itemProductDetail.value1=product.productName
                            itemProductDetail.value2=amount
                            
                            itemProductInfo.style="margin: 10px 5px;"
                            itemProductNote.className="item-note clearfix"
                            itemProductName.style="font-weight: bold;display: inline-block;"
                            itemProductName.innerHTML=product.productName+":"+itemOption+" "
                            itemProductName.className="item-purchased-name"
                            itemProductName.id="item-purchased-name"
                            itemProductAmount.style="font-weight: bold;display: inline-block;"
                            itemProductAmount.innerHTML=" Số lượng: "+amount
                            itemProductAmount.value=amount
                            itemProductAmount.id="amount-product-purchased"
                            itemProductPrice.className="float-right"
                            itemProductAmountEdit.className="float-left"
                            itemProductAmountSub.innerHTML="-"
                            itemProductAmountSub.style="margin-left: 10px;margin-right: 10px"
                            itemProductAmountText.innerHTML=amount
                            itemProductAmountAdd.innerHTML="+"
                            itemProductAmountAdd.style="margin-left: 10px;margin-right: 10px"
                            itemProductAmountSub.addEventListener("click", () => {
                                amount=amount-1
                                if(amount==0)
                                {
                                    return amount=1
                                }
                                else
                                {
                                    itemProductAmount.innerHTML=""
                                    itemProductAmount.innerHTML=" Số lượng: "+amount
                                    itemProductAmountText.innerHTML=amount
                                    itemProductPrice.innerHTML=""
                                    totalPriceUncal=totalPriceUncal-product.productPrice
                                    totalPrice=totalPrice-product.productPrice
                                    itemProductPrice.innerHTML=totalPrice+" đ"
                                    itemProductDetail.value2=amount
                                    itemProductDetail.value4=totalPrice
                                    const allProductPrice =document.querySelector("#price-of-all");
                                    allProductPrice.innerHTML=totalPriceUncal+" đ"
                                }   
                            })
                            itemProductAmountAdd.addEventListener("click", () => {
                                amount=amount+1
                                itemProductAmount.innerHTML=""
                                itemProductAmount.innerHTML=" Số lượng: "+amount
                                itemProductAmountText.innerHTML=amount
                                itemProductPrice.innerHTML=""
                                totalPriceUncal=totalPriceUncal+product.productPrice
                                totalPrice=totalPrice+product.productPrice
                                itemProductPrice.innerHTML=totalPrice+" đ"
                                itemProductDetail.value2=amount
                                itemProductDetail.value4=totalPrice
                                const allProductPrice =document.querySelector("#price-of-all");
                                allProductPrice.innerHTML=totalPriceUncal+" đ"
                            })
                            itemProductPrice.innerHTML=totalPrice+" đ"
                            itemProductDetail.value1=product.productName
                            itemProductDetail.value2=amount
                            itemProductDetail.value3=itemOption
                            itemProductDetail.value4=totalPrice
                            itemProductDetail.value5=product.productId
                            itemProductAmountEdit.appendChild(itemProductAmountSub)
                            itemProductAmountEdit.appendChild(itemProductAmountText)
                            itemProductAmountEdit.appendChild(itemProductAmountAdd)
                            itemProductName.appendChild(itemProductAmount)
                            itemProductNote.appendChild(itemProductAmountEdit)
                            itemProductNote.appendChild(itemProductPrice)
                            itemProductInfo.appendChild(itemProductName)
                            itemProductDetail.appendChild(itemProductInfo)
                            itemProductDetail.appendChild(itemProductNote)
                            menuRight.appendChild(itemProductDetail)
                            totalPriceUncal=totalPriceUncal+totalPrice
                            const allProductPrice =document.querySelector("#price-of-all");
                            allProductPrice.innerHTML=totalPriceUncal+" đ"
                            productModal.style="display:none;"
                        })
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
                if(product.amountStock==0)
                {
                    productItemInfomationDesc.innerHTML="Hết hàng"
                    addProductButton.remove();
                }
            })
        });
    })
}

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
ResetPurchased();
GetAllCategory();
GetAllCity();
GetRestaurantDetail();
GetRestaurantMenu();
GetRestaurantMenuContent();
SetConfirmModal();