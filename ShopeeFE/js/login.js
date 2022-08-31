let url = "http://113.161.231.116:8081/api"

const usernamesubmit = document.querySelector("#user-name");
const passwordsubmit = document.querySelector("#pass-word");

function showFlashMessage(element) {
  var event = new CustomEvent('showFlashMessage');
  element.dispatchEvent(event);
};


window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("#submit-button").click();
  }
});

const Login = () => {
  const submitButton = document.querySelector("#submit-button");
  passwordsubmit.addEventListener("focus",()=>{
    fetch(url+"/Customer/login-checkpass", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernamesubmit.value,
        password: passwordsubmit.value,
      }),
    }).then((res)=>{
      if(!res.ok)
      res.text().then((msg)=>{
        const flashMessages = document.querySelector("#flashMessage1");
        flashMessages.style="background-color: #e55353;"
        if(msg=="User not found!")
        {
          flashMessages.innerHTML = "Tài khoản không chính xác!";
          showFlashMessage(flashMessages);
        }
        if(usernamesubmit.value=="")
        {
          flashMessages.innerHTML = "Vui lòng nhập tài khoản!";
          showFlashMessage(flashMessages);
        }
      })
    })
  })
  submitButton.addEventListener("click",() => {
    fetch(url+"/Customer/login-checkpass", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernamesubmit.value,
        password: passwordsubmit.value,
      }),
    }).then((res) => {    
    // Error case
      if (!res.ok)
        res.text().then((msg) => {
          const flashMessages = document.querySelector("#flashMessage1");
          flashMessages.style="background-color: #e55353;"
          if(msg=="Wrong password!")
          {
            flashMessages.innerHTML = "Sai mật khẩu!";
          }
          else if(msg=="User not found!")
          {
            flashMessages.innerHTML = "Tài khoản không chính xác!";
          }
          showFlashMessage(flashMessages);
          
        });
    // Success case
      else {
        res.json().then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken.token);
          localStorage.setItem("Token", res.token);
          localStorage.setItem("CustomerID", res.result.customerId);
          const flashMessages = document.querySelector("#flashMessage1");
          flashMessages.style="background-color: #2eb85c;"
          flashMessages.innerHTML = "Đăng nhập thành công!";
          showFlashMessage(flashMessages);
          setTimeout(function(){location.href="homepage.html"} , 2000);   
          // alert("Đăng nhập thành công!");
          // alert("Welcome " + res.result.customerFullname);
          // window.location.href="/homepage.html";
          fetch("http://113.161.231.116:8081/WeatherForecast", {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: "bearer " +localStorage.getItem("Token"),
              "Content-Type": "application/json",
            },
          })
          .then(res=>res.json())
            .then(res=>{
            })
        });
      }
    });
  });
};

Login();
