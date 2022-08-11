const forgetPassword =  () => {
    const submmitForgetpasswordButton=document.querySelector("#button-submit-forgetpassword")
    submmitForgetpasswordButton.addEventListener("click",()=>{
        const emailValue=document.querySelector("#input-email-value")
        fetch(
            `https://localhost:7186/api/Customer/getemail-${emailValue.value}`
        )
        .then((response) => response.json())
        .then((data) =>{
            fetch("https://localhost:7186/api/Email",{
                method: 'POST',
                mode: 'cors',
                headers:{
                    'Authorization': 'bearer '+localStorage.getItem("Token"), 
                    'Content-Type': 'application/json'
                },
                body:(JSON.stringify({
                    to:data.customerEmail,
                    subject:"Reset Email",
                    body:"http://127.0.0.1:5500/resetpassword.html?id="+data.customerId
                }))
            })
        })
    })
}

forgetPassword();