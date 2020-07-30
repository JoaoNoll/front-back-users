const axios = require('axios').default;

class Card {
    constructor() {
        this.title = document.getElementById('txtTitle');
        this.date = document.getElementById('txtDate');
        this.hour = document.getElementById('txtHour');
        this.content = document.getElementById('txtContent');
        this.btnRegisterCard = document.getElementById('btnRegister');

        this.getCards();
        this.events();
    }

    events() {
        this.btnRegisterCard.onclick = (event) => this.cardValidate(event);
    }

    getCards() {
        axios.get(`http://localhost:3000/notes`)
            .then((response) => {
                this.recoryCard(response.data.notes);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    recoryCard(data) {
        for (card of data) {

            const html = this.layoutCard(card.title, card.hour, card.date, card.content);

            this.insertHtml(html);


        }
    }

    layoutCard(title, hour, date, content) {
        return `
        <div class='col cards mt-5'>
            <div class='card'>
                <div class='card-head'>
                    <h3 class='card-title'>${title}</h3>
                    <p class='card-body'>${hour}</p>
                    <p class='card-body'>${date}</p>
                    <p class='card-content'>${content}</p>
                
                </div>
            </div
        </div>
        `;

    }


    cardValidate(event) {
        event.preventDefault();
        if (this.title.value && this.hour.value && this.date.value && this.content.value) {
            const card = {
                title: this.title.value,
                hour: this.hour.value,
                date: this.date.value,
                content: this.content.value
            }

            this.createCard(card);

        } else {
            alert('Por favor, preencha todos os dados!');
        }

    }

    insertHtml(html) {
        document.getElementById('showCards').innerHTML += html;

    }



    createCard(card) {
        axios.post('http://localhost:3000/notes', card)
            .then((response) => {

                const html = this.layoutCard(card.title, card.hour, card.date, card.content);

                this.insertHtml(html);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}




new Card();