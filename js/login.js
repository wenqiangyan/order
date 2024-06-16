let userName = document.getElementById("userName");
let password = document.getElementById("password");
let reUserName = document.getElementById("reUserName");
let rePassword = document.getElementById("rePassword");
let rePassword2 = document.getElementById("rePassword2");
let loginButton = document.getElementById("loginButton");
let registerButton = document.getElementById("register");
let cancelButton = document.getElementById("cancel");
let confirmButton = document.getElementById("confirm");
let login_div = document.querySelector(".login_div");
let main_div = document.querySelector(".main_div");
let register_div = document.querySelector(".register_div");
let notification = document.querySelector(".notification");
let error_tips = document.querySelector(".error_tips");
let loginStatus = false;
let token = "";

// 封装登录和注册promise
let userPromise = (reqData, url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let req = `username=${reqData.userName}&password=${reqData.password}`;
    xhr.send(req);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
        let res = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          console.log("请求成功");
          resolve.call(null, res); //成功则调用resolve
        } else {
          console.log("请求失败");
          reject.call(null, res); //失败则调用reject
        }
      }
    };
  });
};
// 注册登录按钮事件
loginButton.addEventListener(
  "click",
  function (e) {
    // 登录事件
    let req = {
      userName: userName.value,
      password: password.value,
    };
    let url = "http://178.236.46.90:3007/api/login";
    userPromise(req, url)
      .then((res) => {
        if (res.status === 0) {
          loginStatus = true;
          token = res.token;
        } else {
          loginStatus = false;
        }
        if (loginStatus) {
          login_div.style.display = "none";
          main_div.style.display = "block";
        } else {
          notification.style.display = "block";
          userName.value = "";
          password.value = "";
          setTimeout(() => {
            notification.style.display = "none";
          }, 2000);
        }
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  true
);

// 注册registerButton按钮事件
registerButton.addEventListener("click", () => {
  login_div.style.display = "none";
  main_div.style.display = "none";
  register_div.style.display = "block";
});
// 注册cancel按钮事件
cancelButton.addEventListener("click", () => {
  login_div.style.display = "block";
  main_div.style.display = "none";
  register_div.style.display = "none";
});
// 注册confirm按钮事件
confirmButton.addEventListener("click", () => {
  let reUserNameValue = reUserName.value;
  let rePasswordValue = rePassword.value;
  let rePassword2Value = rePassword2.value;
  console.log(error_tips.childNodes[1].innerText == "");
  if (rePasswordValue != rePassword2Value) {
    error_tips.style.display = "block";
    rePassword2.value = "";
    rePassword.value = "";
    setTimeout(() => {
      error_tips.style.display = "none";
    }, 2000);
    return;
  }
  // 注册事件
  let req = {
    userName: reUserName.value,
    password: rePassword.value,
  };
  let url = "http://178.236.46.90:3007/api/reguser";
  userPromise(req, url)
    .then((res) => {
      if (res.status === 0) {
        notification.innerText = "注册成功！";
        notification.style.display = "block";
        setTimeout(() => {
          notification.style.display = "none";
          login_div.style.display = "block";
          main_div.style.display = "none";
          register_div.style.display = "none";
          reUserName.value = "";
          rePassword.value = "";
          rePassword2.value = "";
        }, 500);
      } else {
        notification.innerText = "注册失败！请确认用户名或者密码是否合法！";
        notification.style.display = "block";
        setTimeout(() => {
          notification.style.display = "none";
        }, 500);
      }
    })
    .catch((err) => {
      notification.innerText = "注册失败！请确认用户名或者密码是否合法！";
      notification.style.display = "block";
      setTimeout(() => {
        notification.style.display = "none";
      }, 500);
    });
});
