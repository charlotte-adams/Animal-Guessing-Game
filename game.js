"use strict";

var url = 'http://unloop.edu:3030/animals';

$(document).ready(function() {
    $(".phase-1 button").click(beginGame);
    $(".phase-2 button").click(getNextQuestion);
    $(".phase-2").hide();
    $(".phase-3 button").click(wasTheCpuRight);
    $(".phase-3").hide();


});

function beginGame() {
    $(".phase-1").fadeOut(1000);
    $(".phase-2").fadeIn(1000);
    $.get(url, { id: 1 }, getAjax);
}

function getAjax(anotherQuestion) {
    if (anotherQuestion.question) {

        $(".question").text(anotherQuestion.question);
        $(".yes").data("nextQuestion", anotherQuestion.yes);
        $(".no").data("nextQuestion", anotherQuestion.no);

    } else {
        $(".answer").text(anotherQuestion.answer);
        $(".phase-3").fadeIn(1000);
        $(".phase-2").fadeOut(1000);
    }
}

function getNextQuestion() {
    $.get(url, { id: $(this).data("nextQuestion") }, getAjax)
}

function wasTheCpuRight() {
    if ($(this).hasClass("cpu-wrong")) {
        $(".phase-1 .lead").text("Well, you can't win em' all.");
    } else {
        $(".phase-1 .lead").text("Ha! Computer knows all!");
    }
    $(".phase-1").fadeIn(1000);
    $(".phase-3").fadeOut(1000);
    $(".phase-1 h2").text("Do you want to play again?");
}
