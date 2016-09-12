'use strict';

    var elem = document.getElementById('hobbies');

    var hobbie = ['guitar playing', 'football', 'running', 'road cycling', 'gym', 'literature'];

    function hobbyOpen () {
    for (var i = 0; i < hobbie.length; i++) {
        var newLi = document.createElement('li');
        newLi.innerHTML = hobbie[i] + ';';
        elem.appendChild(newLi);
    }
    }
    hobbyOpen();