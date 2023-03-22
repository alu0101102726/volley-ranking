const bank = document.querySelector('#banco');

window.onload = () => {
  let topNavUser = document.querySelector(".login-container").childNodes[1];
  let topNavAuth = document.querySelector(".login-container").childNodes[3];
  if(localStorage.getItem('user')) {
      let user = localStorage.getItem('user');
      topNavUser.innerText = `${user}`
      console.log
      topNavAuth.childNodes[0].nodeValue = `Cerrar sesión`
  }  
  else {        
    topNavUser.innerText = ``
    topNavAuth.childNodes[0].nodeValue = `Autenticarse`
  }
}

const onDropCard = (event) => {
  const id = event.dataTransfer.getData('id');
  bank.appendChild(document.getElementById(id));
}

bank.ondrop = onDropCard;
bank.ondragover = (event) => event.preventDefault();