;(function () {

    var textArea = document.getElementById("toDoListInput");
    var button = document.getElementById("saveButton");
    var ul = document.getElementById("toDoListOutput");
    var li;
    var text = "";

    function remove() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
            localStorage.removeItem(localStorage.key(this));
        }
    }

    function save() {
        if (ul) {
            text = textArea.value;
            textArea.value = "";
            li = document.createElement("li");
            li.innerHTML = text;
            ul.appendChild(li);
            for (var i = 0; i < ul.children.length; i++) {
                localStorage.setItem("item" + i, ul.children[i].innerHTML);
                ul.children[i].addEventListener("click", remove);
            }
        }
    }

    if (button) {
        button.addEventListener("click", save);
    }

    if (ul) {
        for (i = 0; i < localStorage.length; i++) {
            var storage = localStorage.getItem(localStorage.key(i));
            li = document.createElement("li");
            li.innerHTML = storage;
            ul.appendChild(li);
            ul.children[i].addEventListener("click", remove);
        }
    }

})();