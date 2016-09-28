'use strict';

let picturesWidth_nv = [];
let liInSlider_nv;
let imgInSlider_nv;
let picturesSlides_nv = $("#slider_nv");
let pictureBlock_nv = $("#pictureBlock_nv");
let result1;
let result2;
let autoPlay_nv = false;
let timeForSlider;
let number_nv = 0;
let allPicturesWidth_nv = 0;



function firstGetPictures_nv(link) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);

        xhr.onload = function () {

            if (this.status == 200) {
                resolve (this.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}

function secondGetPictures_nv(link) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);

        xhr.onload = function () {

            if (this.status == 200) {
                resolve (this.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}

function firstStart_nv() {

    for (let i = 0; i < 10; i++) {

        picturesWidth_nv.push(result1.hits[i].webformatWidth);

        liInSlider_nv = document.createElement("li");
        imgInSlider_nv = document.createElement("img");
        imgInSlider_nv.src = result1.hits[i].webformatURL;
        liInSlider_nv.appendChild(imgInSlider_nv);
        picturesSlides_nv.append(liInSlider_nv);
    }
}

function secondStart_nv() {

    for (let i = 0; i < 10; i++) {

        picturesWidth_nv.push(result2.hits[i].webformatWidth);
        liInSlider_nv = document.createElement("li");
        imgInSlider_nv = document.createElement("img");
        imgInSlider_nv.src = result2.hits[i].webformatURL;
        liInSlider_nv.appendChild(imgInSlider_nv);
        picturesSlides_nv.append(liInSlider_nv);
    }

     for (let i = 10; i < result2.hits.length; i++) {
         if (result2.hits[i].webformatWidth == picturesWidth_nv[0]) {
             picturesWidth_nv.push(result2.hits[i].webformatWidth);
             liInSlider_nv = document.createElement("li");
             imgInSlider_nv = document.createElement("img");
             imgInSlider_nv.src = result2.hits[i].webformatURL;
             liInSlider_nv.appendChild(imgInSlider_nv);
             picturesSlides_nv.append(liInSlider_nv);
             break;
         }
     }
    liInSlider_nv = document.createElement("li");
    imgInSlider_nv = document.createElement("img");
    imgInSlider_nv.src = result1.hits[0].webformatURL;
    liInSlider_nv.appendChild(imgInSlider_nv);
    picturesSlides_nv.append(liInSlider_nv);

    for (let i = 0; i < picturesWidth_nv.length; i++) {
        allPicturesWidth_nv += picturesWidth_nv[i];
    }
}

firstGetPictures_nv("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500").then(
    response => {
        result1 = JSON.parse(response);
        firstStart_nv();
    },
    error => {
        alert("${error}");
    }
);

secondGetPictures_nv("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500").then(
    response => {
        result2 = JSON.parse(response);
        secondStart_nv();
    },
    error => {
        alert("${error}");
    }
);

$("#rightButton_nv").on("click", function () {

    if (autoPlay_nv == true) {
        autoPlay_nv = false;
        clearInterval(timeForSlider);
    }

    pictureBlock_nv.animate({'width': picturesWidth_nv[number_nv + 1]}, 1500);
    picturesSlides_nv.animate({'margin-left': '-=' + picturesWidth_nv[number_nv]}, 1500, () => {

        if (++number_nv == picturesWidth_nv.length) {
            number_nv = 0;
            picturesSlides_nv.css('margin-left', 0);
        }
    });
});

$("#leftButton_nv").on("click", () => {

    if (autoPlay_nv == true) {
        autoPlay_nv = false;
        clearInterval(timeForSlider);
    }

    number_nv--;
    //console.log(number_nv);

    if (number_nv < 0) {
        number_nv = 21;
        picturesSlides_nv.css("margin-left", -allPicturesWidth_nv);
        number_nv--;
    }
    //console.log(number_nv);
    pictureBlock_nv.animate({"width": picturesWidth_nv[number_nv]}, 1500);
    picturesSlides_nv.animate({"margin-left": '+=' + picturesWidth_nv[number_nv]}, 1500);
});



$("#autoPlay_nv").on('click', ()=> {
    if (autoPlay_nv == false) {
        autoPlay_nv = true;
        timeForSlider = setInterval(()=> {
            pictureBlock_nv.animate({'width': picturesWidth_nv[number_nv + 1]}, 2000);
            picturesSlides_nv.animate({'margin-left': '-=' + picturesWidth_nv[number_nv]}, 2000, ()=> {
                if (++number_nv == picturesWidth_nv.length) {
                    number_nv = 0;
                    picturesSlides_nv.css('margin-left', 0);
                }
            });
        }, 2500);
    } else {
        autoPlay_nv = false;
        clearInterval(timeForSlider);
    }
});