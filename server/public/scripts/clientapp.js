$(document).ready(function() {

    var $answerBox = $('.answerBox');

    var numOne;
    var numTwo;
    var operator;



    clearAnswerBox();

    // ======================
    //      Reset button
    // ======================

    function clearAnswerBox() {
        numOne = null;
        numTwo = null;
        operator = null;
        $answerBox.val('0');
    };

    $('#clear').on('click', function() {
        console.log('clear button is working');
        clearAnswerBox();
    });


    // ===============================
    //  Number storage & manipulation
    // ===============================


    $('.numberBox div').on('click', function() {
        var clickValue = $(this).text();
        var runningNumber = $answerBox.val();
        var newValue;
        if (runningNumber === '0') {
            newValue = clickValue;
        } else {
            newValue = runningNumber + clickValue;
        }
        $answerBox.val(newValue);
        console.log('You have clicked on ' + clickValue);
        console.log('Your running number is ' + $answerBox.val());
    });


    $('.operatorBox div').on('click', function() {
        operator = $(this).text();
        // console.log('the current total is: ' + $answerBox.val());
        numOne = parseFloat($answerBox.val());
        console.log('You have stored ' + numOne);
        $answerBox.val('0');
    });

    //equals

    $('#equals').on('click', function() {

        numTwo = parseFloat($answerBox.val());
        console.log('You have now stored ' + numTwo + ' and will apply the ' + operator + ' operator to ' + numOne);

        // The below if statement will essentially determine which route url to send to
        var operatorName;

        if (operator === '+') {
            operatorName = 'adding'
        } else if (operator === '-') {
            operatorName = 'subtracting'
        } else if (operator === '/') {
            operatorName = 'dividing'
        } else if (operator === 'x') {
            operatorName = 'multiplying'
        };


        var dataSend = {
            firstNumber: numOne,
            operatorSelected: operator,
            secondNumber: numTwo
        };

        console.log(dataSend);
        //      POST AJAX CALL
        $.ajax({
            type: 'POST',
            url: '/' + operatorName,
            data: dataSend,
            success: function() {
                console.log('information sent!!')
            }
        });

        //      GET AJAX CALL

        $.ajax({
            type: "GET",
            url: "/" + operatorName,
            success: function(result) {
                $answerBox.val(result);
            }
        });

    });

});
