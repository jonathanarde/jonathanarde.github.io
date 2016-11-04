/*
this file contains all the function declarations needed for creating new question
*/


//return 'question form' DOM
//taking questionModel as an argument and produce the DOM based on the questionModel
function questionForm(questionModel) {
    var $form = form();
    var $question = question();
    var $firstRespondent = firstRespondent();
    var $allow = allow();
    var $shuffle = shuffle();

    //attaching event handlers for all the components
    $question.find('textarea').on('change', function() {
        questionModel.question = $(this).val();
    });
    $allow.find('input').on('click', function() {
        questionModel.allow = $(this).prop('checked');
    });
    $shuffle.find('input').on('click', function() {
        questionModel.shuffle = $(this).prop('checked');
    });
    $firstRespondent.find('select').on('change', function() {
        questionModel.respondents[0].select = $(this).val();
    });
    $firstRespondent.find('input').on('change', function() {
        questionModel.respondents[0].input = $(this).val();
    });

    //event handler for pressing enter on the respondent input
    $firstRespondent.on('keypress', 'input', function(e) {
        if (e.which === 13) {
            var $additionalRespondent = additionalRespondent();

            //event handler for deleting a respondent
            $additionalRespondent.find('#trashIcon').on('click', function() {
                var index = $firstRespondent.find('.row').index($additionalRespondent);
                    //deleting the dom
                $additionalRespondent.remove();
                    //deleting the respondent data from questionModel
                questionModel.respondents.splice(index, 1);
            });
            $additionalRespondent.find('select').on('change', function() {
                respondent.select = $(this).val();
            });
            $additionalRespondent.find('input').on('change', function() {
                respondent.input = $(this).val();
            });

            //adding the respondent data to questionModel
            var respondent = {
                select: 'May Select',
                input: ''
            };
            questionModel.respondents.push(respondent);

            //append the additionalRespondent
            $firstRespondent.append($additionalRespondent);
        }
    });

    //combine all the components
    $form.find('div#form').append($question, $firstRespondent, $allow, $shuffle);
    return $form;
}

//return 'add new question' DOM
function addButton(questions) {
    var $add = $('<button id="add" class="btn btn-default">Add Question</button>');

    //event handler
    $add.on('click', function() {
        var questionModel = {
            question: '',
            respondents: [{
                select: 'May Select',
                input: ''
            }],
            allow: false,
            shuffle: false
        };

        //show the question form
        $('#newQuestion').append(questionForm(questionModel));

        //changing 'add new question' button with 'cancel' and 'save' button
        $('#topRightButton').empty().append(addButton(questions));
        $('#topRightButton').empty().append(cancelButton(questions), saveButton(questionModel, questions));
    });
    return $add;
}


//return 'cancel button' DOM for new question
function cancelButton(questions) {
    var $cancel = $('<button id="cancel" class="btn btn-default">Cancel</button>');

    //close the form DOM and show the 'add new question' button
    $cancel.on('click', function() {
        $('#newQuestion').empty();
        $('#topRightButton').empty().append(addButton(questions));
    });
    return $cancel;
}

//return 'save button' DOM for new question
//take questionModel as the argument
function saveButton(questionModel, questions) {
    var $saveBtn = $('<button id="save" class="btn btn-default">Save</button>');

    //push the questionModel to question Object
    //create the question list based on the data in questionModel
    //close the form DOM, show the 'add new question' button
    $saveBtn.on('click', function() {
        //check whether the asnwer option is empty or not
        //replace is for intepreting 'enter' and 'space' as just ''
        var isAnswerExist = questionModel.respondents.map(function(qModel) {
            return qModel.input.replace(/^\s+|\s+$/g, "");
        }).includes('');
        var currentQuestion = questionModel.question.replace(/^\s+|\s+$/g, "");

        //input validation
        if (currentQuestion === '') {
            $('#newQuestion').find('#alert, #alertQuestion').show().delay(2000).fadeOut();
            if (isAnswerExist) {
                $('#newQuestion').find('#alertAnswer').show();
            }
        } else if (isAnswerExist) {
            $('#newQuestion').find('#alert, #alertAnswer').show().delay(2000).fadeOut();
        } else {
            $('#topRightButton').empty().append(addButton(questions));
            $('#newQuestion').empty();
            questions.push(questionModel);
            $('#questionLists').append(questionList(questionModel, questions));
        }
    })
    return $saveBtn;
}
