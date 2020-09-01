/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, six;

init();

//New game initialisation
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

//Button roll
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //Radom number
        var dice = Math.floor(Math.random() * 6) +  1;
        var dice2 = Math.floor(Math.random() * 6) +  1;
        //Display result
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        //changes img src in html
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        //Update the round score IF the rolller number was NOT a 1
        if (dice !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            nextPlayer();
        }
    }
});

//Button hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        //sets final score limit
        var setFinalScore = document.querySelector('.final-score').value;
        var finalScore;
        if (setFinalScore){
            finalScore = setFinalScore;
        } else {
            finalScore = 100;
        }
        //Add current score to global score
        scores[activePlayer] += roundScore;
        //Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        document.querySelector('#current-' + activePlayer).textContent = '0';
        //Check if player wont the game
        if (scores[activePlayer] >= finalScore){
            gamePlaying = false;

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

//Button satart ne game
document.querySelector('.btn-new').addEventListener('click', init);











