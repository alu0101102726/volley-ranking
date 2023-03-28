const endpoint = "https://volley-ranking-server.onrender.com/poll";
const usersImpt = await import("../public/users.js");
const userdata = usersImpt.default.data;
const colors = ['#F8827D', '#FBBF7D', '#FCFD7D', '#87FB7F', '#84C0FE', '#8183FF'];
const tiers = document.querySelectorAll('.tier');
const labels = ["S", "A", "B", "C", "D", "E"];

const response = await fetch(endpoint);
const data = await response.json();

tiers.forEach((row, index) => {
    const label = row.querySelector('.label');
    label.style.backgroundColor = colors[index];
  })

let totalVotes = data[0].totalVotes;
let maxCategoryVal = parseInt((totalVotes / labels.length).toFixed(0));
let limitLabel = [{}]

for( let i = 0; i < totalVotes; i += maxCategoryVal ) {
    let index = i / maxCategoryVal;
    limitLabel[index] = {
        label: labels[labels.length - index - 1],
        value: i
    }
}
for (const option of data) {
    let percentage = option.percentage;
    let currentVote = ((percentage * totalVotes) / 100).toFixed(0);
    let i = limitLabel.length - 1;
    console.log(currentVote)
    while( i >= 0 ) {
        if(currentVote >= limitLabel[i].value) {
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
        i--; 
    }
}