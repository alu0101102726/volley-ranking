const rows = document.querySelectorAll('.row');
const colors = ['#F8827D', '#FBBF7D', '#FCFD7D', '#87FB7F', '#84C0FE', '#8183FF'];
let JSONresult = {
  
};

const onDragOver = (event) => {
  event.preventDefault();
}

const onDrop = (event) => {
  event.preventDefault();
  console.log(event.dataTransfer)
  const draggedCardId = event.dataTransfer.getData('id');
  const draggedCard = document.getElementById(draggedCardId);
  console.log(draggedCardId)
  event.target.appendChild(draggedCard);
  console.log('Elemento arrastrado');
}

rows.forEach((row, index) => {
  const label = row.querySelector('.label');
  label.style.backgroundColor = colors[index];
  row.ondragover = onDragOver;
  row.ondrop = onDrop;
})

function sendInformation() {
  rows.forEach((row, index) => {
    let rowInfo = row.childNodes;
    let tier = rowInfo[1].innerText;
    console.log(rowInfo);
    for(let i = 3; i < rowInfo.length; i++) {
      let currentCardImage = rowInfo[i].childNodes[0].currentSrc;
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
    }
    
  })
}