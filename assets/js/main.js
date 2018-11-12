var deck = [];
var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var suitsL = ["S", "D", "C", "H"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var yourCards = [];
var disCards = [];
var count = 0;

function Card(value, suit, src) {
    this.value = value;
    this.suit = suit;
    this.src = src;
}

function makeDeck() {
    for (let i = 0; i < 9; i++) {
        let card = new Card(`${i + 2}`, "Clubs", `assets/images/${i + 2}C.png`)
        deck.push(card)
    }
    for (let i = 0; i < 9; i++) {
        let card = new Card(`${i + 2}`, "Diamonds", `assets/images/${i + 2}D.png`)
        deck.push(card)
    }
    for (let i = 0; i < 9; i++) {
        let card = new Card(`${i + 2}`, "Hearts", `assets/images/${i + 2}H.png`)
        deck.push(card)
    }
    for (let i = 0; i < 9; i++) {
        let card = new Card(`${i + 2}`, "Spades", `assets/images/${i + 2}S.png`)
        deck.push(card)
    }
    for (let i = 0; i < 4; i++) {
        let card = new Card("Jack", `${suits[i]}`, `assets/images/J${suitsL[i]}.png`)
        deck.push(card)
    }
    for (let i = 0; i < 4; i++) {
        let card = new Card("Queen", `${suits[i]}`, `assets/images/Q${suitsL[i]}.png`)
        deck.push(card)
    }
    for (let i = 0; i < 4; i++) {
        let card = new Card("King", `${suits[i]}`, `assets/images/K${suitsL[i]}.png`)
        deck.push(card)
    }
    for (let i = 0; i < 4; i++) {
        let card = new Card("Ace", `${suits[i]}`, `assets/images/A${suitsL[i]}.png`)
        deck.push(card)
    }
    console.log(deck)
}
// function getDeck() {
//     for (let i = 0; i < suits.length; i++) {
//         for (let j = 0; j < values.length; j++) {
//             let card = {
//                 value: values[j],
//                 suit: suits[i]
//             }
//             deck.push(card);
//         }
//     }
//     return deck;
// }
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck;
}

function initDeck() {
    count = 0;
    makeDeck();
    shuffleDeck(deck);
    for (let i = 0; i < 2; i++) {
        console.log(deck[i])
        if (deck[i].value === "2" || deck[i].value === "3" || deck[i].value === "4" || deck[i].value === "5" || deck[i].value === "6") {
            count++;
        }
        if (deck[i].value === "10" || deck[i].value === "Jack" || deck[i].value === "Queen" || deck[i].value === "King" || deck[i].value === "Ace") {
            count--;
        }
        yourCards.push(deck[i]);
        deck.splice(i, 1);
    }
    yourCards.forEach(element => {
        $("#card-section").prepend(`
        <img class="img-fluid card float-left" src="${element.src}">
        `)
    });
    $("#count").html(count)
    $("#cards-left").html(deck.length)
}
initDeck();
$("#new-hand").on("click", function drawCards() {

    $("#card-section").empty();
    yourCards = [];
    console.log(deck.length)

    if (deck.length === 0) {

        alert("Deck shuffled.")
        deck = [];
        initDeck();

        $("#count").html(count)
        $("#cards-left").html(deck.length)

        return;

    }
    if (deck.length === 2) {

        for (let i = 0; i < 2; i++) {
            console.log(deck[i].value)
            if (deck[i].value === "2" || deck[i].value === "3" || deck[i].value === "4" || deck[i].value === "5" || deck[i].value === "6") {
                count++;
            }
            if (deck[i].value === "10" || deck[i].value === "Jack" || deck[i].value === "Queen" || deck[i].value === "King" || deck[i].value === "Ace") {
                count--;
            }
            yourCards.push(deck[i]);
        }
        yourCards.forEach(element => {
            $("#card-section").prepend(`
        <img class="img-fluid card float-left" src="${element.src}">
        `)
        });

        deck = [];

        $("#count").html(count)
        $("#cards-left").html(deck.length)

        return;

    }
    if (deck.length > 2) {
        for (let i = 0; i < 2; i++) {
            console.log(deck[i].value)
            if (deck[i].value === "2" || deck[i].value === "3" || deck[i].value === "4" || deck[i].value === "5" || deck[i].value === "6") {
                count++;
            }
            if (deck[i].value === "10" || deck[i].value === "Jack" || deck[i].value === "Queen" || deck[i].value === "King" || deck[i].value === "Ace") {
                count--;
            }
            yourCards.push(deck[i]);
            deck.splice(i, 1);
        }
        yourCards.forEach(element => {
            $("#card-section").prepend(`
        <img class="img-fluid card float-left" src="${element.src}">
        `)
        });
        console.log(deck[0], deck[1])

        $("#count").html(count)
        $("#cards-left").html(deck.length)

        return;
    }

})