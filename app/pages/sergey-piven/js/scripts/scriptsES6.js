////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////(\/)(>,..,<)(\/)//////////////////SERGEY PIVEN ES6 START///////////////(\/)(>,..,<)(\/)//////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
/////////////////////////////////////////HOMEWORK 10,11/////////////////////////////////////////////////////////////////

let picturesDivUl_sp = $("#slides_sp");
let picturesDiv_sp = $("#pictures_sp");
let resultFromFirstLink_sp;
let resultFromSecondLink_sp;
let resultFromLinksWidth_sp = [];
let resultFromLinksWidthSum_sp = 0;
let counter_sp = 0;
let liToSliderUl_sp;
let imgToSliderLi_sp;
let intervalForSliderAutoPlay_sp;
let sliderAutoPlayOn_sp = false;

function getPicturesFromFirstLinkAjax_sp(url) {
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
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}

function getPicturesFromSecondLinkAjax_sp(url) {
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
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}

function callbackFirst_sp() {
    for (let i = 0; i < 10; i++) {
        resultFromLinksWidth_sp.push(resultFromFirstLink_sp.hits[i].webformatWidth);

        liToSliderUl_sp = document.createElement("li");
        imgToSliderLi_sp = document.createElement("img");
        imgToSliderLi_sp.src = resultFromFirstLink_sp.hits[i].webformatURL;
        liToSliderUl_sp.appendChild(imgToSliderLi_sp);
        picturesDivUl_sp.append(liToSliderUl_sp);
    }
}

function callbackSecond_sp() {
    for (let i = 0; i < 10; i++) {
        resultFromLinksWidth_sp.push(resultFromSecondLink_sp.hits[i].webformatWidth);

        liToSliderUl_sp = document.createElement("li");
        imgToSliderLi_sp = document.createElement("img");
        imgToSliderLi_sp.src = resultFromSecondLink_sp.hits[i].webformatURL;
        liToSliderUl_sp.appendChild(imgToSliderLi_sp);
        picturesDivUl_sp.append(liToSliderUl_sp);
    }
    for (let i = 10; i < resultFromSecondLink_sp.hits.length; i++) {
        if (resultFromSecondLink_sp.hits[i].webformatWidth == resultFromLinksWidth_sp[0]) {
            resultFromLinksWidth_sp.push(resultFromSecondLink_sp.hits[i].webformatWidth);
            liToSliderUl_sp = document.createElement("li");
            imgToSliderLi_sp = document.createElement("img");
            imgToSliderLi_sp.src = resultFromSecondLink_sp.hits[i].webformatURL;
            liToSliderUl_sp.appendChild(imgToSliderLi_sp);
            picturesDivUl_sp.append(liToSliderUl_sp);
            break;
        }
    }
    liToSliderUl_sp = document.createElement("li");
    imgToSliderLi_sp = document.createElement("img");
    imgToSliderLi_sp.src = resultFromFirstLink_sp.hits[0].webformatURL;
    liToSliderUl_sp.appendChild(imgToSliderLi_sp);
    picturesDivUl_sp.append(liToSliderUl_sp);

    for (let i = 0; i < resultFromLinksWidth_sp.length; i++) {
        resultFromLinksWidthSum_sp += resultFromLinksWidth_sp[i];
    }
}

getPicturesFromFirstLinkAjax_sp("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500")
    .then(
        response => {
            resultFromFirstLink_sp = JSON.parse(response);
            callbackFirst_sp();
        },
        error => alert(`Rejected: ${error}`)
    );

getPicturesFromSecondLinkAjax_sp("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500")
    .then(
        response => {
            resultFromSecondLink_sp = JSON.parse(response);
            callbackSecond_sp();
        },
        error => alert(`Rejected: ${error}`)
    );

$("#sliderRightButton_sp").on('click', function () {
    if (sliderAutoPlayOn_sp == true) {
        sliderAutoPlayOn_sp = false;
        $(".playAndStopButton_sp").css('background-color', '#cc0000');
        clearInterval(intervalForSliderAutoPlay_sp);
    }
    picturesDiv_sp.animate({'width': resultFromLinksWidth_sp[counter_sp + 1]}, 1000);
    picturesDivUl_sp.animate({'margin-left': '-=' + resultFromLinksWidth_sp[counter_sp]}, 1000, ()=> {
        if (++counter_sp == resultFromLinksWidth_sp.length) {
            counter_sp = 0;
            picturesDivUl_sp.css('margin-left', 0);
        }
    });
});

$("#sliderLeftButton_sp").on('click', ()=> {
    if (sliderAutoPlayOn_sp == true) {
        sliderAutoPlayOn_sp = false;
        $(".playAndStopButton_sp").css('background-color', '#cc0000');
        clearInterval(intervalForSliderAutoPlay_sp);
    }
    counter_sp--;
    if (counter_sp == -1) {
        counter_sp = 21;
        picturesDivUl_sp.css('margin-left', -resultFromLinksWidthSum_sp);
        counter_sp--;
    }
    picturesDiv_sp.animate({'width': resultFromLinksWidth_sp[counter_sp]}, 1000);
    picturesDivUl_sp.animate({'margin-left': '+=' + resultFromLinksWidth_sp[counter_sp]}, 1000);
});

$("#playAndStopButton_sp").on('click', ()=> {
    if (sliderAutoPlayOn_sp == false) {
        sliderAutoPlayOn_sp = true;
        $(".playAndStopButton_sp").css('background-color', '#00CC66');
        intervalForSliderAutoPlay_sp = setInterval(()=> {
            picturesDiv_sp.animate({'width': resultFromLinksWidth_sp[counter_sp + 1]}, 1000);
            picturesDivUl_sp.animate({'margin-left': '-=' + resultFromLinksWidth_sp[counter_sp]}, 1000, ()=> {
                if (++counter_sp == resultFromLinksWidth_sp.length) {
                    counter_sp = 0;
                    picturesDivUl_sp.css('margin-left', 0);
                }
            });
        }, 1500);
    } else {
        sliderAutoPlayOn_sp = false;
        $(".playAndStopButton_sp").css('background-color', '#cc0000');
        clearInterval(intervalForSliderAutoPlay_sp);
    }
});

////////////////////////////////////////END OF HOMEWORK 10,11///////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////(\/)(>,..,<)(\/)//////////////////SERGEY PIVEN ES6 END///////////////(\/)(>,..,<)(\/)////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////