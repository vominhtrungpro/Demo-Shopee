
const usernamesubmit=document.querySelector("#user-name")
const passwordsubmit=document.querySelector("#pass-word")

const Login = () =>{
    const submitButton = document.querySelector("#submit-button")
    submitButton.addEventListener("click",()=>{
        fetch("https://localhost:7186/api/Customer/login",{
            method: 'POST',
            mode: 'cors',
            credentials: "same-origin",
            headers:{
                'Content-Type': 'application/json'
            },
            body:(JSON.stringify({
                username:usernamesubmit.value,
                password:passwordsubmit.value
            }))
        }).then(res=>res.json()).then(res=>{
            localStorage.setItem("refreshToken", res.refreshToken.token);
            localStorage.setItem("Token", res.token);
            localStorage.setItem("CustomerID", res.customer.customerId);
            alert("Đăng nhập thành công!");
            
            fetch("https://localhost:7186/WeatherForecast",{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Authorization': 'bearer '+localStorage.getItem("Token"), 
                    'Content-Type': 'application/json'
                }
            }).then(res=>res.json())
            .then(res=>{
                console.log(res);
            })
        })
    })
}

Login()