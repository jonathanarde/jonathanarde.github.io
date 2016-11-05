/*
this file contains all the function declarations needed for creating questionList
and the form to edit it
*/


//attach event handler for question list
function attachEventHandler($questionList, $questionFormEdit, questionModel, questions) {

    //edit button onclick
    //create questionFormEdit DOM and show it
    //show cancel and save button, hide edit and delete button
    $questionList.find('#edit').on('click', function() {
        $questionFormEdit = questionFormEdit(questionModel);
        $questionList.append($questionFormEdit);
        $questionFormEdit.show();
        $questionList.find('#save').show();
        $questionList.find('#cancel').show();
        $questionList.find('#edit').hide();
        $questionList.find('#delete').hide();
    });


    //delete button onclick
    //delete question list DOM
    //delete the data from questions Object
    //updating the question #
    $questionList.find('#delete').on('click', function() {
        var index = $('.questionList').index($questionList);
        console.log(index)
        questions.splice(index, 1);
        $questionList.remove();
        $('.questionList').each(function(index) {
            $(this).find('span#questionNumber').text('Question #' + (index + 1));
        });
    });

    //cancel button onclick
    $questionList.find('#cancel').on('click', function() {
        $questionFormEdit.remove();
        $questionList.find('#save').hide();
        $questionList.find('#cancel').hide();
        $questionList.find('#edit').show();
        $questionList.find('#delete').show();
    });

    //save button event handler
    //save the data from DOM to questions object
    $questionList.find('#save').on('click', function() {
        //all variables needed for input validation
        //replace is for intepreting 'enter' and 'space' as just ''
        var currentQuestion = $questionFormEdit.find('#question').val().replace(/^\s+|\s+$/g, "");
        var currentRespondents = [];
        $questionFormEdit.find('#respondent input').each(function() {
            currentRespondents.push($(this).val().replace(/^\s+|\s+$/g, ""));
        });
        var isAnswerExist = currentRespondents.includes('');

        //input validation
        if (currentQuestion === '') {
            $questionFormEdit.find('#alert, #alertQuestion').show().delay(2000).fadeOut();
            if (isAnswerExist) {
                $questionFormEdit.find('#alertAnswer').show();
            }
        } else if (isAnswerExist) {
            $questionFormEdit.find('#alert, #alertAnswer').show().delay(2000).fadeOut();
        } else {
            questionModel.question = $questionFormEdit.find('#question').val();
            questionModel.allow = $questionFormEdit.find('#allow').prop('checked');
            questionModel.shuffle = $questionFormEdit.find('#shuffle').prop('checked');

            //saving the dropdown input
            var currentRespondents = []
            $questionFormEdit.find('#respondent select').each(function(i) {
              var respondent = {
                select: $(this).val()
              }
              currentRespondents.push(respondent)
            });

            //saving the text input
            $questionFormEdit.find('#respondent input').each(function(i) {
                currentRespondents[i].input = $(this).val();
            });
            questionModel.respondents = currentRespondents

            $questionFormEdit.find;
            $questionFormEdit.remove();
            $questionList.find('#save').hide();
            $questionList.find('#cancel').hide();
            $questionList.find('#edit').show();
            $questionList.find('#delete').show();

            //updating the question label on the list
            $questionList.find('#label').text(questionModel.question);
        }
    });
}

//attach event handler and return 'question list' DOM
function questionList(questionModel, questions) {
    var $questionList = questionListDOM();
    var $questionFormEdit = questionFormEdit(questionModel);

    attachEventHandler($questionList, $questionFormEdit, questionModel, questions);

    $questionList.append($questionFormEdit);
    $questionFormEdit.hide();
    $questionList.find('#cancel').hide();
    $questionList.find('#save').hide();
    $questionList.find('span').text('Question #' + (questions.length));
    $questionList.find('#label').text(questionModel.question);

    return $questionList;
}


//return 'question form' DOM
//taking questionModel as an argument and produce the DOM based on the questionModel
function questionFormEdit(questionModel) {
    var $form = form();
    var $question = question();
    var $firstRespondent = firstRespondent();
    var $allow = allow();
    var $shuffle = shuffle();

    //always exist for the first respondent
    $firstRespondent.find('select').val(questionModel.respondents[0].select);
    $firstRespondent.find('input').val(questionModel.respondents[0].input);

    //event handler for pressing enter on the respondent input
    $firstRespondent.on('keypress', 'input', function(e) {
        if (e.which === 13) {
            var $additionalRespondent = additionalRespondent();
            $firstRespondent.append($additionalRespondent);

            $additionalRespondent.find('#trashIcon').on('click', function() {
                $additionalRespondent.remove();
            });
            $additionalRespondent.find('input').focus();
        }
    });

    //creating the other respondents based on questionModel data
    for (var i = 1; i < questionModel.respondents.length; i++) {
        var $additionalRespondent = additionalRespondent();
        $additionalRespondent.find('select').val(questionModel.respondents[i].select);
        $additionalRespondent.find('input').val(questionModel.respondents[i].input);
        $additionalRespondent.find('#trashIcon').on('click', function() {
            $(this).parent().parent().remove();
        })
        $firstRespondent.append($additionalRespondent);
    }

    //getting the value on the form based on questionModel data
    $question.find('textarea').val(questionModel.question);
    $allow.find('input').prop('checked', questionModel.allow);
    $shuffle.find('input').prop('checked', questionModel.shuffle);
    $form.find('div#form').append($question, $firstRespondent, $allow, $shuffle);
    return $form;
}
