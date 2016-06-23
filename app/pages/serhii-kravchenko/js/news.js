;'use strict';

var xhr = new XMLHttpRequest();
xhr.open("GET", "news.json", false);
xhr.send();


if(xhr.status != 200){
    alert(xhr.status + " " + xhr.statusText);
}else {
    var result = JSON.parse(xhr.responseText);
    console.log(result);
}
var data = result.responseData.entries;

var newsTag = document.getElementById('news');

for (var i=0; i<data.length; i++){
    var ul = newsTag.appendChild(document.createElement('ul'));
    ul.className = "list-group";
    for (var key in data[i]){
        switch (key) {
            case "title":
                var liTitle=ul.appendChild(document.createElement('li'));
                    liTitle.className = "list-group-item";
                    var aTitle = liTitle.appendChild(document.createElement('a'));
                    aTitle.href = data[i].url;
                    aTitle.innerHTML= data[i][key];
                break;
            case "contentSnippet":
                var liContent=ul.appendChild(document.createElement('li'));
                    liContent.className = "list-group-item";
                    liContent.innerHTML = data[i][key];
                break;
            case "link":
                var liLink=ul.appendChild(document.createElement('li'));
                liLink.className = "list-group-item";
                var aLink = liLink.appendChild(document.createElement('a'));
                aLink.href = data[i][key];
                aLink.innerHTML = data[i][key];
                break;
            default:
                break;
        }
        // if (key == 'title'){
        //     var liTitle=ul.appendChild(document.createElement('li'));
        //     liTitle.className = "list-group-item";
        //     var aTitle = liTitle.appendChild(document.createElement('a'));
        //     aTitle.href = data[i].url;
        //     aTitle.innerHTML= data[i][key];
        // } else if (key=='contentSnippet') {
        //     var liContent=ul.appendChild(document.createElement('li'));
        //     liContent.className = "list-group-item";
        //     liContent.innerHTML = data[i][key];
        // } else if(key=='link'){
        //     var liLink=ul.appendChild(document.createElement('li'));
        //     liLink.className = "list-group-item";
        //     var aLink = liLink.appendChild(document.createElement('a'));
        //     aLink.href = data[i][key];
        // } else break;

                
         
    }
    
}




