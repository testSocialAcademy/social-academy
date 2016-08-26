'use strict';
$(function(){

let urls = [
    "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500",
    "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500"
];
let homeUrl_mu = "index.html";
let arrImages;
let i = 0;
let sliderMarginLeft = 0;
let totalMargin = 0;
let play = false;
let slideInterval;
const ANIMATION_DURATION = 500;

//main body
Promise.all(urls.map(getImages))
    .then(results => {
        arrImages = JSON.parse(results[0]).hits;
        let arrImagesBuff = JSON.parse(results[1]).hits;
        arrImages.push(...arrImagesBuff);
        arrImages.splice(30,10);
        arrImages.splice(9,10);
        arrImages.push(arrImages[0]);
        for (let i = 0; i < arrImages.length-1; i++ ){
            totalMargin -= arrImages[i].webformatWidth;
        }
        let data = {arrImages};
        let actualSlide_mu = Handlebars.compile( $('#actualSlide_mu').html() );
        $('.arrImages_mu').append( actualSlide_mu(data));
    });
initButtons_mu();

//functions
function slideRight() {
    if (i!=20) {
        $(".arrImages_mu").animate({marginLeft: sliderMarginLeft -= arrImages[i].webformatWidth}, ANIMATION_DURATION);
        $(".slide_mu").animate({width: arrImages[i+1].webformatWidth + 20}, ANIMATION_DURATION);
    }else {
        i = 0;
        sliderMarginLeft = 0;
        $(".arrImages_mu").css("margin-left", 0 );
        $(".arrImages_mu").animate({marginLeft: sliderMarginLeft -= arrImages[i].webformatWidth}, ANIMATION_DURATION);
        $(".slide_mu").animate({width: arrImages[i+1].webformatWidth + 20}, ANIMATION_DURATION);
    }
    i++;
}

function getImages(url) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
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

function initButtons_mu() {
    $(".button-back_mu").bind("click", function () {
        document.location.href = homeUrl_mu;
    });
    $(".button-left_mu").bind("click", function () {
        if (i != 0) {
            $(".arrImages_mu").animate({marginLeft: sliderMarginLeft += arrImages[i - 1].webformatWidth}, ANIMATION_DURATION);
            $(".slide_mu").animate({width: arrImages[i - 1].webformatWidth + 20}, ANIMATION_DURATION);
            i--;
        } else {
            i = 19;
            sliderMarginLeft = totalMargin;
            $(".arrImages_mu").css("margin-left", totalMargin);
            $(".arrImages_mu").animate({marginLeft: sliderMarginLeft += arrImages[19].webformatWidth}, ANIMATION_DURATION);
            $(".slide_mu").animate({width: arrImages[i].webformatWidth + 20}, ANIMATION_DURATION);
        }
    });
    $(".button-right_mu").bind("click", function () {
        slideRight();
    });
    $(".button-play_mu").bind("click", function () {
        if (!play) {
            $(".button-play_mu img").attr("src", "../../img/michail_suprunov/pause.png");
            play = true;
            $(".button-right_mu").hide();
            $(".button-left_mu").hide();
            slideInterval = setInterval(function () {
                slideRight();
            }, 1000);
        } else {
            clearInterval(slideInterval);
            $(".button-right_mu").show();
            $(".button-left_mu").show();
            $(".button-play_mu img").attr("src", "../../img/michail_suprunov/play.png");
            play = false;
        }
    });
}
});