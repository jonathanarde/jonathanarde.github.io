/*
this file contains all function declarations that return DOM element needed to
contruct the webpage
*/

//return 'allow checkbox' DOM
function allow() {
    return $('<div class="row">' +
        '<label class="control-label col-xs-3 col-xs-offset-3">Allow \"None of the above\": ' +
        '<input id="allow" type="checkbox"></input>' +
        '</label>' +
        '</div>');
}

//return 'shuffle checkbox' DOM
function shuffle() {
    return $('<div class="row">' +
        '<label class="control-label col-xs-3 col-xs-offset-3">Shuffle the order: ' +
        '<input id="shuffle" type="checkbox"></input>' +
        '</label>' +
        '</div>');
}

//return 'form' DOM
function form() {
    return $('<div class="panel">' +
        '<div class="panel panel-heading panel-default">' +
        '<div id="form" class="panel panel-body form-horizontal">' +
        '</div>' +
        '</div>' +
        '</div>');
}

//return 'question input' DOM
function question() {
    return $('<div class="form-group">' +
        '<div id="alert" class="alert alert-danger" style="display: none">' +
        '<p id="alertQuestion" style="display: none">Question cannot be empty</p>' +
        '<p id="alertAnswer" style="display: none">Answer option cannot be empty</p>' +
        '</div>' +
        '<label class="control-label col-xs-3">Question:</label>' +
        '<div class="col-xs-6">' +
        '<textarea id="question" class="form-control"></textarea>' +
        '</div>' +
        '</div>');
}

//return 'first respondent input' DOM
function firstRespondent() {
    var $firstRespondent = $('<div id="respondent">' +
        '<div class="row">' +
        '<label class="control-label col-xs-3">Respondent Options:</label>' +
        '<div class="col-xs-3">' +
        '<select class="form-control">' +
        '<option selected>May Select</option>' +
        '<option>Must Select</option>' +
        '<option>Terminate if Select</option>' +
        '</select>' +
        '</div>' +
        '<div class="col-xs-3">' +
        '<input class="form-control" placeholder="Enter answer option" title="press enter to add another option"></input>' +
        '</div>' +
        '<div class="col-xs-1">' +
        '<span class="glyphicon glyphicon-trash" style="cursor: pointer"></span>' +
        '</div>' +
        '</div>' +
        '</div>');

    $firstRespondent.find('input').tooltip({
        trigger: 'focus'
    });
    return $firstRespondent;
}

//return 'additional respondent input' DOM
function additionalRespondent() {
    var $additionalRespondent = $('<div class="row">' +
        '<div class="col-xs-3 col-xs-offset-3">' +
        '<select class="form-control">' +
        '<option selected>May Select</option>' +
        '<option>Must Select</option>' +
        '<option>Terminate if Select</option>' +
        '</select>' +
        '</div>' +
        '<div class="col-xs-3">' +
        '<input class="form-control" placeholder="Enter answer option" title="press enter to add another option"></input>' +
        '</div>' +
        '<div class="col-xs-1">' +
        '<span id="trashIcon" class="glyphicon glyphicon-trash" style="cursor: pointer"></span>' +
        '</div>' +
        '</div>')

    $additionalRespondent.find('input').tooltip({
        trigger: 'focus'
    });
    return $additionalRespondent;
}

//return 'question list' DOM
function questionListDOM() {
    return $('<div class="questionList">' +
        '<div class="list-group-item row">' +
        '<div class="col-xs-2">' +
        '<span id="questionNumber" class="badge"></span>' +
        '</div>' +
        '<div id="label" class="col-xs-6">' +
        '</div>' +
        '<div>' +
        '<div class="col-xs-4">' +
        '<button id="cancel" class="btn btn-default">Cancel</button>' +
        '<button id="save" class="btn btn-default">Save</button>' +
        '<button id="edit" class="btn btn-default">Edit</button>' +
        '<button id="delete" class="btn btn-default">Delete</button>' +
        '</div>' +
        '</div>' +
        '</div>');
}
