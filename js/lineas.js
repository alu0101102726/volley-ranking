const tiers = document.querySelectorAll('.tier');
const rows = document.querySelectorAll('.row');
const colors = ['#F8827D', '#FBBF7D', '#FCFD7D', '#87FB7F', '#84C0FE', '#8183FF'];

const onDragOver = (event) => {
  event.preventDefault();
}

const onDrop = (event) => {
  event.preventDefault();
  const labels = ["S", "A", "B", "C", "D", "E"];
  const draggedCardId = event.dataTransfer.getData('id');
  const draggedCard = document.getElementById(draggedCardId);
  const classType = event.target.classList[1];
  console.log(event.target.parentElement)
  if(labels.includes(classType))
    event.target.appendChild(draggedCard);
  else if(labels.includes(event.target.parentElement.classList[1]))
    event.target.parentElement.appendChild(draggedCard);

  console.log('Elemento arrastrado');
}

tiers.forEach((row, index) => {
  const label = row.querySelector('.label');
  label.style.backgroundColor = colors[index];
  row.ondragover = onDragOver;
  row.ondrop = onDrop;
})

function modifyJSON(newJSON) {
  let endpoint = "https://volley-ranking-server.onrender.com/poll";
  alert("De locos bro, la info está en el server")
  const options = {
    method: "POST",
    headers: {'Content-Type': "application/x-www-form-urlencoded"},
    mode: 'no-cors'
  };

  options.body = JSON.stringify(newJSON);

  fetch(endpoint, options)
  localStorage.setItem('voted', true);
  localStorage.setItem('time-voted', new Date());
  document.querySelector('.submit').disabled = true;
  location.href = "results.html";
}

function sendInformation() {
  let JSONresult = {};
  tiers.forEach((row, index) => {
    let rowInfo = row.childNodes;
    let tier = rowInfo[1].innerText;
    let rowCards = rowInfo[3].childNodes;
    if(rowCards.length != 0) {
      for(let i = 0; i < rowCards.length; i++) {
        let currentCardImage = rowCards[i].childNodes[0];
        let score = 0;
        switch(tier) {
          case "S":
            score = 6;
          break;
          case "A":
            score = 5;
          break;
          case "B":
            score = 4;
          break;
          case "C":
            score = 3;
          break;
          case "D":
            score = 2;
          break;
          case "E":
            score = 1;
          break;
        }
        JSONresult[`${currentCardImage.alt}`] = score;
        console.log(JSONresult)
      }

    }
        
  }) 
  modifyJSON(JSONresult);
}