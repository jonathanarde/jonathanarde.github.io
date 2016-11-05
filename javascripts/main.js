$(document).ready(function() {
    //JS Object for storing all the forms data
    var questions = [];

    //showing add new question for the initial state of the webpage
    $('#topRightButton').append(addButton(questions));

    //apply sortable feature on the lists
    Sortable.create(questionLists, {
        onEnd: function(evt) {
            //evt.oldIndex is the old index of element
            //evt.newIndex is the new index of element

            //logic for reordering the data in questions object
            if (evt.oldIndex > evt.newIndex) {
                evt.oldIndex++;
            } else {
                evt.newIndex++;
            }
            questions.splice(evt.newIndex, 0, questions[evt.oldIndex]);
            questions.splice(evt.oldIndex, 1);

            //updating the question nummber on the list
            $('.questionList').each(function(index) {
                $(this).find('span#questionNumber').text('Question #' + (index + 1));
            });
        }
    });
});
