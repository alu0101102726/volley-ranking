const cards = document.querySelectorAll('.card');
const addCard = document.querySelector('#addCard');
const endpoint = "https://drive.google.com/file/d/1-F_I_mP30QjWoCWyZhsdJ0Kby0qOSzuk/view?usp=share_link";
const fileURL = "https://drive.google.com/file/d/1-F_I_mP30QjWoCWyZhsdJ0Kby0qOSzuk"

async function getInformation() {  
  let newFileURL = "https://drive.google.com/uc?export=view&id=1-F_I_mP30QjWoCWyZhsdJ0Kby0qOSzuk"
  const bank = document.querySelector('#banco');
  var image = new Image(100,85);
  image.src = newFileURL;
  image.style.pointerEvents = 'none';
  const card = createCard(image);
  console.log(card);
  bank.appendChild(card);
  console.log(bank);
}

/* Lógica de la imágen */
const createCard = (image) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('draggable', 'true');
  card.id = Date.now();
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