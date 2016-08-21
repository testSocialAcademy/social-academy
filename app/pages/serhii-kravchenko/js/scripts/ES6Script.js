'use strict';

let url1_skr = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500";
let url2_skr = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500";


function getDataFromLink_skr(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                let error = new Error(this.statusText);
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




getDataFromLink_skr(url1_skr)
    .then(result => {
            let firstLinkData_skr = JSON.parse(result);
        },
        error => alert(`Rejected: ${error}`)

    );
getDataFromLink_skr(url2_skr)
    .then(result => {
            let secondLinkData_skr = JSON.parse(result);
        },
        error => alert(`Rejected: ${error}`)

    );

