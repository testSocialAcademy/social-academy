'use strict';

    var hobbies = document.getElementById('hobbies');

    var hobbie = ['guitar playing', 'football', 'running', 'road cycling', 'gym', 'literature'];

    function hobbyOpen () {
        return hobbie;
    }
        
if (hobbies) {
    for (var i = 0; i < hobbyOpen().length; i++) {
        var newLi = document.createElement('li');
        newLi.innerHTML = hobbie[i] + ';';
        hobbies.appendChild(newLi);
    }
    }
    hobbyOpen();