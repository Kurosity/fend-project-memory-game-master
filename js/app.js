/*
 * Create a list that holds all of your cards
 */
let myCards = document.querySelectorAll('.card');
let reset = document.querySelector('.restart');
let replay = document.querySelector('.replay');
let close = document.querySelector('.close');
let maxOpen = [];
let move = 0;
let stars = document.querySelectorAll('.stars li i');
let startTime;
let currentTime = 0;
let elaspeTime;
let matchCards = 0;
let clickCount = 0;
let minute = 0;
let second = 0;
let time = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
* Clear the board once the page has been loaded
* All cards are not shown and the number of moves = 0
*/

function clearBoard(board){
    board.forEach(
        function(card){
            card.classList.remove('show', 'match', 'open');
        }
    );
    document.querySelector('.moves').innerHTML = move;
    cardShuffle();
    clickCount = 0;
    //Begin();
};

clearBoard(myCards);

/*
* Event listener for reseting the boards
*/

reset.addEventListener('click', resetBoard);

function resetBoard(){
    closeCard();
    if (move >= 16){
         stars[0].classList.toggle('fa-star');
         if (move >= 24){
            stars[1].classList.toggle('fa-star');
         }
     }

    
    move = 0;
    clickCount = 0;
    document.querySelector('.moves').innerHTML = move;
    cardShuffle();
   
    clearInterval(time);
    minute = 0;
    second = 0;
};

/*
* Close Cards
*/
function closeCard(){
    myCards.forEach(
        function(card){
            card.classList.remove('show', 'match', 'open');
        }
    );
}

/*
*  Clock
*/

function Begin(){
    time = setInterval(timer, 1000);
};
function End(){
    clearInterval(time);
};

function timer(){
    second++;

    if (second === 60){
        minute++;
        second = 0;
    }

    if (second < 10){
        document.querySelector('.timer').innerHTML = minute + ' : 0' + second;    
    }
    else{
        document.querySelector('.timer').innerHTML = minute + ' : ' + second;
    }
}

/*
* Card Shuffle
*/

function cardShuffle(){
    let t = Array.from(document.querySelectorAll('.card'));
    shuffle(t);

    for(x of t){
        document.querySelector('.deck').appendChild(x);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

myCards.forEach(
    function(card){
        card.addEventListener('click', 
            function(evt){
                if(!card.classList.contains('open') 
                && !card.classList.contains('show') 
                && !card.classList.contains('match')){                
                    maxOpen.push(card);
                    card.classList.add('open','show');
                    clickCount += 1;

                    if (clickCount == 1){
                        Begin();
                    }
            
                    if(maxOpen.length == 2){
                        if(maxOpen[0].innerHTML === maxOpen[1].innerHTML){
                            match();
                            if (matchCards === 16){
                                win();
                            }
                        }
                        else{
                            noMatch();
                        }
                    };
                };
            }
        );
    }
);

/*
*  Remove Open and Show for cards that are not a match
*/

function noMatch(){
   setTimeout(
        function(){
            maxOpen.forEach(
                function (card){
                card.classList.remove('open','show');
                }
            );
            counter();
            score();
            maxOpen = [];
        }, 500
    );
}

/*
* If a card matches, remove Open and Show and add Match
*/

 function match(){
    maxOpen.forEach(
        function(card){
            card.classList.remove('open','show');
            card.classList.add('match');
            matchCards += 1;
        }
    )
    counter();
    score();
    maxOpen = [];
 };

 /*
 * Increase the move count for each attempted match
 */

function counter(){
    move += 1;
    document.querySelector('.moves').innerHTML = move;
};

/*
* Score - Remove one star at 16 moves
*         Remove another star at 24 moves
*/

function score(){
    if (move === 16){
        stars[0].classList.toggle('fa-star');
    }
    else if (move === 24){
        stars[1].classList.toggle('fa-star');
    }
}

/*
* Game Finish
*/

function win(){
    End();
    displayScore();
   
   if(minute < 1){
       document.querySelector('.finishTime').innerHTML = second + ' seconds';       
   }
   else if (minute === 1 && second === 0){
       document.querySelector('.finishTime').innerHTML = minute + ' minute';
   }
   else if(minute === 1 && second === 1){
       document.querySelector('.finishTime').innerHTML = minute + ' minute and ' + second +' second';
   }
   else if(minute ===1 && second > 1){
       document.querySelector('.finishTime').innerHTML = minute + ' minute and ' + second +' seconds';
   }
   else{
       document.querySelector('.finishTime').innerHTML = minute + ' minutes and ' + second +' seconds';
   }


    let countStar = document.querySelectorAll('.fa-star').length;

    if (countStar === 1){
        document.querySelector('.finishStar').innerHTML = countStar + ' star';
    }
    else{
        document.querySelector('.finishStar').innerHTML = countStar + ' stars';
    }
}

function displayScore(){
    document.querySelector('.modal').classList.toggle('displayModal');
}



/*
* Event listener for replay on Modal
*/

replay.addEventListener('click', replayButton);

function replayButton(){
    displayScore();
    resetBoard();
    End();
}

/*
* Event listener for close on Modal
*/

close.addEventListener('click', closeButton);

function closeButton(){
    displayScore();
}