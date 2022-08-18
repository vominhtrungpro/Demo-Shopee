var myAssetsServer = "http://127.0.0.1:5500/resetpassword.html?id="

const forgetPassword =  () => {
    const submmitForgetpasswordButton=document.querySelector("#button-submit-forgetpassword")
    submmitForgetpasswordButton.addEventListener("click",()=>{
        const emailValue=document.querySelector("#input-email-value")
        fetch(
            `https://localhost:7186/api/Customer/getemail-${emailValue.value}`
        )
        .then((response)=>{
            if(!response.ok)
            {
                alert("sai email!")
            }
            else
            {
                alert("gửi thành công!")
                response.json().then((response)=>{
                    console.log(response);
            fetch("https://localhost:7186/api/Email",{
                method: 'POST',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:(JSON.stringify({
                    to:response.customerEmail,
                    subject:"Reset Email",
                    body:"Hi "+response.customerFullname+". This is your link to reset your password: "+"<a href="+myAssetsServer+response.customerId+">Click here</a>"+"<br>"+"Or just copy and paste this link into your browser: "+myAssetsServer+response.customerId
                }))
            })
        })
    }
    })
})
}

forgetPassword();