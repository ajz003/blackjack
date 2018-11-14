var deck = [];
var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var suitsL = ["S", "D", "C", "H"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var yourCards = [];
var dealerCards = [];
var disCards = [];
var players = [];
var playerCount = 0;
var trueCount = 0;

function Card(value, suit, src, trueValue) {
    this.value = value;
    this.suit = suit;
    this.src = src;
    this.trueValue = trueValue;
}


function makeDeck(num) {
    for (let j = 0; j < num; j++) {

        for (let i = 0; i < 9; i++) {
            let card = new Card(`${i + 2}`, "Clubs", `assets/images/${i + 2}C.png`, `${i + 2}`)
            deck.push(card)
        }
        for (let i = 0; i < 9; i++) {
            let card = new Card(`${i + 2}`, "Diamonds", `assets/images/${i + 2}D.png`, `${i + 2}`)
            deck.push(card)
        }
        for (let i = 0; i < 9; i++) {
            let card = new Card(`${i + 2}`, "Hearts", `assets/images/${i + 2}H.png`, `${i + 2}`)
            deck.push(card)
        }
        for (let i = 0; i < 9; i++) {
            let card = new Card(`${i + 2}`, "Spades", `assets/images/${i + 2}S.png`, `${i + 2}`)
            deck.push(card)
        }
        for (let i = 0; i < 4; i++) {
            let card = new Card("Jack", `${suits[i]}`, `assets/images/J${suitsL[i]}.png`, 10)
            deck.push(card)
        }
        for (let i = 0; i < 4; i++) {
            let card = new Card("Queen", `${suits[i]}`, `assets/images/Q${suitsL[i]}.png`, 10)
            deck.push(card)
        }
        for (let i = 0; i < 4; i++) {
            let card = new Card("King", `${suits[i]}`, `assets/images/K${suitsL[i]}.png`, 10)
            deck.push(card)
        }
        for (let i = 0; i < 4; i++) {
            let card = new Card("Ace", `${suits[i]}`, `assets/images/ace${suitsL[i]}.png`, 11)
            deck.push(card)
        }

    }
    console.log(deck)
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck;
}

function countAndDeal(playerHand) {

    let cardValue = deck[0].value

    console.log(deck[0])


    if (cardValue === "2" || cardValue === "3" || cardValue === "4" || cardValue === "5" || cardValue === "6") {
        trueCount++;
        if (playerHand === yourCards) {
            playerCount++;
        }

    }
    if (cardValue === "10" || cardValue === "Jack" || cardValue === "Queen" || cardValue === "King" || cardValue === "Ace") {
        trueCount--;
        if (playerHand === yourCards) {
            playerCount--;
        }
    }
    playerHand.push(deck[0]);
    deck.splice(0, 1);
    console.log(playerHand)

    $("#count").html(trueCount)
    $("#your-count").html(playerCount)
    $("#cards-left").html(deck.length)


}

function handValue(playerHand) {

    let total = 0;
    let numAces = 0;
    let hasAces = false;

    for (let i = 0; i < playerHand.length; i++) {



        let val = parseInt(playerHand[i].trueValue);
        total += val;

        if (playerHand[i].value === "Ace") {
            numAces++;
            hasAces = true;

        }
        

    }

    if (hasAces === true && total > 21) {
        for (let i = 0; i < numAces; i++) {
            total -= 10;
        }

    }

    console.log(numAces, "numAces")

    console.log(total)

    return total;

}

function initDeck() {

    trueCount = 0;
    playerCount = 0;

    makeDeck(2);
    shuffleDeck(deck);

    while (dealerCards.length < 2 || yourCards < 2) {
        countAndDeal(yourCards);
        countAndDeal(dealerCards);
        console.log("test")
        console.log(dealerCards.length, "dealer cards")
        console.log(yourCards.length, "your cards")

    }

    dealerCards.forEach(element => {
        $("#dealer-card-section").prepend(`
        <div class="col">
        <img class="img-fluid card float-left" src="assets/images/gray_back.png">
        </div>
        `)
    });

    yourCards.forEach(element => {
        $("#card-section").prepend(`
        <div class="col">
        <img class="img-fluid card float-left" src="${element.src}">
        </div>
        `)
    });
    $("#count").html(trueCount)
    $("#your-count").html(playerCount)
    $("#cards-left").html(deck.length)

    handValue(dealerCards);
    handValue(yourCards);

}

// APPLICATION


initDeck();


// jQuery

$("#hit").on("click", function hit() {
    countAndDeal(yourCards);
    $("#card-section").append(`
    <div class="col">
    <img class="img-fluid card float-left" src="${yourCards[yourCards.length - 1].src}">
    </div>
    `)
    if (handValue(yourCards) > 21) {
        alert("You bust.")
    }
})


$("#stand").on("click", function () {

    $("#dealer-card-section").empty();

    dealerCards.forEach(element => {
        $("#dealer-card-section").prepend(`
        <div class="col">
    <img class="img-fluid card float-left" src="${element.src}">
    </div>
    `)
    });

    while (handValue(dealerCards) < 17) {

        countAndDeal(dealerCards);
        $("#dealer-card-section").append(`
        <div class="col">
        <img class="img-fluid card float-left" src="${dealerCards[dealerCards.length - 1].src}">
        </div>
        `)

    }

})









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
            <div class="col">
        <img class="img-fluid card float-left" src="${element.src}">
        </div>
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
            <div class="col">
        <img class="img-fluid card float-left" src="${element.src}">
        </div>
        `)
        });
        console.log(deck[0], deck[1])

        $("#count").html(count)
        $("#cards-left").html(deck.length)

        return;
    }

})