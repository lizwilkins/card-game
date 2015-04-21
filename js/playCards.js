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
    var doDiscard1 = function(){
        if(!hand1.length){
            showError('your hand is empty');
            return;
        }
        var c = hand1.pop();
        if (!discardPile.length) {discardPile = $("#discardPile").addCard(c);}
        else {discardPile.addCard(c);}
        showCards();
    }
    var doDiscard2 = function(){
        if(!hand2.length){
            showError('your hand is empty');
            return;
        }
        var c = hand2.pop();
        if (!discardPile.length) {discardPile = $("#discardPile").addCard(c);}
        else {discardPile.addCard(c);}
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
    var doBackToDeck = function(){
        var c = discardPile.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        cardDeck.addCard(c);
        showCards();
    }
    var doDeal = function(){
        for (var i=0; i<7; i++){
            doDrawCard1();
            doDrawCard2();
        }
    }
    $('#backToDeck').click(doBackToDeck);
    $('#shuffler').click(doShuffle);
    $('#dealer').click(doDeal);
    $('#draw2').click(doDrawCard2);
    $('#draw1').click(doDrawCard1);
    $('#discard2').click(doDiscard2);
    $('#discard1').click(doDiscard1);
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
