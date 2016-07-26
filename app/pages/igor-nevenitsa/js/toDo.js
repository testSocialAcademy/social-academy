

for ( var i = 0; i < localStorage.length; i++) {

        var text = document.getElementById("toDoList");
        var locStor =  localStorage.getItem(localStorage.key(i));  //Достаем из localStorage ключ по очереди, используя
                                                                    //текущее значение i

        newLi = document.createElement("li");
        newLi.setAttribute("class", "list-group-item ");

       /* newLi.setAttribute("onclick",   "this.parentNode.removeChild(this);" );*/

        newLi.setAttribute("onclick",  "locStorDel(this)" );

        /*newLi.setAttribute("name",  "i");*/

        newLi.innerHTML = locStor;
        text.appendChild(newLi);

}

function locStorDel(param) {

    if(localStorage) {
    localStorage.removeItem(localStorage.key(param)); //удаляет из local storage принятое значение this с
    }                                                // newLi.setAttribute("onclick",  "locStorDel(this)" );


    if (param) {
    param.parentNode.removeChild(param);    //удаляет ребенка ul => li со значением this из
    }                                       // newLi.setAttribute("onclick",  "locStorDel(this)" );

    return true
}


function addItem() {


        var form = document.getElementById("toDo").value;
        var newLi = document.createElement("li");



        newLi.innerHTML = form;



        newLi.setAttribute("class", "list-group-item");
        newLi.setAttribute("onclick",  "locStorDel(this)" );

        localStorage.setItem(form, form);



        text.appendChild(newLi);


    return true;
}


