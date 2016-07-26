function hobbyOpen () {

    var elem = document.getElementById('hobbies');



    var hobbie = ['guitar playing', 'football', 'running', 'road cycling', 'gym', 'literature'];

    for (var i = 0; i < hobbie.length; i++) {
        var newLi = document.createElement('li');
        newLi.innerHTML = hobbie[i] + ';';
        elem.appendChild(newLi);
    }
    }
    hobbyOpen();
