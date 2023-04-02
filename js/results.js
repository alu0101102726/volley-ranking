window.onload = () => {
  let topNavUser = document.querySelector(".login-container").childNodes[1];
  let topNavAuth = document.querySelector(".login-container").childNodes[3];
  if(localStorage.getItem('user')) {
      let user = localStorage.getItem('user');
      topNavUser.innerText = `${user}`
      topNavAuth.childNodes[0].nodeValue = `Cerrar sesión`
  }
  else {        
    topNavUser.innerText = ``
    topNavAuth.childNodes[0].nodeValue = `Autenticarse`
  }
}

const endpoint = "http://localhost:3000/poll";
const usersImpt = await import("../public/users.js");
const userdata = usersImpt.default.data;
const colors = ['#F8827D', '#FBBF7D', '#FCFD7D', '#87FB7F', '#84C0FE', '#8183FF'];
const tiers = document.querySelectorAll('.tier');
const labels = ["S", "A", "B", "C", "D", "E"];

const response = await fetch(endpoint);
const data = await response.json();

let currentUserData = {}
let rsp = await fetch("http://localhost:3000/login");
let allUsrsData = await rsp.json();

let pVotes = await fetch("http://localhost:3000/peopleVoted");
let totalPeopleVote = await pVotes.json();

function compare( a, b ) {
    if ( a.percentage <= b.percentage ){
      return 1;
    }
    if ( a.percentage > b.percentage ){
      return -1;
    }
    return 0;
  }

tiers.forEach((row, index) => {
    const label = row.querySelector('.label');
    label.style.backgroundColor = colors[index];
  })
let totalVotes = data[0].totalVotes;
let limitLabel = [{}]
let allVotes = []

let ranking = (data.length / totalPeopleVote).toFixed(0);
let remaider = data.length % totalPeopleVote;

for( let i = 0; i < labels.length; i++ ) {
    limitLabel[i] = {
        label: labels[labels.length - i - 1],
        value: i + 1
    }
}

let labelIndex = limitLabel.length - 1;
data.sort((a,b) => (a.percentage > b.percentage) ? -1 : ((b.percentage <= a.percentage) ? 1 : 0))

for (const option of data) {
    let i = 0;
    option.value = ((option.percentage * option.totalVotes) / 100).toFixed(0);
    while( i >= 0 ) {
      if(option.value <= limitLabel[i].value) {
        let user = option.label;
        let userInfo = userdata.find(element => element.name == user)

        let image = new Image(100,85);
        image.src = userInfo.image;
        image.style.pointerEvents = 'none';
        image.alt = userInfo.name;

        const card = document.createElement('div');
        card.classList.add('card');
        card.id = image.alt;
        card.appendChild(image);
        const tier = document.querySelector(`.${limitLabel[i].label}`)
        tier.appendChild(card);
        break;
      }
      i++; 
    }
}