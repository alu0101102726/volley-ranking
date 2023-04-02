window.onload = () => {
  let topNavUser = document.querySelector(".login-container").childNodes[1];
  let topNavAuth = document.querySelector(".login-container").childNodes[3];
  let overlay = document.querySelector("#overlay");
  let iframeDiv = document.querySelector(".divText");

  if(localStorage.getItem('user')) {
      let user = localStorage.getItem('user');
      overlay.style = "display: none"
      topNavUser.innerText = `${user}`
      topNavAuth.childNodes[0].nodeValue = `Cerrar sesión`
  }  
  else {        
    topNavUser.innerText = ``
    topNavAuth.childNodes[0].nodeValue = `Autenticarse`
    let iframe = document.createElement('iframe');
    iframe.onload = function() {
        console.log("iframe charged")
    }; // before setting 'src'
    iframe.src = 'https://drive.google.com/file/d/1VZVxhF6YfYbyOoO68m4OWQglS73gNEAA/preview'; 
    iframe.width = "100%";
    iframe.height = "480";
    iframeDiv.appendChild(iframe);
  }
  
  getInformation();
}

const cards = document.querySelectorAll('.card');
const addCard = document.querySelector('#addCard');

async function getInformation() {  
  const usersImpt = await import("../public/users.js")
  const userdata = usersImpt.default.data
  const bank = document.querySelector('#banco');
  let currentCards = document.querySelectorAll('.card')
  if(currentCards.length != 0) {
    currentCards.forEach((card, index) => {
      card.remove();
    })
  }
  userdata.forEach((user, index) => {  
    let image = new Image(100,85);
    image.src = user.image;
    image.style.pointerEvents = 'none';
    image.alt = user.name;
    let card = createCard(image);
    bank.appendChild(card);
  });
}

/* Lógica de la imágen */
const createCard = (image) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('draggable', 'true');
  card.id = image.alt;
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
  card.onclick = deleteCard;
  card.appendChild(image);
  return card;
}

/*Eliminar una imágen del Tier List*/

const deleteCard = (event) => {
  const bank = document.querySelector('#banco');
  bank.appendChild(event.target);
}

/*Log al mover*/

const onDragStart = (event) => {
  console.log('Elemento seleccionado para arrastrar');
  event.dataTransfer.setData('id', event.target.id);
  setTimeout(() => {
    event.target.style.visibility = 'hidden';
  }, 50)
}

const onDragEnd = (event) => {
  event.target.style.visibility = 'visible';
  console.log('Finalizado el arrastre');
}

cards.forEach((card, index) => {
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
})