
//Setting the dealer and player score to 0
var dealerSum= 0;
var playerSum= 0;

//Ace can hold two seperate values; adding a way to calculate it
var dealerAceValue=0;
var playerAceValue=0;
//
var hidden;
//
let message = "";
var deck;
//
var canHit = true;



 window.onload = function(){
     createDeck();
     shuffleDeck();
    }
 
 
 function createDeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];//creating deck of cards with values and suit which corospond to img name
    let suit = ["C","D","H","S"];
    deck = [];
    for(let i=0;i< suit.length;i++){//cycling through suits and values to fin
        for(let k=0;k<values.length;k++){
            deck.push(values[k]+"_"+suit[i]);
    }
 }
}
 
 function shuffleDeck(){
    for (let i = 0; i<deck.length;i++){
        let j = Math.floor(Math.random()* deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    document.getElementById('start').addEventListener('click',startGame);
}
 function startGame(){
     hidden = deck.pop();
     dealerSum += getValue(hidden);
     dealerAceValue += checkAce(hidden);


    console.log(dealerSum);

    for(let i =0; i < 2; i++){
        let cardImg = document.createElement('img');//created image tag
        let card = deck.pop();//got card from deck
        cardImg.src = "Card_img/" + card + ".png";//found the image tag based on card
        playerSum += getValue(card);
        playerAceValue += checkAce(card);//check for any aces to change value form 1 or 11
        document.getElementById('playerHand').append(cardImg);//appened the image in the dealers div
    
    }
    console.log(playerSum)
    document.getElementById('hit').addEventListener('click', hit);
    document.getElementById('stay').addEventListener('click', stay);
    





    function hit(){
        if (!canHit){
            return;}
        let cardImg = document.createElement('img');//created image tag
        let card = deck.pop();//got card from deck
        cardImg.src = "Card_img/" + card + ".png";//found the image tag based on card
        playerSum += getValue(card);
        playerAceValue += checkAce(card);//check for any aces to change value form 1 or 11
        document.getElementById('playerHand').append(cardImg);//appened the image in the dealers div

        if(reduceAce(playerSum, playerAceValue)> 21){
            canHit = false;
            } 
        }

 function stay(){
        dealerSum = reduceAce(dealerSum, dealerAceValue);
        playerSum = reduceAce(playerSum, playerAceValue);

        canHit = false
        document.getElementById('hidden').src = 'Card_img/' + hidden + '.png';

        while(dealerSum <18){
            let cardImg = document.createElement('img');//created image tag
            let card = deck.pop();//got card from deck
            cardImg.src = "Card_img/" + card + ".png";//found the image tag based on card
            dealerSum += getValue(card);
            dealerAceValue += checkAce(card);//check for any aces to change value form 1 or 11
            document.getElementById('dealerHand').append(cardImg);//appened the image in the dealers div
         }
         if (dealerSum < playerSum)
         message = 'You Win!';
         if (dealerSum == 21)
         message = 'You Lost';
         if (playerSum > 21);
         message = 'You Lost';
         if (playerSum == 21)
         message = 'BLACKJACK!'
         if (playerSum == dealerSum)
         message = 'Draw!';
            
         document.getElementById('results').innerText = message;
        document.getElementById('playerTotal').innerText = playerSum;
        document.getElementById('dealerTotal').innerText = dealerSum;
     }

//Grabbing the value from the card and and converting it into a value for the score keepinhg
    function getValue(card){
        let data = card.split("_");
        let value = data[0];

         if(isNaN(value)){
            if(value == "A"){
              return 11;
             }
            return 10;
         }
        return parseInt(value);
      }  

    function checkAce(card){
        if(card[0]== "A"){
          return 1;
            }
            return 0;
            }
//Inspriration from developer ImKennyYip anf help with the idea to reduce the ace and create a function to track the amount in hand
    function reduceAce(playerSum,playerAceValue){
        while(playerSum > 21 && playerAceValue > 0){
         playerSum -= 10;
         playerAceValue -= 1;
            }
            return playerSum
         }
     }