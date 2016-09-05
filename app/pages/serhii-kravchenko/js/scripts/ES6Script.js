// 'use strict';
//
// let url1_skr = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500";
// let url2_skr = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500";
//
//
// function getDataFromLink_skr(url) {
//     return new Promise(function(resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onload = function() {
//             if (this.status == 200) {
//                 resolve(this.responseText);
//             } else {
//                 let error = new Error(this.statusText);
//                 error.code = this.status;
//                 reject(error);
//             }
//         };
//         xhr.onerror = function() {
//             reject(new Error("Network Error"));
//         };
//         xhr.send();
//     });
// }
//
//
//
//
// getDataFromLink_skr(url1_skr)
//     .then(result => {
//             let firstLinkData_skr = JSON.parse(result);
//         },
//         error => alert(`Rejected: ${error}`)
//
//     );
// getDataFromLink_skr(url2_skr)
//     .then(result => {
//             let secondLinkData_skr = JSON.parse(result);
//         },
//         error => alert(`Rejected: ${error}`)
//
//     );
//

(function(global) {
    var slider = function(rootEl, urls) {

        this.data = [];

        this.init = function() {
            var functions = [];
            urls.forEach(url => {
                functions.push(this.fetchData(url));
            });
            Promise.all(functions).then(() => {
                this.render();
            });
            this.initHandler();
        };

        this.initHandler = function() {
            $("#next").on("click", this.next);
            $("#prev").on("click", this.prev);
        };

        this.fetchData = function(url) {
            return $.get(url).then(res => {
                let data = this.parseData(res);
                this.data = this.data.concat(data);
            });
        };

        this.parseData = function(res) {
            return res.hits.slice(0, 10);
        };

        this.render = function() {
            let lies = this.data.map(config => {
                return this.getLi(config);
            });
            rootEl.html(lies);
            this.initVisibleFirst();
            this.autoPlay();
        };

        this.getLi = function(config) {
            let $li = $("ul#slider li:first-child").clone();
            $li.find("img").attr("src", config.webformatURL);
            return $li;
        };

        this.initVisibleFirst = function() {
            let $liFirst = rootEl.find("li:first-child");
            $liFirst.addClass("active");
        };

        this.autoPlay = function() {
            setInterval(this.next.bind(this), 3000);
        };

        this.next = function() {
            let $liActive = rootEl.find("li.active");
            let $liNext = $liActive.next();
            $liNext = $liNext.length ? $liNext : rootEl.find("li:first-child");
            $liActive.removeClass("active");
            $liNext.addClass("active");
        };
        this.prev = function() {
            let $liActive = rootEl.find("li.active");
            let $liPrev = $liActive.prev();
            $liPrev = $liPrev.length ? $liPrev : rootEl.find("li:first-child");
            $liActive.removeClass("active");
            $liPrev.addClass("active");
        };

        this.init();
    };

    global.slider = slider;
})(window);
var urls = [
    "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500",
    "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500"
];
var rootEl = $("#slider");
var slider = new slider(rootEl, urls);


