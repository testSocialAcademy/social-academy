;'use strict';
function createListToDo_skr() {
    if (localStorage.length !== 0) {
        for (var key in localStorage) {
            var dataStorage = localStorage.getItem(key);
            var ulToDo = document.getElementById('toDoItem_skr');
            var newLi = document.createElement('li');
            newLi.className = "list-group-item";
            newLi.setAttribute("onclick", "delLi_skr(this);");
            newLi.innerHTML = dataStorage;
            ulToDo.appendChild(newLi);
        }
    }
}
$(document).ready(function () {
    $('#toDoItem_skr').sortable();
    $('#toDoButton').on('click', function () {
        var enteredText = $('#enteredText_skr');
        if (enteredText) {
            var result = localStorage.getItem(enteredText);
            if (localStorage.length === 0 || result === null) {
                localStorage.setItem(enteredText.val(), enteredText.val());
                createList_skr();
                enteredText.val("");
            }
        } else alert("Enter text please");

    });

    function createList_skr() {
        if ($('#enteredText_skr').val().length === 0) {
            $('#toDoItem_skr').append("<li></li>");
            $('#toDoItem_skr > li:last-child').addClass('list-group-item');
        }
    }

    function addText_skr(element, event) {
        var text = element.value;
        if (text.length > 0) {
            $('#toDoItem_skr > li:last-child').text(text);
        }
        if (event.which === 13) {
            $(element).val('');
        }
    }

    $('#enteredText_skr').on('keyup', function (e) {
        addText_skr(this, e);
    });

    $('#enteredText_skr').on('keypress', function () {
        createList_skr();
    });
});


function delLi_skr(text) {
    localStorage.removeItem(text.innerHTML);
    var ulToDo = document.getElementById('toDoItem_skr');
    ulToDo.removeChild(text);
}

// function addLi_skr() {
//     var enteredText = document.getElementById('enteredText_skr').value;
//     if (enteredText) {
//         var ulToDo = document.getElementById('toDoItem_skr');
//         var newLi = document.createElement('li');
//         newLi.className = "list-group-item";
//         newLi.setAttribute("onclick", "delLi_skr(this);");
//         newLi.innerHTML = enteredText;
//         var result = localStorage.getItem(enteredText);
//         if (localStorage.length === 0 || result === null) {
//             localStorage.setItem(enteredText, enteredText);
//             ulToDo.appendChild(newLi);
//             document.getElementById('enteredText_skr').value = "";
//         }
//     }else alert("Enter text please")
//
// }

createListToDo_skr();


