let leaveMessage = document.querySelector(".leaveMessage");
let leaveMessageInput = document.querySelector(".leaveMessageInput");
let submitLeaveMessage = document.querySelector(".submitLeaveMessage");
let allMessageData = [];
// 封装获取message promise
let leaveMessagePromise = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.setRequestHeader("Authorization", token);
    xhr.send();
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
// 封装提交message promise
let updataMessagePromise = (url, reqData) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", token);
    let req = `ev_leavemessagecol=${reqData.ev_leavemessagecol}&username=${reqData.username}&time=${reqData.time}`;
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

submitLeaveMessage.addEventListener("click", (e) => {
  let url = `http://178.236.46.90:3007/my/insertlminfo`;
  let ev_leavemessagecol = leaveMessageInput.value;
  let username = document.getElementById("userName").value;
  let time = new Date().toLocaleString();
  let reqData = {
    ev_leavemessagecol,
    username,
    time,
  };
  updataMessage(url, reqData);
});
function updataMessage(url, reqData) {
  updataMessagePromise(url, reqData).then((res) => {
    let notification = document.querySelector(".notification");
    notification.innerText = "提交成功！";
    notification.style.display = "block";
    leaveMessageInput.value = "";
    getMessage();
    setTimeout(() => {
      notification.style.display = "none";
    }, 500);
  });
}

function getMessage() {
  leaveMessagePromise("http://178.236.46.90:3007/my/userinfo").then((res) => {
    console.log(res);
    setMessage(res.message);
  });
}

function setMessage(allMessageData) {
  let messageTemplate = null;
  let leaveMessageArr = [];
  allMessageData.forEach((item) => {
    leaveMessageArr.push(
      `
    <div class="leaveMessageInfo">
        <div class="messageInfoDetail">
        <span>${item.ev_leavemessagecol}</span>
        </div>
        <div class="messageInfoDetail"><span>${item.username}</span> / <span>${item.time}</span></div>
        <hr>
    </div>
`
    );
  });
  messageTemplate = leaveMessageArr.join("");
  leaveMessage.innerHTML = messageTemplate;
}
