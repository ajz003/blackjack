var deck = [];
var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var suitsL = ["S", "D", "C", "H"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var yourCards = [];
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
    alert ("Deck has been shuffled.");
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


// ------------------------------------ CHANGE THIS AFTER TESTING

let cutNote = false; 
function deal(playerHand) {
    playerHand.push(deck[0]);
    // let rand = Math.random()
    // if (rand > 0.5) {
    //     playerHand.push(new Card("8", "Clubs", `assets/images/8C.png`, "8"));
    // } else {
    //     playerHand.push(new Card("8", "Spades", `assets/images/8S.png`, "8"));
    // }
    deck.splice(0, 1);
    $("#cards-left").html(`${deck.length}/104`)

    if (deck.length <= cutPosition * (52*2) && cutNote === false) {
        alert("Cut card has been reached.")
        cutNote = true;
    }

}
// ------------------------------------ CHANGE THIS AFTER TESTING

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

    // $("#count").html(runningCount)
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
    <img class="img card float-left" src="${yourCards[yourCards.length - 1].src}">
    `)
}

function switchActive() {

    $(`#split-card-section-${splitNumber}`).removeClass("active");
    splitNumber--;
    $(`#split-card-section-${splitNumber}`).addClass("active");
    if (splitNumber === 0) {
        activeHand = yourCards;
        $("#card-section").addClass("active");
    }
    if (handValue(activeHand).total === 21) {
        switchActive();
    }

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

    splits = [splitArr1, splitArr2, splitArr3]

    for (let i = splits.length - 1; i >= 0; i--) {

        if (splits[i].length > 0) {
            let yourTotal = handValue(splits[i]).total;

            if (yourTotal > 21) {
                return;
            }

            if (dealerTotal > 21) {
                alert("庄家 爆牌了.");
                return;
            }

            if (dealerTotal > yourTotal) {
                alert(`庄家 wins with a ${dealerTotal} over your ${yourTotal}. (Split)`);
            }
            if (dealerTotal < yourTotal) {
                alert(`You win with a ${yourTotal} over the dealer's ${dealerTotal}. (Split)`);
            }
            if (dealerTotal === yourTotal) {
                alert("平手. (Split)");
            }
        }

    }

    if (yourTotal > 21) {
        return;
    }

    if (dealerTotal > 21) {
        alert("庄家 爆牌了.");
        return;
    }

    if (dealerTotal > yourTotal) {
        alert(`庄家 wins with a ${dealerTotal} over your ${yourTotal}.`);
    }
    if (dealerTotal < yourTotal) {
        alert(`You win with a ${yourTotal} over the dealer's ${dealerTotal}.`);
    }
    if (dealerTotal === yourTotal) {
        alert("平手");
    }

    count(yourCards);

    for (let i = 0; i < splits.length; i++) {
        count(splits[i]);
    }

    count(dealerCards);

    // $("#count").html(runningCount)
    $("#your-count").html(runningCount)

}

let cutPosition;

function initDeck() {

    trueRoundCount = 0;
    playerRoundCount = 0;

    deck = [];
    cutNote = false;

    makeDeck(2);
    shuffleDeck(deck);

    cutPosition = 1-((60 + Math.floor(Math.random() * 21))/100)
    let cutReport = 1-cutPosition;
    alert("Cut card was placed " + Math.round((cutReport*100)) + "% of the way into the deck.")

    newRound();

}

function newRound() {

    yourCards = [];
    dealerCards = [];

    splitArr1 = [];
    splitArr2 = [];
    splitArr3 = [];

    splits = [splitArr1, splitArr2, splitArr3]

    splitNumber = 0;

    if (deck.length <= cutPosition * (52*2)) {
        return initDeck();
    }

    activeHand = yourCards;

    $(".btn").removeClass("disabled")

    $("#dealer-card-section").empty();
    $("#card-section").empty();
    $("#card-section").removeClass("active");

    $(".split").remove();

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

        if (handValue(dealerCards).total === 21) {
            dealerPlay();
            evalRound();
            return;
        }

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

    if (parseInt(yourCards[0].trueValue) === parseInt(yourCards[1].trueValue)) {
        $("#split").removeClass("disabled");
    }

    if (dealerCards[1].value === "Ace") {
        $(".btn").addClass("disabled")
        $("#insurance").removeClass("disabled");
        $("#no-insurance").removeClass("disabled");
        $("#suggestion").removeClass("disabled");
    }

}

// ----------------------------- Keypresses

$(document).keypress(function (e) {
    alert(e.which)

    switch (e.which) {
        case 32:
            alert("Hit.");
            break;
        case 97:
            alert("Stand.");
            break;
        case 100:
            alert("Double.");
            break;
        case 115:
            alert("Split.");
            break;
        case 114:
            alert("Insurance.");
            break;
        case 99:
            alert("No Insurance.");
            break;
    }


})

// ----------------------- APPLICATION

initDeck();

// ------------------------- jQuery

$("#split-card-section").hide();

var splitArr1 = [];
var splitArr2 = [];
var splitArr3 = [];

var splits = [splitArr1, splitArr2, splitArr3]

var splitNumber = 0;

var activeHand = yourCards;

$("#split").on("click", function split() {

    if ($(this).hasClass('disabled')) {
        alert("You can't split with those cards.")
        return false;
    }

    if (splitNumber >= 3) {
        alert("You can't split anymore.");
        return false;
    }

    splitNumber++;
    console.log(splitNumber, "splitnumber")

    activeHand = splits[splitNumber - 1];

    $("#your-play-row").append(`
    <div class="col split active" id="split-card-section-${splitNumber}">

    </div>
    `)

    if (splitNumber > 1) {

        activeHand.push(splits[splitNumber - 2][1]);
        activeHand.splice(1, 1);

        $(`#split-card-section-${splitNumber - 1}`).removeClass("active");

        $(`#split-card-section-${splitNumber - 1}`).empty();

        deal(splits[splitNumber - 2]);
        deal(activeHand);

        splits[splitNumber - 1].forEach(element => {
            $(`#split-card-section-${splitNumber - 1}`).append(`
            <img class="img card float-left" src="${element.src}">
            `)
        });

    } else {
        activeHand.push(yourCards[1]);
        yourCards.splice(1, 1);

        $("#card-section").empty();

        deal(yourCards);
        deal(activeHand);

        yourCards.forEach(element => {
            $("#card-section").append(`
        <img class="img card float-left" src="${element.src}">
        `)
        });

    }

    activeHand.forEach(element => {
        $(`#split-card-section-${splitNumber}`).append(`
        <img class="img card float-left" src="${element.src}">
        `)
    });

    if (handValue(activeHand).total === 21) {
        switchActive();
    }

    if (activeHand[0].trueValue !== activeHand[1].trueValue) {
        $("#split").addClass("disabled");
    }

})

$("#hit").on("click", function hit() {

    deal(activeHand);
    initCount();

    if (activeHand === yourCards) {
        $("#card-section").append(`
        <img class="img card float-left" src="${activeHand[activeHand.length - 1].src}">
    `)

        if (handValue(activeHand).total > 21) {
            alert("You 爆牌了.");

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

        if (handValue(activeHand).total === 21) {
            dealerPlay();
            evalRound();
        }

    } else {
        $(`#split-card-section-${splitNumber}`).append(`
        <img class="img card float-left" src="${activeHand[activeHand.length - 1].src}">
        `)

        if (handValue(activeHand).total > 21) {
            alert("You 爆牌了.");

            switchActive();

        }
    }


})

$("#stand").on("click", function () {

    if (activeHand === yourCards) {
        dealerPlay();
        evalRound();
    } else {
        switchActive();
    }


})

$("#double").on("click", function () {

    if (activeHand.length < 3) {
        deal(activeHand);

        if (activeHand === yourCards) {

            if (handValue(activeHand).total > 21) {
                alert("You 爆牌了.");
            }

            appendYours();
            dealerPlay();
            evalRound();

        } else {

            $(`#split-card-section-${splitNumber}`).append(`
        <img class="img card float-left" src="${activeHand[activeHand.length - 1].src}">
        `)

            if (handValue(activeHand).total > 21) {
                alert("You 爆牌了.");


            }
            switchActive();
        }
    }


})



$("#insurance").on("click", function split() {

    if ($(this).hasClass('disabled')) {
        alert("You don't need insurance.")
        return false;
    }

    if (handValue(dealerCards).total === 21) {
        alert("Your insurance paid off!")
        dealerPlay();
        evalRound();
    } else {
        alert("You lost your insurance.")
        $(".btn").removeClass("disabled");

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

        if (parseInt(yourCards[0].trueValue) === parseInt(yourCards[1].trueValue)) {
            $("#split").removeClass("disabled");
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
        alert("庄家 does not have blackjack.")
        $(".btn").removeClass("disabled");

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

        if (parseInt(yourCards[0].trueValue) === parseInt(yourCards[1].trueValue)) {
            $("#split").removeClass("disabled");
        }
    }

})

$("#suggestion").on("click", function () {

    suggestion();
})

$("#new-hand").on("click", function () {

    if ($(this).hasClass('disabled')) {
        alert("Finish this round first.")
        return false;
    }

    newRound();

})

$(".btn").on("click", function () {
    if (activeHand.length > 2) {
        $("#double").addClass("disabled");
        $("#split").addClass("disabled");
    }
})

