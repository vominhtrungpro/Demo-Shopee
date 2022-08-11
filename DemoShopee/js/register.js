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
        }
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
            .then(res=>{
                alert("Đăng ký thành công!");
            })
        }
    })
}

Submit()