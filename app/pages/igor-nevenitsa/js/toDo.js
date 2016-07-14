function addItem() {
    var text = document.getElementById("toDoList");
    var form = document.getElementById("toDo").value;
    var newLi = document.createElement("li");
    newLi.innerHTML = form;
    newLi.setAttribute("class", "list-group-item");

    localStorage.setItem(form, form);
    var a = localStorage.key(1);



    text.appendChild(newLi);
    a.appendChild(newLi);


}