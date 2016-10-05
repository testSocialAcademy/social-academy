let picDiv = $("#pictures_ks");
let picUl = $(".slides_ks");
let counter = 0;
let firstRes;
let secondRes;
let picUlLi;
let picToLi;
let height = [];
let heightSum = 0;
let interval;
let autoPlay = false;

function getImgFirstLink(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function() {
            reject(new Error("Error"));
        };
        xhr.send();
    });
}

function getImgSecondLink(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function() {
            reject(new Error("Error"));
        };
        xhr.send();
    });
}

function callbackFirst_ks() {
    for (let i = 0; i < 10; i++) {
        height.push(firstRes.hits[i].webformatHeight);

        picUlLi = document.createElement("li");
        picToLi = document.createElement("img");
        picToLi.src = firstRes.hits[i].webformatURL;
        picUlLi.appendChild(picToLi);
        picUl.append(picUlLi);
    }
}

function callbackSecond_ks() {
    for (let i = 0; i < 10; i++) {
        height.push(secondRes.hits[i].webformatHeight);

        picUlLi = document.createElement("li");
        picToLi = document.createElement("img");
        picToLi.src = secondRes.hits[i].webformatURL;
        picUlLi.appendChild(picToLi);
        picUl.append(picUlLi);
    }
    for (let i = 10; i < secondRes.hits.length; i++) {
        if (secondRes.hits[i].webformatHeight == height[0]) {
            height.push(secondRes.hits[i].webformatHeight);
            picUlLi = document.createElement("li");
            picToLi = document.createElement("img");
            picToLi.src = secondRes.hits[i].webformatURL;
            picUlLi.appendChild(picToLi);
            picUl.append(picUlLi);
            break;
        }
    }
    picUlLi = document.createElement("li");
    picToLi = document.createElement("img");
    picToLi.src = firstRes.hits[0].webformatURL;
    picUlLi.appendChild(picToLi);
    picUl.append(picUlLi);

    for (let i = 0; i < height.length; i++) {
        heightSum += height[i];
    }
}

getImgFirstLink("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500")
    .then(
        response => {
            firstRes = JSON.parse(response);
            callbackFirst_ks();
        },
        error => alert(`Rejected: ${error}`)
    );

getImgSecondLink("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500")
    .then(
        response => {
            secondRes = JSON.parse(response);
            callbackSecond_ks();
        },
        error => alert(`Rejected: ${error}`)
    );

$("#downButton_ks").on('click', function () {
    if (autoPlay == true) {
        autoPlay = false;
        clearInterval(interval);
    }
    picDiv.animate({'height': height[counter + 1]}, 500);
    picUl.animate({'margin-top': '-=' + height[counter]}, 500, ()=> {
        if (++counter == height.length) {
            counter = 0;
            picUl.css('margin-top', 0);
        }
    });
});

$("#upButton_ks").on('click', ()=> {
    if (autoPlay == true) {
        autoPlay = false;
        clearInterval(interval);
    }
    counter--;
    if (counter == -1) {
        counter = 21;
        picUl.css('margin-top', -heightSum);
        counter--;
    }
    picDiv.animate({'height': height[counter]}, 500);
    picUl.animate({'margin-top': '+=' + height[counter]}, 500);
});

$("#playButton_ks").on('click', ()=> {
    if (autoPlay == false) {
        autoPlay = true;
        interval = setInterval(()=> {
            picDiv.animate({'height': height[counter + 1]}, 1000);
            picUl.animate({'margin-top': '-=' + height[counter]}, 1000, ()=> {
                if (++counter == height.length) {
                    counter = 0;
                    picUl.css('margin-top', 0);
                }
            });
        }, 3000);
    } else {
        autoPlay = false;
        clearInterval(interval);
    }
});
