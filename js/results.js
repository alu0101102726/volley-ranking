const endpoint = "https://volley-ranking-server.onrender.com/poll";
const usersImpt = await import("../public/users.js");
const userdata = usersImpt.default.data;
const colors = ['#F8827D', '#FBBF7D', '#FCFD7D', '#87FB7F', '#84C0FE', '#8183FF'];
const tiers = document.querySelectorAll('.tier');
const labels = ["S", "A", "B", "C", "D", "E"];

const response = await fetch(endpoint);
const data = await response.json();

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
let maxCategoryVal = parseInt((totalVotes / labels.length).toFixed(0));
let limitLabel = [{}]
let allVotes = []

let ranking = (data.length / labels.length).toFixed(0)
let remaider = data.length % labels.length

for( let i = 0; i < labels.length - 1; i++ ) {
    limitLabel[i] = {
        label: labels[labels.length - i - 1],
        value: ranking
    }
}

limitLabel[labels.length - 1] = {
    label: labels[0],
    value: ranking
}

let labelIndex = limitLabel.length - 1;
data.sort((a,b) => (a.percentage > b.percentage) ? -1 : ((b.percentage <= a.percentage) ? 1 : 0))

for (const option of data) {
    let percentage = option.percentage;
    let currentVote = ((percentage * totalVotes) / 100).toFixed(0);
    let i = labelIndex;
    let counter = 0;
    while( i >= 0 ) {
        if(counter < limitLabel[i].value) {
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
        counter++
        i--; 
    }
    labelIndex--;
}

console.log(allVotes)