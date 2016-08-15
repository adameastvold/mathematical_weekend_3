$(document).ready(function() {

    var $answerBox = $('.answerBox'); //answerBox is both an input and display

    // the three following variables will be used to create an object to send via AJAX
    var numOne; // this will be used to store the first number
    var numTwo; // this will be used to store the second number
    var operator; // this will be used to store the operator



    clearAnswerBox(); // calling this here will automatically have the display/input become 0

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

    // =================================================================
    //      EQUALS FUNCTION WHICH INCLUDES OBJECT BUILDING AND AJAX
    // =================================================================

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

        //  OBJECT TO SEND

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
                console.log('information received!!')
                $answerBox.val(result);
            }
        });

    });

});
