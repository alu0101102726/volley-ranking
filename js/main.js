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

class Poll {
    constructor(root, title) {
        this.root = root;
        this.selected = sessionStorage.getItem("poll-selected");
        this.endpoint = "https://volley-ranking-server.onrender.com/poll";

        this.root.insertAdjacentHTML("afterbegin", `
            <div class="poll__title">${ title }</div>
            <div id="totalScore" class="poll__title"></div>
        `);

        this._refresh();
    }

    async _refresh() {
        const response = await fetch(this.endpoint);
        const data = await response.json();        
        data.sort((a,b) => (a.totalVotes > b.totalVotes) ? -1 : ((b.totalVotes <= a.totalVotes) ? 1 : 0))

        this.root.querySelectorAll(".poll__option").forEach(option => {
            option.remove();
        });

        const template = document.createElement("template");
        const totalVotesDiv = document.getElementById("totalScore");
        let totalVotes = 0;
        for (const option of data) {
            totalVotes += option.totalVotes;
        }
        totalVotesDiv.innerText = "Puntos totales: " + totalVotes;

        for (const option of data) {
            const fragment = template.content;

            template.innerHTML = `
                <div class="poll__option ${ this.selected == option.label ? "poll__option--selected": "" }">
                    <div class="poll__option-fill"></div>
                    <div class="poll__option-info">
                        <span class="poll__label">${ option.label }</span>
                        <span class="poll__percentage">${ option.percentage }%</span>
                    </div>
                </div>
            `;

            fragment.querySelector(".poll__option-fill").style.width = `${ option.percentage }%`;

            this.root.appendChild(fragment);
        }
    }
}

function navBarLoggedIn() {  
    let topNavUser = document.querySelector(".login-container").childNodes[1];
    let topNavAuth = document.querySelector(".login-container").childNodes[3];
    topNavUser.innerText = `${user.email}`
    topNavAuth.childNodes[0].nodeValue = `Cerrar sesión`
}

const p = new Poll(
    document.querySelector(".poll"),
    "¿Mejor jugador de volley según sus votos? 👀"
);
