function suggestion() {

    let total = handValue(activeHand).total;
    let dealer = parseInt(dealerCards[1].trueValue);

    let canSplit = false
    let pair;

    if (activeHand[0].trueValue === activeHand[1].trueValue) {
        canSplit = true;
        pair = parseInt(activeHand[0].trueValue)
    }

    console.log("total: " + total)
    console.log("dealer: " + dealer)


    if (dealer === 11 && !$("#insurance").hasClass("disabled")) {
        return alert("No insurance.");
    }

    if (canSplit === true) {

        if (pair === 2 || pair === 3 || pair === 7) {

            if (2 <= dealer && dealer <= 7) {
                alert("Split.")
            } else {
                alert("Hit.")
            }
            return;
        }

        if (pair === 4) {
            if (dealer === 5 || dealer === 6) {
                alert("Split");
            } else {
                alert("Hit.");
            }
            return;
        }

        // if (pair === 5) {
        //     alert("Double.")
        // }

        if (pair === 7) {

            if (2 <= dealer && dealer <= 8) {
                alert("Split.")
            } else {
                alert("Hit.")
            }
            return;
        }

        if (pair === 8 || pair === 11) {
            alert("Split.")
            return;
        }

        if (pair === 9) {
            if (dealer === 7 || dealer === 10 || dealer === 11) {
                alert("Stand");
            } else {
                alert("Split");
            }
            return;
        }

    }


    if (handValue(activeHand).hasAces === true && handValue(activeHand).soft === true) {

        if (total === 13 || total === 14) {

            if ((2 <= dealer && dealer <= 4) || (7 <= dealer && dealer <= 11)) {
                alert("Hit.")
            } else if (dealer === 5 || dealer === 6) {
                alert("Double if allowed, otherwise hit.")
            }



        }


        if (total === 15 || total === 16) {
            if ((2 <= dealer && dealer <= 3) || (7 <= dealer && dealer <= 11)) {
                alert("Hit.")
            } else if ((dealer === 4 || dealer === 5 || dealer === 6)) {
                alert("Double if allowed, otherwise hit.")
            }
        }


        if (total === 17) {
            if (dealer === 2 || (7 <= dealer && dealer <= 11)) {
                alert("Hit.")
            } else if ((dealer === 3 || dealer === 4 || dealer === 5 || dealer === 6)) {
                alert("Double if allowed, otherwise hit.")
            }
        }

        if (total === 18) {
            if (dealer === 2 || dealer === 7 || dealer === 8) {
                alert("Stand.")
            } else if (2 <= dealer && dealer <= 6) {
                alert("Double if allowed, otherwise stand.")
            }
            else if (dealer >= 9) {
                alert("Hit.")
            }
        }


        if (total > 19) {
            alert("Stand.")
        }





    }


    if (handValue(activeHand).hasAces === false || (handValue(activeHand).hasAces === true && handValue(activeHand).soft === false)) {

        if (4 <= total && total <= 8) {
            alert("Hit.");
        }

        if (total === 9 && dealer <= 6) {
            alert("Double if allowed, otherwise hit.")
        } else if (total === 9 && dealer > 6) {
            alert("Hit.")
        }

        if (total === 10 && dealer <= 9) {
            alert("Double if allowed, otherwise hit.")
        } else if (total === 10 && dealer > 9) {
            alert("Hit.")
        }

        if (total === 11) {
            alert("Double if allowed, otherwise hit.")
        }

        if (total === 12 && dealer <= 3 || total === 12 && dealer >= 7) {
            alert("Hit.")
        } else if (total === 12 && dealer >= 4 && dealer <= 6) {
            alert("Hit.")
        }


        if ((13 <= total && total <= 16) && dealer <= 6) {
            alert("Stand.")
        } else if ((13 <= total && total <= 16) && dealer > 6) {
            alert("Hit.")
        }


        if (total >= 17) {
            alert("Stand.");
        }

    }



}