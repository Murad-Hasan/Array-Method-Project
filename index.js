const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaireBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateAssetBtn = document.getElementById("calculate-assets");

let data = [];

//random user generator api

// https://randomuser.me/api/

//fetch random user and add money

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//add new obj to data array

function addData(obj) {
  data.push(obj);
  upDateDom();
}

//double money
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  upDateDom();
}
//show only millionaires
function showMillionaires() {
  data = data.filter((item) => item.money > 1000000);
  upDateDom();
}

//sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  upDateDom();
}

//update dom

function upDateDom(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong> Assets</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//calculate total assets
function calculateAssets() {
  const total = data.reduce((acc, item) => acc += item.money, 0);
  const totalEl = document.createElement("h3");
  totalEl.innerHTML = `<strong>Total assets: </strong> ${formatMoney(total)}`;
  main.appendChild(totalEl);
}

//currency formatter
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

console.log(data);

//event listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionaireBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortByRichest);
calculateAssetBtn.addEventListener("click", calculateAssets);
