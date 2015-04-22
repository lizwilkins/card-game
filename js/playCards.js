$(document).ready(function(){
    var cardDeck = $("#cardDeck").playingCards();
    cardDeck.spread(); // show it

    var discardPile = [];
    var hand1 = [];
    var hand2 = [];

    var showError = function(msg){
        $('#error').html(msg).show();
        setTimeout(function(){
            $('#error').fadeOut('slow');
        },3000);
    }
    var showCards = function(){
        var el = $('#hand1')
        el.html('');
        for (var i=0; i<hand1.length; i++){
            el.append(hand1[i].getHTML());
        }
        el = $('#hand2')
        el.html('');
        for (var i=0; i<hand2.length; i++){
            el.append(hand2[i].getHTML());
        }
        el = $('#discardPile')
        el.html('');
        for (var i=0; i<discardPile.length; i++){
            el.append(discardPile[i].getHTML());
        }
        cardDeck.spread();
    }
    var doShuffle = function(){
        cardDeck.shuffle();
        cardDeck.spread(); // update card table
    }
    var doDeal = function(){
        for (var i=0; i<7; i++){
            doDrawCard1();
            doDrawCard2();
        }
    }
    var doSortByRank = function(){
        cardDeck.orderByRank();
        showCards();
    }
    var doSortBySuit = function(){
        cardDeck.orderBySuit();
        showCards();
    }
    var doBackToDeck = function(){
        if(!discardPile.length){
            showError('discard pile is empty');
            return;
        }
        var c = discardPile.pop();
        cardDeck.addCard(c);
        showCards();
    }
    var doDiscard1 = function(){
        if(!hand1.length){
            showError('Player1 hand is empty');
            return;
        }
        var c = hand1.pop();
        discardPile[discardPile.length] = c;
        showCards();
    }
    var doDiscard2 = function(){
        if(!hand2.length){
            showError('Player2 hand is empty');
            return;
        }
        var c = hand2.pop();
        discardPile[discardPile.length] = c;
        showCards();
    }    
    var doPassCard1 = function(){
        if(!hand1.length){
            showError('Player1 hand is empty');
            return;
        }
        var c = hand1.pop();
        hand2[hand2.length] = c;
        showCards();
    }
    var doPassCard2 = function(){
        if(!hand2.length){
            showError('Player2 hand is empty');
            return;
        }
        var c = hand2.pop();
        hand1[hand1.length] = c;
        showCards();
    }  
    var doDrawCard1 = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        hand1[hand1.length] = c;
        showCards();
    }
    var doDrawCard2 = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        hand2[hand2.length] = c;
        showCards();
    }
    var doTakeCard1 = function(){
        if(!hand2.length){
            showError('Player2 hand is empty');
            return;
        }
        var c = hand2.pop();
        hand1[hand1.length] = c;
        showCards();
    }
    var doTakeCard2 = function(){
        if(!hand1.length){
            showError('Player1 hand is empty');
            return;
        }
        var c = hand1.pop();
        hand2[hand2.length] = c;
        showCards();
    }

    $('#shuffle').click(doShuffle);
    $('#deal').click(doDeal);
    $('#backToDeck').click(doBackToDeck);
    $('#sortByRank').click(doSortByRank);
    $('#sortBySuit').click(doSortBySuit);
    
    $('#discard1').click(doDiscard1);
    $('#discard2').click(doDiscard2);
    $('#pass1').click(doPassCard1);
    $('#pass2').click(doPassCard2);
    $('#draw1').click(doDrawCard1);
    $('#draw2').click(doDrawCard2);
    $('#take1').click(doTakeCard1);
    $('#take2').click(doTakeCard2);
});
/*
// if we weren't using jquery to handle the document ready state, we would do this:
if (window.addEventListener) {
    window.addEventListener("load",initPlayingCards,false);
} else if (window.attachEvent) {
    window.attachEvent("onload",initPlayingCards);
} else {
    window.onload = function() {initPlayingCards();}
}
function initPlayingCards() {
    cardDeck = new playingCards();
}
*/
