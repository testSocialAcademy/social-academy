'use strict';

/////////////////////////////////////  Homework_10  //////////////////////////////////////////////////////////////
/*
 let url_1_ai = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500";
 let url_2_ai = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500";

 function getResultRequest_ai(url) {
 return new Promise(function(resolve, reject) {
 let xhr = new XMLHttpRequest();
 xhr.open('GET', url, true);
 xhr.onload = function() {

 if (this.status == 200) {
 resolve(this.responseText);

 } else {
 let error = new Error(this.statusText);
 console.log(error);
 reject(error);
 }
 };
 xhr.onerror = function() {
 reject(new Error("Error!"));
 };
 xhr.send();
 });
 }


 getResultRequest_ai(url_1_ai)
 .then(result => {
 let result_url1_ai = JSON.parse(result);
 result_url1_OnDisplay_ai(result_url1_ai)
 },
 error => alert(new Error)
 );


 getResultRequest_ai(url_2_ai)
 .then(result => {
 let result_url2_ai = JSON.parse(result);
 result_url2_OnDisplay_ai(result_url2_ai)
 },
 error => alert(new Error)
 );


 function result_url1_OnDisplay_ai(result_url1_ai){
 for(let i = 0; i < 10; i++) {
 let result_url1 = result_url1_ai;
 let userImage;
 let divImage = document.getElementById('url_1_ai');
 userImage = document.createElement('img');
 userImage.src = result_url1.hits[i].webformatURL;
 userImage.className = "myImages";
 divImage.appendChild(userImage);
 }
 }


 function  result_url2_OnDisplay_ai(result_url2_ai) {
 for (let i = 0; i < 10; i++) {
 let result_url2 = result_url2_ai;
 let userImage;
 let divImage = document.getElementById('url_2_ai');
 userImage = document.createElement('img');
 userImage.src = result_url2.hits[i].webformatURL;
 userImage.className = "myImages";
 divImage.appendChild(userImage);
 }
 }

 */
///////////////////////////////////////  Homework_11  /////////////////////////////////////////////////////////////////

$(function () {
    let url_1_ai = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500";
    let url_2_ai = "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500";

    function requestUrls_ai(urls) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "GET",
                url: urls,
                dataType: "text",
                success: function (data) {
                    resolve(data);
                },
                error: function (errorObj, status) {
                    if (errorObj.status < 100) {
                        reject("No response from the server");
                    }
                    reject(status);
                }
            });
        });
    }

    requestUrls_ai(url_1_ai)
        .then(result => {
                let result_url1_ai = JSON.parse(result);
                jsonUrl_1(result_url1_ai)
            },
            error => alert(new Error)
        );


    requestUrls_ai(url_2_ai)
        .then(result => {
                let result_url2_ai = JSON.parse(result);
                jsonUrl_2(result_url2_ai)
            },
            error => alert(new Error)
        );

    function jsonUrl_1(result_1) {
        for (let i = 0; i < 10; i++) {
            let result_url1 = result_1;
            let userImage = document.createElement('img');
            userImage.src = result_url1.hits[i].webformatURL;
            userImage.className = "myImages";
            userImage.id = ['img_url1_' + i];
            $('#images_box_ai').append(userImage);
        }
    }

    function jsonUrl_2(result_2) {
        for (let i = 0; i < 10; i++) {
            let result_url2 = result_2;
            let userImage2 = document.createElement('img');
            userImage2.src = result_url2.hits[i].webformatURL;
            userImage2.className = "myImages";
            userImage2.id = ['img_url2_' + i];
            $('#images_box_ai').append(userImage2);
        }
    }

    $('#images_box_ai').on('click', "img", function (e) {
        let imgShow = $('#imgShow');
        imgShow.css('left', (window.innerWidth - imgShow.width()) / 2);
        imgShow.append('<img src>', $(e.target).clone());
        if ($('#imgShow .myImages').length > 0) {
            $('#imgShow img').remove();
            $('#imgShow').append($(e.target).clone().removeClass())
        }
    });

    $('#imgShow').on('click', "img", function (e) {
        $('#imgShow img').hide()
    })
});
