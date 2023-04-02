const bank = document.querySelector('#banco');

const onDropCard = (event) => {
  const id = event.dataTransfer.getData('id');
  bank.appendChild(document.getElementById(id));
}

bank.ondrop = onDropCard;
bank.ondragover = (event) => event.preventDefault();

async function getTimeDifference() {
  let currentUserData = {}
  
  let finalDate = await fetch("https://volley-ranking-server.onrender.com/votes");
  let dateData = await finalDate.json();
  let response = await fetch("https://volley-ranking-server.onrender.com/login");
  let allUsrsData = await response.json();
  let currentEmail = localStorage.getItem('user').split('@')[0];
  Object.keys(allUsrsData).forEach(currentFile => {
    if (currentEmail == currentFile) {
      currentUserData = allUsrsData[`${currentFile}`]
    }
  })
  
  let timeDiv = document.querySelector(".time");
  let x = setInterval(function() {

    // Get today's date and time
    let nowTime = new Date().getTime();
    let finalDate = new Date(dateData.endVote).getTime();
  
    // Find the distance between now and the count down date
    let distance = (finalDate - nowTime) / 1000;
    let daysDistance = distance / (60 * 60 * 24)
  
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (60 * 60 * 24));
    let hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((distance % (60 * 60)) / (60));
    let seconds = Math.floor(distance % (60))    

    // Display the result in the element with id="time"
    timeDiv.innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (dateData.changed) {
      currentUserData.voted = false;
      currentUserData.votes = null;
      currentUserData.timedVote = "";
    
      fetch("https://volley-ranking-server.onrender.com/register", {
        method: "POST",
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        mode: 'no-cors',
        body: JSON.stringify(currentUserData)
      })
    
      fetch("https://volley-ranking-server.onrender.com/votes")
      timeDiv.innerHTML = "ACABADO";
    }
  }, 1000);
  
}

getTimeDifference()