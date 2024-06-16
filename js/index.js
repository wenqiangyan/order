let tab_all = document.getElementById("tab_all");
let tab_meat = document.getElementById("tab_meat");
let tab_fish = document.getElementById("tab_fish");
let tab_vegetables_fruits = document.getElementById("tab_vegetables_fruits");
let tab_brussels_sprouts = document.getElementById("tab_brussels_sprouts");
let tab_constant_point = document.getElementById("tab_constant_point");
let all_dish = document.querySelector(".all_dish");
let meat_dish = document.querySelector(".meat_dish");
let fish_dish = document.querySelector(".fish_dish");
let vegetables_fruits_dish = document.querySelector(".vegetables_fruits_dish");
let brussels_sprouts_dish = document.querySelector(".brussels_sprouts_dish");
let constant_point_dish = document.querySelector(".constant_point_dish");
let tab_list = [tab_all, tab_meat, tab_fish, tab_vegetables_fruits, tab_brussels_sprouts, tab_constant_point];
let dish_list = [all_dish, meat_dish, fish_dish, vegetables_fruits_dish, brussels_sprouts_dish, constant_point_dish];
tab_list.map((item) => {
  item.addEventListener(
    "click",
    function (event) {
      all_dish.style.display = "none";
      meat_dish.style.display = "none";
      fish_dish.style.display = "none";
      vegetables_fruits_dish.style.display = "none";
      brussels_sprouts_dish.style.display = "none";
      constant_point_dish.style.display = "none";
      switch (event.target.innerHTML) {
        case "全部":
          all_dish.style.display = "flex";
          break;
        case "肉类":
          meat_dish.style.display = "flex";
          break;
        case "鱼类":
          fish_dish.style.display = "flex";
          break;
        case "蔬果":
          vegetables_fruits_dish.style.display = "flex";
          break;
        case "汤菜":
          brussels_sprouts_dish.style.display = "flex";
          break;
        case "留言":
          constant_point_dish.style.display = "flex";
          getMessage();
          break;
        default:
      }
    },
    false
  );
});
let clicked_but = document.querySelector(".clicked");
let home_page = document.getElementById("home_page");
let clicked_page = document.getElementById("clicked_page");
let in_progress_page = document.getElementById("in_progress_page");
let determine = document.querySelector(".determine");
clicked_but.addEventListener(
  "click",
  function () {
    hidePage();
    clicked_page.style.display = "block";
    clicke_clicked();
  },
  false
);

function hidePage() {
  home_page.style.display = "none";
  clicked_page.style.display = "none";
  in_progress_page.style.display = "none";
}
let in_progress_page_back = document.getElementById("in_progress_page_back");
let clicked_page_back = document.getElementById("clicked_page_back");
in_progress_page_back.addEventListener(
  "click",
  function () {
    hidePage();
    clicked_page.style.display = "block";
  },
  false
);
clicked_page_back.addEventListener(
  "click",
  function () {
    hidePage();
    home_page.style.display = "block";
  },
  false
);
determine.onclick = function () {
  hidePage();
  in_progress_page.style.display = "block";
  click_in_progress_content();
};

let all_dish_template = null;
let all_dish_arr = [];
all_dish_data.forEach((item) => {
  all_dish_arr.push(
    `
    <div class="dish_box">
    <img data-src="./images/${item.img}" src="" class="dish_img"  alt="loading">
    <div class="dish_text" name="${item.name}">
        <span>${item.name}</span>
        <span class="plus_icon_span">
            <i class="iconfont icon-plus"></i>
        </span>
    </div>
    </div>
`
  );
});
all_dish_template = all_dish_arr.join("");
all_dish.innerHTML = all_dish_template;
//all_dish图片懒加载
lazyLoading();
function lazyLoading() {
  let dish_img = document.querySelectorAll(".dish_img");
  let scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
  Array.prototype.forEach.call(dish_img, (item) => {
    let imgHeight = item.offsetTop;
    let seeHeight = document.documentElement.clientWidth;
    if (imgHeight < scrolltop + seeHeight) {
      item.src = item.getAttribute("data-src");
    }
  });
}
//防抖
function debounce(method, delay) {
  let timename = null;
  return function () {
    clearTimeout(timename);
    timename = setTimeout(() => {
      method();
    }, delay);
  };
}
window.onscroll = debounce(lazyLoading, 10);
let meat_dish_arr = [];
meat_dish_data.forEach((item) => {
  meat_dish_arr.push(
    `
    <div class="dish_box">
    <div class="dish_img" style="background-image: url(./images/${item.img});"></div>
    <div class="dish_text" name="${item.name}">
        <span>${item.name}</span>
        <span class="plus_icon_span">
            <i class="iconfont icon-plus"></i>
        </span>
    </div>
    </div>
`
  );
});
let meat_dish_template = meat_dish_arr.join("");
meat_dish.innerHTML = meat_dish_template;
let fish_dish_arr = [];
fish_dish_data.forEach((item) => {
  fish_dish_arr.push(
    `
    <div class="dish_box">
    <div class="dish_img" style="background-image: url(./images/${item.img});"></div>
    <div class="dish_text" name="${item.name}">
        <span>${item.name}</span>
        <span class="plus_icon_span">
            <i class="iconfont icon-plus"></i>
        </span>
    </div>
    </div>
`
  );
});
let fish_dish_template = fish_dish_arr.join("");
fish_dish.innerHTML = fish_dish_template;

let vegetables_fruits_dish_arr = [];
vegetables_fruits_dish_data.forEach((item) => {
  vegetables_fruits_dish_arr.push(
    `
    <div class="dish_box">
    <div class="dish_img" style="background-image: url(./images/${item.img});"></div>
    <div class="dish_text" name="${item.name}">
        <span>${item.name}</span>
        <span class="plus_icon_span">
            <i class="iconfont icon-plus"></i>
        </span>
    </div>
    </div>
`
  );
});
let vegetables_fruits_dish_template = vegetables_fruits_dish_arr.join("");
vegetables_fruits_dish.innerHTML = vegetables_fruits_dish_template;

let brussels_sprouts_dish_arr = [];
brussels_sprouts_dish_data.forEach((item) => {
  brussels_sprouts_dish_arr.push(
    `
    <div class="dish_box">
    <div class="dish_img" style="background-image: url(./images/${item.img});"></div>
    <div class="dish_text" name="${item.name}">
        <span>${item.name}</span>
        <span class="plus_icon_span">
            <i class="iconfont icon-plus"></i>
        </span>
    </div>
    </div>
`
  );
});
let brussels_sprouts_dish_template = brussels_sprouts_dish_arr.join("");
brussels_sprouts_dish.innerHTML = brussels_sprouts_dish_template;

let dish_text = document.querySelectorAll(".dish_text");
let clicked_arr = [];
let clicked_dish;
let clicked_num = document.querySelector(".clicked_num");
Array.prototype.forEach.call(dish_text, (item) => {
  item.addEventListener("click", (e) => {
    console.log(item);
    console.log(e);
    console.log(e.currentTarget.getAttribute("name"));
    clicked_dish = [];
    clicked_arr.push(e.currentTarget.getAttribute("name"));
    all_dish_data.forEach((item) => {
      clicked_arr.includes(item.name) ? clicked_dish.push(item) : "";
    });
    clicked_num.innerHTML = clicked_dish.length;
  });
});

let clicked_content = document.querySelector(".clicked_content");
let clicked_content_arr;
function clicke_clicked() {
  clicked_content_arr = [];
  clicked_dish.forEach((item) => {
    clicked_content_arr.push(
      `
            <div class="clicked_content_detail">
                    <div>
                        <div class="clicked_img" style="background-image: url(./images/${item.img});"></div>
                        <div class="clicked_text">${item.name}</div>
                    </div>
                    <div class="clicked_operate">
                        <div class="clicked_content_detail_innerbox">
                            <div class="clicked_operate_num" >${item.name}</div>
                            <i class="iconfont icon-minus" key="${item.name}"></i>
                        </div>
                    </div>
                </div>
            `
    );
  });
  let clicked_content_template = clicked_content_arr.join("");
  clicked_content.innerHTML = clicked_content_template;

  let clicked_content_detail_innerbox = document.querySelectorAll(".clicked_content_detail_innerbox");
  Array.prototype.forEach.call(clicked_content_detail_innerbox, (item) => {
    item.onclick = function (e) {
      clicked_dish = clicked_dish.filter((item) => {
        return item.name != e.srcElement.getAttribute("key");
      });
      clicke_clicked();
    };
  });
}

let in_progress_content = document.querySelector(".in_progress_content");

function click_in_progress_content() {
  let click_in_progress_content_arr = [];
  clicked_dish.forEach((item) => {
    click_in_progress_content_arr.push(
      `
            <div class="in_progress_content_detail" >
                    <div class="in_progress_img" style="background-image: url(./images/${item.img});"></div>
                    <div class="in_progress_text">${item.name}</div>
                </div>
            `
    );
  });
  let in_progress_content_template = click_in_progress_content_arr.join("");
  in_progress_content.innerHTML = in_progress_content_template;
  let flag = false;
  if (!flag) {
    init_in_progress_title();
  }
  flag = true;
}
let init_in_progress_time = document.querySelector(".init_in_progress_time");

function init_in_progress_title() {
  let init_time = new Date().getTime();
  setInterval(() => {
    let current_time = new Date().getTime();
    let time = current_time - init_time;
    let hours = Math.floor(parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = Math.floor(parseInt((time % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let in_progress_time_template = `
        <div class="init_in_progress_time">
                    <span>进行中</span>
                    <span class="in_progress_time">
                        （用时
                        <span>${hours}</span>
                        时
                        <span>${minutes}</span>
                        分
                        <span>${seconds}</span>
                        秒
                        ）
                    </span>
                </div>
        `;
    init_in_progress_time.innerHTML = in_progress_time_template;
  }, 1000);
}
