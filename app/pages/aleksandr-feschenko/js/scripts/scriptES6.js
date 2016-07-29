function getJSONFromUrl(sourceUrl) {
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


function getFromUrl(srcArr) {
    let chain = Promise.resolve();
    let resultJSON = [];

    srcArr.forEach(function(url) {
        chain = chain
            .then(() => getJSONFromUrl(url))                                    //return promise
            .then((resultOfXhr) => {                                            //nothing return
                resultJSON.push(JSON.parse(resultOfXhr));
            });
    });

    chain
        .then(() => saveToSessionStorage(resultJSON))                           //return value
        .then((arrIndexes) => {                                                 //nothing return
            display(resultJSON,arrIndexes)
        })
        .catch((error) => {
            alert(error);
            //throw new Error(error);           //Commented out, as a result of the console output after 5 seconds, unlike alert
        });
}

function saveToSessionStorage(arrJSON) {
    var indexCategoriesArr = [];
    sessionStorage.clear();
    for (let i = 0; i < arrJSON.length; i++) {
        sessionStorage.setItem(`${i}`,JSON.stringify(arrJSON[i]));
        indexCategoriesArr.push(`${i}`);
    }
    return indexCategoriesArr;
}

function display (resultJSONArr, indexCategoriesArr) {
    setBigImageSlide();                     

    for (let j = 0; j < indexCategoriesArr.length; j++) {
        let tagLi = {}, tagImg = {};
        let previewImagesList = document.getElementById(`images${indexCategoriesArr[j]}`);

        for (let i = 0; i < MAX_IMAGES_FOR_PAGE; i++) {
            let previewImageSrc = resultJSONArr[j].hits[i].previewURL;
            tagLi = document.createElement('li');
            tagLi.className = "preview_images-element";
            previewImagesList.appendChild(tagLi);

            if(previewImageSrc) {
                tagImg = document.createElement('img');
                tagImg.className = "preview_images-element-image";
                tagImg.setAttribute("src", previewImageSrc);
                tagImg.setAttribute("onclick", `setBigImageSlide(${indexCategoriesArr[j]},${i})`);
                previewImagesList.children[i].appendChild(tagImg);
            }
        }
    }
}

function setBigImageSlide(categoryIndex = 0, imageIndex = 0) {
    let bigImageSlide = document.getElementById("big_image-slide");
    let category = JSON.parse(sessionStorage.getItem(`${categoryIndex}`));
    bigImageSlide.setAttribute("alt",`${categoryIndex}, ${imageIndex}`);
    bigImageSlide.src = category.hits[imageIndex].webformatURL;
    elementVisibility("leftButton", true);
    elementVisibility("rightButton", true);
}

function getAnotherPicture(direction, intervalId = null) {
    let bigImageSlide = document.getElementById("big_image-slide");
    let bigImageSlideCategory = +bigImageSlide.getAttribute("alt").split(", ")[0];
    let bigImageSlideIndex = +bigImageSlide.getAttribute("alt").split(", ")[1];
    let category = "";

    if (direction === "next" && bigImageSlideIndex < (MAX_IMAGES_FOR_PAGE - 1)) {
        elementVisibility("leftButton", true);
        category = JSON.parse(sessionStorage.getItem(`${bigImageSlideCategory}`));
        bigImageSlide.setAttribute("alt",`${bigImageSlideCategory}, ${bigImageSlideIndex+1}`);
        bigImageSlide.src = category.hits[bigImageSlideIndex+1].webformatURL;
    }
    else if (direction === "prev" && bigImageSlideIndex > 0) {
        elementVisibility("rightButton", true);
        category = JSON.parse(sessionStorage.getItem(`${bigImageSlideCategory}`));
        bigImageSlide.setAttribute("alt",`${bigImageSlideCategory}, ${bigImageSlideIndex-1}`);
        bigImageSlide.src = category.hits[bigImageSlideIndex-1].webformatURL;
    }
    else if (bigImageSlideIndex === 0) {
        elementVisibility("leftButton", false);
    }
    else {
        clearInterval(intervalId);
        elementVisibility("rightButton", false);
        elementVisibility("playButton", true);
    }
}

function startSlideShow() {
    let bigImageSlide = document.getElementById("big_image-slide");
    let intervalId = setInterval(() => getAnotherPicture("next", intervalId), SLIDE_SHOW_INTERVAL);
    elementVisibility("playButton", false);
}

function elementVisibility(elemId, boolean) {
    let elem = document.getElementById(elemId);
    if (boolean) {
        elem.style.visibility = "visible";
    }
    else {
        elem.style.visibility = "hidden";
    }
}

function initStart () {
    let sourceArr = [
        "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500",
        "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500"
    ];

    getFromUrl(sourceArr);

}

const MAX_IMAGES_FOR_PAGE = 10;
const SLIDE_SHOW_INTERVAL = 2000;
initStart ();