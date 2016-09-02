//--------------  10


function  promiseAjax_IN (url) {
    var images;
    return new Promise (function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                images = JSON.parse(xhr.responseText);
                console.log(images);

                resolve(images);
            }
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror - function () {
            reject(new error("Net Error, first Ajax"));
        };
        xhr.send();
    });
}


promiseAjax_IN("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500")
    .then(
        images => {
            console.log(`----  USER ------: ${images}`);
            var images1 = images.hits;
            console.log(`----  USER ------: ${images1}`);
            for (let i=0; i < 10; i++) {
                if (images1[i].webformatURL) {
                    console.log(images1[4].webformatURL);
                }
            }
            return images1;
        })
    .then(images1 => {
        addPictures_IN(images1);

    })
    .catch(error => {
        alert(error); // Error: Not Found
    });
//=== second ajax

function promiseAjax_1_IN(url) {
    var images;
    return new Promise (function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                images = JSON.parse(xhr.responseText);
                console.log(images);

                resolve(images);
            }
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror - function () {
            reject(new error("Net Error, first Ajax"));
        };
        xhr.send();
    });
}

promiseAjax_1_IN("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500")
    .then(
        images => {
            console.log(`----  USER ------: ${images}`);
            var images2 = images.hits;
            console.log(`----  USER ------: ${images2}`);
            for (let i=0; i < 10; i++) {
                if (images2[i].webformatURL) {
                    console.log(images2[1].webformatURL);
                }
            }
            return images2;
        })
    .then(images2 => {
        addPictures_IN(images2);

    })
    .catch(error => {
        alert(error); // Error: Not Found
    });

//========


function addPictures_IN (img) {

    let slidesWrapper = document.getElementById("slidesWrapper_IN");
    console.log(slidesWrapper);
    var images = img;
    /* var div = document.createElement('div');
     slidesWrapper.appendChild(div);*/
    for (let i = 0; i < 10; i++) {
        if (images[i].webformatURL) {
            img = document.createElement("img");
            img.src = images[i].webformatURL;
            slidesWrapper.appendChild(img);

        }

        if (document.querySelectorAll('img').length == 20) {
            img.onload = function () {
                main_IN();
            };
            img.onerror = function () {
                alert("Ошибка " + this.src)
            };
        }
        console.log("Картинки загружены   " + new Date());

    }
}


//-----------------


function main_IN() {

console.log("main Загружен   " + new Date());



    var globals_in = {

        slideDelay: 4000,
        fadeDelay: 35,
        wrapperID: "slidesWrapper_IN",
        buttonID: "slideShowButton_IN",
        buttonStartText: "Start Slides",
        buttonStopText: "Stop Slides",
        wrapperObject:  document.getElementById("slidesWrapper_IN"),
        buttonObject: document.getElementById("slideShowButton_IN"),
        slideImages: document.querySelectorAll('img'),
        slideShowID: null,
        slideShowRunning: true,
        slideIndex: 0,
    };
    console.log(globals_in.slideImages + "  slideImages");



    /*initializeGlobals_IN();*/
    if (insufficientSlideShowMarkup_IN()) {
        return alert("error");
    } //проверка разметки


    if (globals_in.slideImages.length == 1) {
        return;
    }


    initializeSlideShowMarkup_IN(); //подготовка разметки

    globals_in.wrapperObject.addEventListener('click', toggleSlideShow_IN, false); //Отключение слайдшоу

    if (globals_in.buttonObject) {
        globals_in.buttonObject.addEventListener('click', toggleSlideShow_IN, false);
    }

    startSlideShow_IN();


//проверка разметки
function insufficientSlideShowMarkup_IN() {
    if (!globals_in.wrapperObject) {
        if (globals_in.buttonObject) {
            globals_in.buttonObject.style.display = "none";
        }
        return true;
    }

    if (!globals_in.slideImages.length) {
        if (globals_in.wrapperObject) {
            globals_in.wrapperObject.style.display = "none";
        }

        if (globals_in.buttonObject) {
            globals_in.buttonObject.style.display = "none";
        }

        return true;
    }

    return false;
}


//подготовка разметки
function initializeSlideShowMarkup_IN() {
    var slideWidthMax = maxSlideWidth_IN();
    var slideHeightMax = maxSlideHeight_IN();

    globals_in.wrapperObject.style.position = "relative";
    globals_in.wrapperObject.style.overflow = "hidden";
    globals_in.wrapperObject.style.width = slideWidthMax + "px";
    globals_in.wrapperObject.style.height = slideHeightMax + "px";

    var slideCount = globals_in.slideImages.length;
    console.log(slideCount);
    for (var i = 0; i < slideCount; i++) {
        globals_in.slideImages[i].style.opacity = 0;
        globals_in.slideImages[i].style.position = "absolute";
        globals_in.slideImages[i].style.top = (slideHeightMax - globals_in.slideImages[i].getBoundingClientRect().height) / 2 + "px";
        globals_in.slideImages[i].style.left = (slideWidthMax - globals_in.slideImages[i].getBoundingClientRect().width) / 2 + "px";
        //выталкивание меньших изображений из угла
    }

    globals_in.slideImages[0].style.opacity = 1;

    if (globals_in.buttonObject) {
        globals_in.buttonObject.textContent = globals_in.buttonStopText;
    }
}


// вычисление наибольших размеров слайдов

function maxSlideWidth_IN() {
    var maxWidth = 0;
    let maxSlideIndex = 0;
    let slideCount = globals_in.slideImages.length;

    for (var i = 0; i < slideCount; i++) {
        if (globals_in.slideImages[i].width > maxWidth) {
            maxWidth = globals_in.slideImages[i].width;
            maxSlideIndex = i;
        }
    }

    return globals_in.slideImages[maxSlideIndex].getBoundingClientRect().width;
}

function maxSlideHeight_IN() {
    var maxHeight = 0;
    let maxSlideIndex = 0;
    let slideCount = globals_in.slideImages.length;

    for (var i = 0; i < slideCount; i++) {
        if (globals_in.slideImages[i].width > maxHeight) {
            maxHeight = globals_in.slideImages[i].height;
            maxSlideIndex = i;
        }
    }

    return globals_in.slideImages[maxSlideIndex].getBoundingClientRect().height;
}


function startSlideShow_IN() {
    globals_in.slideShowID = setInterval(transitionSlides_IN, globals_in.slideDelay);
}

function haltSlideShow_IN() {
    clearInterval(globals_in.slideShowID);
}

function toggleSlideShow_IN() {
    if (globals_in.slideShowRunning) {
        haltSlideShow_IN();
        if (globals_in.buttonObject) {
            globals_in.buttonObject.textContent = globals_in.buttonStartText;
        }
    }
    else {
        startSlideShow_IN();
        if (globals_in.buttonObject) {
            globals_in.buttonObject.textContent = globals_in.buttonStopText;
        }
    }
    globals_in.slideShowRunning = !(globals_in.slideShowRunning);
}


globals_in.wrapperObject.addEventListener('click', toggleSlideShow_IN, false);

if (globals_in.buttonObject) {
    globals_in.buttonObject.addEventListener('click', toggleSlideShow_IN, false);
}

function transitionSlides_IN() {
    var currentSlide = globals_in.slideImages[globals_in.slideIndex];

    ++(globals_in.slideIndex);
    if (globals_in.slideIndex >= globals_in.slideImages.length) {
        globals_in.slideIndex = 0;
    }

    var nextSlide = globals_in.slideImages[globals_in.slideIndex];

    var currentSlideOpacity = 1;
    var nextSlideOpacity = 0;
    var opacityLevelIncrement = 1 / globals_in.fadeDelay;
    var fadeActiveSlidesID = setInterval(fadeActiveSlides, globals_in.fadeDelay);

    function fadeActiveSlides() {
        currentSlideOpacity -= opacityLevelIncrement;
        nextSlideOpacity += opacityLevelIncrement;

        console.log(currentSlideOpacity + nextSlideOpacity);

        if (currentSlideOpacity >= 0 && nextSlideOpacity <= 1) {
            currentSlide.style.opacity = currentSlideOpacity;
            nextSlide.style.opacity = nextSlideOpacity;
        }
        else {
            currentSlide.style.opacity = 0;
            nextSlide.style.opacity = 1;
            clearInterval(fadeActiveSlidesID);
        }
    }
}

}


