const usernamesubmit = document.querySelector("#user-name");
const passwordsubmit = document.querySelector("#pass-word");


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
  submitButton.addEventListener("click",() => {
    fetch("https://localhost:7186/api/Customer/login-checkpass", {
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
         alert(msg)
        });
    // Success case
      else {
        res.json().then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken.token);
          localStorage.setItem("Token", res.token);
          localStorage.setItem("CustomerID", res.result.customerId);
          console.log(res);
          alert("Đăng nhập thành công!");
          alert("Welcome " + res.result.customerFullname);
          fetch("https://localhost:7186/WeatherForecast", {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: "bearer " +localStorage.getItem("Token"),
              "Content-Type": "application/json",
            },
          })
          .then(res=>res.json())
            .then(res=>{
                console.log(res);
            })
        });
      }
    });
  });
};

Login();
