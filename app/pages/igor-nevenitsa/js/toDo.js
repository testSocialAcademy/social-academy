for ( var i = 1; i < localStorage.length; i++) {
        var text = document.getElementById("toDoList");
        var locStor =  localStorage.getItem(localStorage.key(i));
        newLi = document.createElement("li");
        newLi.setAttribute("class", "list-group-item ");
       /* newLi.setAttribute("onclick",   "this.parentNode.removeChild(this);" );*/
        newLi.setAttribute("onclick",  "locStorDel(this)" );
        /*newLi.setAttribute("name",  "i");*/
        newLi.innerHTML = locStor;
        text.appendChild(newLi);

}

function locStorDel(param) {

    localStorage.removeItem(localStorage.key(param));
    param.parentNode.removeChild(param);
}


function addItem() {

    var form = document.getElementById("toDo").value;
    var newLi = document.createElement("li");
    newLi.innerHTML = form;
    newLi.setAttribute("class", "list-group-item");

    localStorage.setItem(form, form);



    text.appendChild(newLi);

    return true;

}

