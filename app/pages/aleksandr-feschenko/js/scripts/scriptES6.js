/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES6 Script /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getJSONFromUrl_af(sourceUrl) {
    return new Promise(function(resolve, reject) {
        var	req	= new XMLHttpRequest();
        req.open("GET",	sourceUrl, true);

        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    resolve(req.responseText);
                }
                else if (!req.status) {
                    reject("No response from the server");
                }
                else {
                    reject(`${req.status} ${req.statusText}`);
                }
            }
        };
        req.send(null);
    });
}


function getFromUrl_af(srcArr) {
    let chain = Promise.resolve();
    let resultJSON = [];

    srcArr.forEach(function(url) {
        chain = chain
            .then(() => getJSONFromUrl_af(url))                                    //return promise
            .then((resultOfXhr) => {                                            //nothing return
                resultJSON.push(JSON.parse(resultOfXhr));
            });
    });

    chain
        .then(() => saveToSessionStorage_af(resultJSON))                           //return value
        .then((arrIndexes) => {                                                 //nothing return
            display_af(resultJSON,arrIndexes)
        })
        .catch((error) => {
            alert(error);
            //throw new Error(error);           //Commented out, as a result of the console output after 5 seconds, unlike alert
        });
}

function saveToSessionStorage_af(arrJSON) {
    var indexCategoriesArr = [];
    sessionStorage.clear();
    for (let i = 0; i < arrJSON.length; i++) {
        sessionStorage.setItem(`${i}`,JSON.stringify(arrJSON[i]));
        indexCategoriesArr.push(`${i}`);
    }
    return indexCategoriesArr;
}

function display_af (resultJSONArr, indexCategoriesArr) {
    setBigImageSlide_af();                     

    for (let j = 0; j < indexCategoriesArr.length; j++) {
        let tagLi = {}, tagImg = {};
        let previewImagesList = document.getElementById(`images${indexCategoriesArr[j]}_af`);

        for (let i = 0; i < MAX_IMAGES_FOR_PAGE_af; i++) {
            let previewImageSrc = resultJSONArr[j].hits[i].previewURL;
            tagLi = document.createElement('li');
            tagLi.className = "preview_images-element_af";
            previewImagesList.appendChild(tagLi);

            if(previewImageSrc) {
                tagImg = document.createElement('img');
                tagImg.className = "preview_images-element-image_af";
                tagImg.setAttribute("src", previewImageSrc);
                tagImg.setAttribute("onclick", `setBigImageSlide_af(${indexCategoriesArr[j]},${i})`);
                previewImagesList.children[i].appendChild(tagImg);
            }
        }
    }
}

function setBigImageSlide_af(categoryIndex = 0, imageIndex = 0) {
    let bigImageSlide = document.getElementById("big_image-slide_af");
    let category = JSON.parse(sessionStorage.getItem(`${categoryIndex}`));
    bigImageSlide.setAttribute("alt",`${categoryIndex}, ${imageIndex}`);
    bigImageSlide.src = category.hits[imageIndex].webformatURL;
    elementVisibility_af("leftButton_af", true);
    elementVisibility_af("rightButton_af", true);
}

function getAnotherPicture_af(direction, intervalId = null) {
    let bigImageSlide = document.getElementById("big_image-slide_af");
    let bigImageSlideCategory = +bigImageSlide.getAttribute("alt").split(", ")[0];
    let bigImageSlideIndex = +bigImageSlide.getAttribute("alt").split(", ")[1];
    let category = "";

    if (direction === "next" && bigImageSlideIndex < (MAX_IMAGES_FOR_PAGE_af - 1)) {
        elementVisibility_af("leftButton_af", true);
        category = JSON.parse(sessionStorage.getItem(`${bigImageSlideCategory}`));
        bigImageSlide.setAttribute("alt",`${bigImageSlideCategory}, ${bigImageSlideIndex+1}`);
        bigImageSlide.src = category.hits[bigImageSlideIndex+1].webformatURL;
    }
    else if (direction === "prev" && bigImageSlideIndex > 0) {
        elementVisibility_af("rightButton_af", true);
        category = JSON.parse(sessionStorage.getItem(`${bigImageSlideCategory}`));
        bigImageSlide.setAttribute("alt",`${bigImageSlideCategory}, ${bigImageSlideIndex-1}`);
        bigImageSlide.src = category.hits[bigImageSlideIndex-1].webformatURL;
    }
    else if (bigImageSlideIndex === 0) {
        elementVisibility_af("leftButton_af", false);
    }
    else {
        clearInterval(intervalId);
        elementVisibility_af("rightButton_af", false);
        elementVisibility_af("playButton_af", true);
    }
}

function startSlideShow_af() {
    let bigImageSlide = document.getElementById("big_image-slide_af");
    let intervalId = setInterval(() => getAnotherPicture_af("next", intervalId), SLIDE_SHOW_INTERVAL_af);
    elementVisibility_af("playButton_af", false);
}

function elementVisibility_af(elemId, boolean) {
    let elem = document.getElementById(elemId);
    if (boolean) {
        elem.style.visibility = "visible";
    }
    else {
        elem.style.visibility = "hidden";
    }
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

const MAX_IMAGES_FOR_PAGE_af = 20;
const SLIDE_SHOW_INTERVAL_af = 2000;
initStartPicturesPage_af ();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES6 Script END//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////