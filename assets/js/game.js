function genereateGameLevel(levelCount) {

    let levels = [];

    for (let counter = 1; counter <= levelCount; counter++) {

        let number_one = getNumber(counter);
        let number_two = getNumber(counter);
        let operator = getOperator();
        let isCorrect = Math.random() > 0.5;
        let level = {
            number_one: number_one,
            number_two: number_two,
            operator: operator,
            answer: getAnswer(isCorrect ? number_one : number_one + Math.floor((Math.random() * counter + 1)), number_two, operator),
            isCorrect: isCorrect,
        };
        levels.push(level);
    }

    return levels;


}

function getNumber(step) {
    return Math.floor(Math.random() * step);
}
let operators = ['+', '-', '*'];
function getOperator() {
    let index = Math.floor(Math.random() * operators.length);
    return operators[index];
}

function getAnswer(number_one, number_two, operator) {
    return eval(`${number_one} ${operator} ${number_two}`);
}

function showQuestion(level) {

    $('#number_one').text(level.number_one);
    $('#number_two').text(level.number_two);
    $('#operator').text(level.operator);
    $('#answer').text(level.answer);

}
let currentQuestion = null;
let currentScore = 0;
function updateScore() {
    $('#currentScore').text(currentScore);
}
$(document).ready(function ($) {

    let levels = genereateGameLevel(10);
    let _startWrapper = $('#startWrapper');
    let _levelWrapper = $('#levelWrapper');
    let _finishWrapper = $('#finishWrapper');

    $(document).on('click', '#startGame', function (e) {
        _startWrapper.hide();
        _levelWrapper.show();
        currentQuestion = levels.shift();
        console.log(currentQuestion);
        showQuestion(currentQuestion);
        updateScore();

    });
    $(document).on('click', '#true_answer', function (e) {

        if (currentQuestion.isCorrect) {
            currentScore += 10;
        } else {
            currentScore -= 10;
        }

        currentQuestion = levels.shift();
        if (!currentQuestion) {
            _levelWrapper.hide();
            _finishWrapper.show();
            $('#finish_score').text(currentScore);
        }
        showQuestion(currentQuestion);
        updateScore();


    });
    $(document).on('click', '#wrong_answer', function (e) {
        if (!currentQuestion.isCorrect) {
            currentScore += 10;
        } else {
            currentScore -= 10;
        }
        currentQuestion = levels.shift();
        if (!currentQuestion) {
            _levelWrapper.hide();
            _finishWrapper.show();
            $('#finish_score').text(currentScore);


        }
        showQuestion(currentQuestion);
        updateScore();
    });

});