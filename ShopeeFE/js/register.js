let url = "http://113.161.231.116:8081/api"

function showFlashMessage(element) {
    var event = new CustomEvent('showFlashMessage');
    element.dispatchEvent(event);
  };

const Submit = () => {
    const submitItem=document.querySelector("#submit-button")
    submitItem.addEventListener("click",()=>{
        const usernameItem=document.querySelector("#user-name-input")
        const passwordItem=document.querySelector("#pass-word-input")
        const repasswordItem=document.querySelector("#re-pass-word-input")
        const fullnameItem=document.querySelector("#full-name-input")
        const addressItem=document.querySelector("#address-input")
        const phoneItem=document.querySelector("#phone-number-input")
        const emailItem=document.querySelector("#email-input")
        if(passwordItem.value!=repasswordItem.value)
        {
            const flashMessages = document.querySelector("#flashMessage1");
            flashMessages.style="background-color: #e55353;"
            flashMessages.innerHTML = "Mật khẩu không khớp!";
            return showFlashMessage(flashMessages);
        }
        if(!usernameItem.value)
        {
            const flashMessages = document.querySelector("#flashMessage1");
            flashMessages.style="background-color: #e55353;"
            flashMessages.innerHTML = "Tên đăng nhập không được để trống!";
            usernameItem.focus();
            return showFlashMessage(flashMessages);
        }
        if(!passwordItem.value)
        {
            const flashMessages = document.querySelector("#flashMessage1");
            flashMessages.style="background-color: #e55353;"
            flashMessages.innerHTML = "Mật khẩu không được để trống!";
            passwordItem.focus();
            return showFlashMessage(flashMessages);
        }
        if(!fullnameItem.value)
        {
            const flashMessages = document.querySelector("#flashMessage1");
            flashMessages.style="background-color: #e55353;"
            flashMessages.innerHTML = "Tên không được để trống!";
            fullnameItem.focus();
            return showFlashMessage(flashMessages);
        }
        if(!addressItem.value)
        {
            const flashMessages = document.querySelector("#flashMessage1");
            flashMessages.style="background-color: #e55353;"
            flashMessages.innerHTML = "Địa chỉ không được để trống!";
            addressItem.focus();
            return showFlashMessage(flashMessages);
        }
        if(!phoneItem.value)
        {
            const flashMessages = document.querySelector("#flashMessage1");
            flashMessages.style="background-color: #e55353;"
            flashMessages.innerHTML = "Số điện thoại không được để trống!";
            phoneItem.focus();
            return showFlashMessage(flashMessages);
        }
        if(!emailItem.value)
        {
            const flashMessages = document.querySelector("#flashMessage1");
            flashMessages.style="background-color: #e55353;"
            flashMessages.innerHTML = "Email không được để trống!";
            emailItem.focus();
            return showFlashMessage(flashMessages);
        }
        else
        {
            fetch(url+"/Customer",{
                method: 'POST',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:(JSON.stringify({
                    customerUsername:usernameItem.value,
                    customerPassword:repasswordItem.value,
                    customerFullname:fullnameItem.value,
                    customerAddress:addressItem.value,
                    customerPhone:phoneItem.value,
                    customerEmail:emailItem.value,
                    description:fullnameItem.value,
                    status:"Active"
                }))
            })
            .then((res)=>{
                if(!res.ok)
                res.text()
                .then((msg)=>{
                    const flashMessages = document.querySelector("#flashMessage1");
                    flashMessages.style="background-color: #e55353;"
                    flashMessages.innerHTML = msg;
                    return showFlashMessage(flashMessages);
                    
                })
                else
                {
                    const flashMessages = document.querySelector("#flashMessage1");
                    flashMessages.style="background-color: #2eb85c;"
                    flashMessages.innerHTML = "Đăng ký thành công!";
                    setTimeout(function(){location.href="login.html"} , 2000); 
                    return showFlashMessage(flashMessages);
                }
            })
        }
    })
}



Submit()