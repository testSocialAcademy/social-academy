/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES6 Script /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getJSONFromUrl_af(sourceUrl) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: sourceUrl,
            dataType: "text",
            success: function(data){
                resolve(data);
            },
            error: function (errorObj,status) {
                if(errorObj.status < 100) {
                    reject("No response from the server");
                }
                reject(status);
            }
        });
    });
}

function getFromUrl_af(srcArr) {
    let chain = Promise.resolve();
    let resultJSON = [];

    srcArr.forEach(function(url) {
        chain = chain
            .then(() => getJSONFromUrl_af(url))                                 //return promise
            .then((resultOfXhr) => {                                            //nothing return
                resultJSON.push(JSON.parse(resultOfXhr));
            });
    });

    chain
        .then(() => setDataToTemplate_af (resultJSON))                           //return data
        .then((cuttedJSON) => displayPreviewImages_af (cuttedJSON))                 //nothing return
        .catch((error) => {
            alert(error);
        });
}

function setDataToTemplate_af (JSON) {
    let imagesList = $('.slide_show-center-list_af');
    let template = Handlebars.compile( $('#template_af').html() );
    for (let i = 0; i < JSON.length; i++) {
        JSON[i].hits.length = MAX_COUNT_IMG_ON_PAGE_af / JSON.length;            //Cut images count according to the statement
        imagesList.append( template(JSON[i]) );
    }

    $(".slide_af").eq(0).clone().appendTo(".slide_show-center-list_af");        //to create the illusion of an endless canvas

    return JSON;
}

function displayPreviewImages_af (JSON) {
    for (let i = 0; i < JSON.length; i++) {
        let previewBlock = $(`#images${i}_af`);
        let template = Handlebars.compile( $(`#template_preview_${i}_af`).html() );
        previewBlock.append( template(JSON[i]) );
    }

    highlightingPreviewImg(0);
}

function getImageIndex_af () {
    let currentIndex = 0;
    function current (direction) {
        if (direction === "next") {
            return ++currentIndex;
        }
        else if (direction === "prev") {
            return --currentIndex;
        } else {
            throw new Error("Wrong Direction!");
        }
    }
    current.set = function (num) {
        currentIndex = num;
    };
    return current;
}

$('.slide_show-left_button_af').on('click', function() {
    setAnotherPicture_af("prev");
});

$('.slide_show-right_button_af').on('click', function() {
    setAnotherPicture_af("next");
});

$('.slide_show-play_button_af').on('click', function() {
    playSlideShow_af();
});

$('.slide_show-pause_button_af').on('click', function() {
    pauseSlideShow_af();
});

function setAnotherPicture_af(direction) {
    let imagesList = $('.slide_show-center-list_af');
    let imagesCollection = $('.slide_af');
    let slideWindow = $('.slide_show-center_af');
    let newImgIndex = imageIndex_af(direction);
    let frameWidth = imagesCollection.eq(newImgIndex).width();
    let maxOffset = 0;

    imagesList.stop(true, true);
    slideWindow.stop(true,true);

    if(direction === "next") {
        let offset = imagesCollection.eq(newImgIndex-1).width();
        slideWindow.animate({'width': frameWidth },ANIMATION_DELAY_af);
        imagesList.animate({'margin-left': '-=' + offset},ANIMATION_DELAY_af, function() {
            if(newImgIndex >= MAX_COUNT_IMG_ON_PAGE_af) {
                newImgIndex = 0;
                imageIndex_af.set(0);
                imagesList.css('margin-left', 0);
            }
        });
    }

    else if(direction === "prev") {
        if (newImgIndex < 0) {
            newImgIndex = MAX_COUNT_IMG_ON_PAGE_af-1;
            imageIndex_af.set(MAX_COUNT_IMG_ON_PAGE_af-1);
            maxOffset = function () {
                let result = 0;
                for(let i=1; i < imagesCollection.length; i++) {
                    result += imagesCollection.eq(i).width();
                }
                return -result;
            }();
            imagesList.css('margin-left', maxOffset);
        }
        let offset = imagesCollection.eq(newImgIndex).width();
        slideWindow.animate({'width': frameWidth },ANIMATION_DELAY_af);
        imagesList.animate({'margin-left': '+=' + offset},ANIMATION_DELAY_af);
    }
    console.log(newImgIndex);

    highlightingPreviewImg (newImgIndex);
}

function highlightingPreviewImg (imgIndex) {
    let previewImagesCollection = $('.preview_images-element_af');
    previewImagesCollection.css('border-color','transparent');
    if (imgIndex === MAX_COUNT_IMG_ON_PAGE_af) {
        imgIndex = 0;
    }
    previewImagesCollection.eq(imgIndex).css('border-color','green');
}

function playSlideShow_af() {
    slideShowIntervalId_af = setInterval(() => setAnotherPicture_af("next"),SLIDER_DELAY_af);
    $('.slide_show-pause_button_af').show();
    $('.slide_show-left_button_af, .slide_show-right_button_af, .slide_show-play_button_af').hide();
}

function pauseSlideShow_af() {
    clearInterval(slideShowIntervalId_af);
    $('.slide_show-pause_button_af').hide();
    $('.slide_show-left_button_af, .slide_show-right_button_af, .slide_show-play_button_af').show();
}

function initStartPicturesPage_af () {
    var pageId = document.getElementById("afPicturesPage");
    if(pageId) {
        let sourceArr = [
            "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500",
            "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500"
        ];
        getFromUrl_af(sourceArr);
    }
}

const MAX_COUNT_IMG_ON_PAGE_af = 20;
const SLIDER_DELAY_af = 1000;
const ANIMATION_DELAY_af = 500;
let imageIndex_af = getImageIndex_af ();
let slideShowIntervalId_af;
initStartPicturesPage_af ();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES6 Script END//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////