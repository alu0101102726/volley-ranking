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

async function modifyJSON(newJSON) {
  let logEndpoint = "https://volley-ranking-server.onrender.com/login";
  let currentUserData = {}

  let finalDate = await fetch("https://volley-ranking-server.onrender.com/votes");
  let dateData = await finalDate.json();

  let response = await fetch(logEndpoint);
  let allUsrsData = await response.json();
  let numberOfPeopleVote = 0;
  let currentEmail = "";

  if(localStorage.getItem('user')) {
    currentEmail = localStorage.getItem('user').split('@')[0];
    Object.keys(allUsrsData).forEach(currentFile => {
      if (currentEmail == currentFile) {
        currentUserData = allUsrsData[currentFile]
        if(!currentUserData.voted) {
          numberOfPeopleVote++;
        }
      }
      if(allUsrsData[currentFile].voted) {
        numberOfPeopleVote++;
      } 
    })
    
    currentUserData.peopleVoted = numberOfPeopleVote;
    const voteTime = new Date();
    if(!currentUserData.voted) {
      currentUserData.votes = newJSON;
      currentUserData.voted = true;
      currentUserData.timedVote = voteTime;
      
      let endpoint = "https://volley-ranking-server.onrender.com/poll";
      const options = {
        method: "POST",
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        mode: 'no-cors'
      };
    
      options.body = JSON.stringify(currentUserData);
    
      fetch(endpoint, options)
      swal("De locos bro, la info está en el server",`Puedes verla en la pestaña de resultados!`, "success")
    }
    else {
      let finalDate = new Date(dateData.endVote).getTime();
      let distance = (finalDate - voteTime) / 1000;
    
      let days = Math.floor(distance / (60 * 60 * 24));
      let hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
      let minutes = Math.floor((distance % (60 * 60)) / (60));
      let seconds = Math.floor(distance % (60))    
  
      let dayString = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
  
      let day = voteTime.getDate();
      let month = voteTime.getMonth() + 1;
      let year = voteTime.getFullYear();
  
      let currentDate = `${day}-${month}-${year}`;
      if(!dateData.changed) {
        swal(`Ya su voto fue registrado el ${currentDate}\n`,
        `Queda ${dayString} para poder votar de nuevo!`, "info")
      }
    }
  }

  else {
    swal("Para poder votar necesitas autenticarte",`Vete a la pestaña de autenticación!`, "error")
  }
  
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
      }

    }
        
  }) 
  swal({
    title: "¿Seguro que quieres registrar los datos?",
    text: "Una vez mandado no podrás volver a votar",
    icon: "warning",
    buttons: true
  })
  .then((willSend) => {
    if (willSend) {
      modifyJSON(JSONresult);
    } else {
      swal("Puedes seguir modificando tus votos");
    }
  });
  modifyJSON(JSONresult);
}