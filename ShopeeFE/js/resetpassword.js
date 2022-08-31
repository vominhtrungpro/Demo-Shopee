function getParameter (parameterName) {
    let parameters = new URLSearchParams (window.location.search)
    return parameters.get( parameterName );
}

let url = "http://113.161.231.116:8081/api"

const resetPassword =  () => {
    const resetpasswordItem=document.querySelector("#input-password")
    const resetpasswordConfirmItem=document.querySelector("#input-confirmpassword")
    const resetpasswordButtonItem=document.querySelector("#submit-resetpassword")
    resetpasswordButtonItem.addEventListener("click",()=>{
        if(resetpasswordItem.value!=resetpasswordConfirmItem.value)
        {
            alert("nhập sai pass")
        }
        else
        {
            fetch(url+"/Customer/update-password",{
            method: 'PUT',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body:(JSON.stringify({
                customerId:getParameter("id"),
                customerPassword:resetpasswordItem.value,
                customerConfirmPassword:resetpasswordConfirmItem.value
            }))
        })
        alert("đổi mk thành công!")
        }
    })
    

}


resetPassword();

