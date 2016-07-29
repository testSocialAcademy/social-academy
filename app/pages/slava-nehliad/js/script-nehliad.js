"use strict";
(function() {


        function showHobby() {
            var personalInfo = document.getElementById("hobby-list");
            var list = document.createElement("ul");
            var hobby = ["music", "literature", "programming", "basket-ball"];
            for (var i = 0; i < hobby.length; i++){
                var li = document.createElement("li");
                li.innerHTML = hobby[i];
                list.appendChild(li);
            }
            
             personalInfo.appendChild(list);
        }
        showHobby()
})();








