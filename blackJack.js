
var dealerSum= 0;
var playerSum= 0;

var dealerAceValue=0;
var playerAceValue=0;
 
var hidden;
var deck;

var canHit = true;

 
 
 window.onload = function(){
     createDeck();
     shuffleDeck();
     startGame();
 }
 
 
 function createDeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let suit = ["C","D","H","S"];
    deck = [];
    for(let i=0;i< suit.length;i++){
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
 }
 function startGame(){
     hidden = deck.pop();
     dealerSum += getValue(hidden);
     dealerAceValue += checkAce(hidden);
     //console.log(hidden);
     //console.log(dealerSum);
     while(dealerSum <18){
        let cardImg = document.createElement('img');//created image tag
        let card = deck.pop();//got card from deck
        cardImg.src = "./cards/"= card+".png";//found the image tag based on card
        dealerSum += getValue(card);
        dealerAceValue += checkAce(card);//check for any aces to change value form 1 or 11
        document.getElementById('dealerHand').append(cardImg);//appened the image in the dealers div
     }
     console.log(dealerSum);
 }


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