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
            alert("Nhập sai password");
            return passwordItem.focus();
        }
        // if(!usernameItem.value)
        // {
        //     alert("Tên đăng nhập k được để trống!")
        //     return usernameItem.focus();
        // }
        // if(!passwordItem.value)
        // {
        //     alert("Password không được để trống!")
        //     return passwordItem.focus();
        // }
        // if(!fullnameItem.value)
        // {
        //     alert("Tên không được để trống!")
        //     return fullnameItem.focus();
        // }
        // if(!addressItem.value)
        // {
        //     alert("Địa chỉ không được để trống!")
        //     return addressItem.focus();
        // }
        // if(!phoneItem.value)
        // {
        //     alert("Số điện thoại không được để trống!")
        //     return phoneItem.focus();
        // }
        // if(!emailItem.value)
        // {
        //     alert("Email không được để trống!")
        //     return emailItem.focus();
        // }
        else
        {
            fetch("https://localhost:7186/api/Customer",{
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
                res.json()
                .then((msg)=>{
                    const errors=msg.errors
                    for(var k in errors) {
                        return alert(errors[k])
                    }
                })
            })
        }
    })
}

Submit()