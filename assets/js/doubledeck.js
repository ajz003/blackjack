var deck = [];
var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var suitsL = ["S", "D", "C", "H"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var yourCards = [];
var yourSplitCards = [];
var dealerCards = [];
var disCards = [];
var players = [];
var playerRoundCount = 0;
var trueRoundCount = 0;
var runningCount = 0;

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

// function deal(playerHand) {

//     let cardValue = deck[0].value

//     console.log(deck[0])

//     if (cardValue === "2" || cardValue === "3" || cardValue === "4" || cardValue === "5" || cardValue === "6") {
//         trueRoundCount++;
//         if (playerHand === yourCards) {
//             playerRoundCount++;
//         }

//     }
//     if (cardValue === "10" || cardValue === "Jack" || cardValue === "Queen" || cardValue === "King" || cardValue === "Ace") {
//         trueRoundCount--;
//         if (playerHand === yourCards) {
//             playerRoundCount--;
//         }
//     }
//     playerHand.push(deck[0]);
//     deck.splice(0, 1);
//     console.log(playerHand)

//     $("#count").html(trueRoundCount)
//     $("#your-count").html(playerRoundCount)
//     $("#cards-left").html(`${deck.length}/104`)

// }

function deal(playerHand) {
    playerHand.push(deck[0]);
    deck.splice(0, 1);
    $("#cards-left").html(`${deck.length}/104`)
}

function initCount() {

    playerRoundCount = runningCount

    for (let i = 0; i < yourCards.length; i++) {

        let cardValue = yourCards[i].value;

        if (cardValue === "2" || cardValue === "3" || cardValue === "4" || cardValue === "5" || cardValue === "6") {
            playerRoundCount++;
        }
        if (cardValue === "10" || cardValue === "Jack" || cardValue === "Queen" || cardValue === "King" || cardValue === "Ace") {
            playerRoundCount--;
        }

    }

    let cardValue = dealerCards[1].value;

    if (cardValue === "2" || cardValue === "3" || cardValue === "4" || cardValue === "5" || cardValue === "6") {
        playerRoundCount++;
    }
    if (cardValue === "10" || cardValue === "Jack" || cardValue === "Queen" || cardValue === "King" || cardValue === "Ace") {
        playerRoundCount--;

    }

    $("#count").html(runningCount)
    $("#your-count").html(playerRoundCount)

}

function count(playerHand) {

    playerRoundCount = 0;

    for (let i = 0; i < playerHand.length; i++) {

        let cardValue = playerHand[i].value;

        if (cardValue === "2" || cardValue === "3" || cardValue === "4" || cardValue === "5" || cardValue === "6") {

            runningCount++;

        }
        if (cardValue === "10" || cardValue === "Jack" || cardValue === "Queen" || cardValue === "King" || cardValue === "Ace") {

            runningCount--;
        }

    }

    $("#count").html(runningCount)
    $("#your-count").html(runningCount)

}

function handValue(playerHand) {

    let total = 0;
    let numAces = 0;
    let hasAces = false;
    let soft = true;

    for (let i = 0; i < playerHand.length; i++) {

        let val = parseInt(playerHand[i].trueValue);
        total += val;

        if (playerHand[i].value === "Ace") {
            numAces++;
            hasAces = true;

        }

    }

    if (hasAces === true && total > 21) {
        soft = false;
        for (let i = 0; i < numAces; i++) {
            total -= 10;
        }

    }

    console.log(numAces, "numAces")

    console.log(total)

    return {
        total: total,
        soft: soft,
        hasAces: hasAces
    }

}

function appendYours() {
    $("#card-section").append(`
    <div class="col">
    <img class="img card float-left" src="${yourCards[yourCards.length - 1].src}">
    </div>
    `)
}

function dealerPlay() {

    $("#dealer-card-section").empty();

    dealerCards.forEach(element => {
        $("#dealer-card-section").prepend(`
        <div class="col">
    <img class="img card float-left" src="${element.src}">
    </div>
    `)
    });

    let hand = handValue(dealerCards)
    console.log(hand.total)

    while (hand.total < 17) {

        deal(dealerCards);
        $("#dealer-card-section").append(`
        <div class="col">
        <img class="img card float-left" src="${dealerCards[dealerCards.length - 1].src}">
        </div>
        `)

        hand = handValue(dealerCards);

    }

    if (hand.total === 17 && hand.soft === true && hand.hasAces === true) {
        deal(dealerCards);
        $("#dealer-card-section").append(`
        <div class="col">
        <img class="img card float-left" src="${dealerCards[dealerCards.length - 1].src}">
        </div>
        `)

        hand = handValue(dealerCards);
    }

    $("#your-count").html(trueRoundCount)

}

function evalRound() {

    let dealerTotal = handValue(dealerCards).total;
    let yourTotal = handValue(yourCards).total;

    
    $(".btn").addClass("disabled");
    $("#new-hand").removeClass("disabled");

    if (yourTotal > 21) {
        return;
    }

    if (dealerTotal > 21) {
        alert("Dealer busts.");
        return;
    }

    if (dealerTotal > yourTotal) {
        alert(`Dealer wins with a ${dealerTotal} over your ${yourTotal}.`);
    }
    if (dealerTotal < yourTotal) {
        alert(`You win with a ${yourTotal} over the dealer's ${dealerTotal}.`);
    }
    if (dealerTotal === yourTotal) {
        alert("Push.");
    }

    count(yourCards);
    count(dealerCards);


}

function initDeck() {

    trueRoundCount = 0;
    playerRoundCount = 0;

    makeDeck(2);
    shuffleDeck(deck);

    // while (dealerCards.length < 2 || yourCards < 2) {
    //     deal(yourCards);
    //     deal(dealerCards);
    // }

    // $("#dealer-card-section").append(`
    //     <img class="img card float-left" src="assets/images/gray_back.png">
    //     `)

    // $("#dealer-card-section").prepend(`
    // <img class="img card float-left" src=${dealerCards[1].src}>
    // `)

    // yourCards.forEach(element => {
    //     $("#card-section").prepend(`
    //     <img class="img card float-left" src="${element.src}">
    //     `)
    // });

    // $("#count").html(trueRoundCount)
    // $("#your-count").html(playerRoundCount)
    // $("#cards-left").html(`${deck.length}/104`)

    // console.log(yourCards[0].trueValue)
    // console.log(yourCards[1].trueValue)

    // if (parseInt(yourCards[0].trueValue) === parseInt(yourCards[1].trueValue)) {
    //     $("#split").removeClass("disabled");
    // }

    newRound();

}

function newRound() {

    yourCards = [];

    dealerCards = [];

    $(".btn").removeClass("disabled")

    $("#dealer-card-section").empty();
    $("#card-section").empty();

    if (!$("#split").hasClass("disabled")) {
        $("#split").addClass("disabled");
    }

    if (!$("#insurance").hasClass("disabled")) {
        $("#insurance").addClass("disabled");
    }

    if (!$("#no-insurance").hasClass("disabled")) {
        $("#no-insurance").addClass("disabled");
    }

    if (!$("#new-hand").hasClass("disabled")) {
        $("#new-hand").addClass("disabled");
    }

    while (dealerCards.length < 2 || yourCards < 2) {
        deal(yourCards);
        deal(dealerCards);
    }

    $("#dealer-card-section").append(`

        <img class="img card float-left" src="assets/images/gray_back.png">

        `)

    $("#dealer-card-section").prepend(`

    <img class="img card float-left" src=${dealerCards[1].src}>

    `)

    yourCards.forEach(element => {
        $("#card-section").prepend(`

        <img class="img card float-left" src="${element.src}">

        `)
    });

    initCount();

    $("#cards-left").html(`${deck.length}/104`)

    if (handValue(yourCards).total === 21 && dealerCards[1].value !== "Ace") {
        alert("You got 21.")

        evalRound();

    }

    if (parseInt(yourCards[0].trueValue) === parseInt(yourCards[1].trueValue)) {
        $("#split").removeClass("disabled");
    }

    if (dealerCards[1].value === "Ace") {
        $(".btn").addClass("disabled")
        $("#insurance").removeClass("disabled");
        $("#no-insurance").removeClass("disabled");
    }

}

// ----------------------- APPLICATION

initDeck();

// ------------------------- jQuery

$("#split-card-section").hide();

// $(".btn").on("click", function () {
//     console.log(this, "this")
//     if ($(this).hasClass("disabled")) {
//         return false;
//     }
// })

$("#hit").on("click", function hit() {
    deal(yourCards);
    initCount();

    $("#card-section").append(`
    <div class="col">
    <img class="img card float-left" src="${yourCards[yourCards.length - 1].src}">
    </div>
    `)

    if (handValue(yourCards).total > 21) {
        alert("You bust.");

        $("#dealer-card-section").empty();

        dealerCards.forEach(element => {
            $("#dealer-card-section").prepend(`
            <div class="col">
        <img class="img card float-left" src="${element.src}">
        </div>
        `)
        });

        evalRound();
    }
})

$("#stand").on("click", function () {

    dealerPlay();
    evalRound();

})

$("#double").on("click", function () {

    deal(yourCards);
    appendYours();

    dealerPlay();
    evalRound();

})

$("#split").on("click", function split() {

    if ($(this).hasClass('disabled')) {
        alert("You can't split with those cards.")
        return false;
    }

    yourSplitCards.push(yourCards[1]);
    yourCards.splice(1, 1);
    console.log(yourCards, "yourcards splice")
    console.log(yourSplitCards, "yoursplitcards splice")

    $("#split-card-section").show();
    $("#card-section").empty();

    yourCards.forEach(element => {
        $("#card-section").append(`
        <img class="img card float-left" src="${element.src}">
        `)
    });

    yourSplitCards.forEach(element => {
        $("#split-card-section").append(`
        <img class="img card float-left" src="${element.src}">
        `)
    });

})

$("#insurance").on("click", function split() {

    if ($(this).hasClass('disabled')) {
        alert("You don't need insurance.")
        return false;
    }

    if (handValue(dealerCards).total === 21) {
        dealerPlay();
        evalRound();
    } else {
        deal(yourCards);
        initCount();
        $("#card-section").append(`
        <div class="col">
        <img class="img card float-left" src="${yourCards[yourCards.length - 1].src}">
        </div>
        `)
        if (handValue(yourCards).total > 21) {
            alert("You bust.");

            $("#dealer-card-section").empty();

            dealerCards.forEach(element => {
                $("#dealer-card-section").prepend(`
                <div class="col">
            <img class="img card float-left" src="${element.src}">
            </div>
            `)
            });

            evalRound();
        }
    }

})

$("#no-insurance").on("click", function split() {

    if ($(this).hasClass('disabled')) {
        alert("You don't need insurance.")
        return false;
    }

    if (handValue(dealerCards).total === 21) {
        dealerPlay();
        evalRound();
    } else {
        deal(yourCards);
        initCount();
        $("#card-section").append(`
        <div class="col">
        <img class="img card float-left" src="${yourCards[yourCards.length - 1].src}">
        </div>
        `)
        if (handValue(yourCards).total > 21) {
            alert("You bust.");

            $("#dealer-card-section").empty();

            dealerCards.forEach(element => {
                $("#dealer-card-section").prepend(`
                <div class="col">
            <img class="img card float-left" src="${element.src}">
            </div>
            `)
            });

            evalRound();
        }
    }

})

$("#new-hand").on("click", function () {

    if ($(this).hasClass('disabled')) {
        alert("Finish this round first.")
        return false;
    }

    newRound();

})