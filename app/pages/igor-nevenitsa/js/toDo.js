function addItem() {
    var text = document.getElementById("toDoList");
    var form = document.getElementById("toDo").value;
    var newLi = document.createElement("li");
    newLi.innerHTML = text;
    newLi.setAttribute("class", "list-group-item");

    localStorage.setItem(form, form);
    localStorage.getItem("form");



    text.appendChild(newLi);

}