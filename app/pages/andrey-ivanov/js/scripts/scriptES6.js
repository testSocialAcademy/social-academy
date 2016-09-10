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

$(document).ready( function(){
   // $("#url_1_ai").css("background-color", "red");
   let request_1 = $.ajax({
        url: "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500",
        success: function(data){
           // console.log(data);
            result_request_1(data)
        }

    });
    function result_request_1(data) {

       // let divImage_1 = $("#url_1_ai").css({"background-color":"red", "width":"120px", "height":"120px"});
        let divImage_1 = $("#url_1_ai").html("<img>").attr("src","https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500");
console.log(data)
    }

    let request_2 = $.ajax({
        url: "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500",
        success: function(data){
            //console.log(data);
        }
    });





});