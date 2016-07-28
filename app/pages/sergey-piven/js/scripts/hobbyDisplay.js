/*;(function () {*/

var hobbiesInterests = document.getElementById('hobbiesInterests');
var hobbies = ["IT", "Medicine", "Video games", "DC Universe", "Marvel Universe", "Fantasy", "Science fiction", "Science", "Cars"];

function setHobbiesInterests() {
    return hobbies;
}

if (hobbiesInterests) {
    for (var i = 0; i < setHobbiesInterests().length; i++) {
        var li = document.createElement('li');
        li.innerHTML = hobbies[i];
        hobbiesInterests.appendChild(li);
    }
}

setHobbiesInterests();

/*})();*/