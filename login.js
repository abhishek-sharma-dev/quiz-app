import userData from "./userData.js";

// on pageload
(function () {
  let userName = document.getElementById("userName");
  let password = document.getElementById("password");

  let loginBtn = document.getElementById("loginBtn");
  loginBtn.onclick = function () {
    loginConfirmation();
  };
  // on ENTER Btn click loginConfirmation call
  userName.onkeypress = function (event) {
    if (event.code === "Enter") {
      loginConfirmation();
    }
  };

  password.onkeypress = function (event) {
    if (event.code === "Enter") {
      loginConfirmation();
    }
  };
})();

function loginConfirmation() {
  let userName = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  localStorage.setItem(
    "UserData",
    JSON.stringify({ userName: userName, password: password })
  );

  if (userData.userName == userName && userData.password == password) {
    console.log("Login Successfull");
    // redirect to index.html
    window.location.replace("http://192.168.0.109:5500/index.html");
  } else {
    alert("Username or Password is incorrect");
  }
}
