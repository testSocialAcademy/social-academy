;(function () {

var hobbies = ["IT", "Medicine", "Video games", "DC Universe", "Marvel Universe", "Fantasy", "Science fiction", "Science", "Cars"];

for (var i = 0; i <hobbies.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = hobbies[i];
    hobbiesInterests.appendChild(li);
}
})();