var text = document.getElementById("toDoList");

for ( var i = 0; i < localStorage.length; i++) {



           var locStor = localStorage.getItem(localStorage.key(i));  //Достаем из localStorage ключ по очереди, используя
           //текущее значение i

           newLi = document.createElement("li");
           newLi.setAttribute("class", "list-group-item ");

           /* newLi.setAttribute("onclick",   "this.parentNode.removeChild(this);" );*/

           newLi.setAttribute("onclick", "locStorDel(this)");

           /*newLi.setAttribute("name",  "i");*/

           newLi.innerHTML = locStor;
           text.appendChild(newLi);
       

}

function locStorDel(param) {

    if(localStorage) {

        a =  localStorage.getItem(param.innerHTML);

        localStorage.removeItem(a);



    param.parentNode.removeChild(param);    //удаляет ребенка ul => li со значением this из
    }                                       // newLi.setAttribute("onclick",  "locStorDel(this)" );



}


function addItem() {


        var form = document.getElementById("toDo").value;
        var newLi = document.createElement("li");



        newLi.innerHTML = form;



        newLi.setAttribute("class", "list-group-item");
        newLi.setAttribute("onclick",  "locStorDel(this)" );


        localStorage.setItem(form, form);



        text.appendChild(newLi);

        return form;

}


