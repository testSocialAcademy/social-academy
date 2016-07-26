function divText() {

    var a = ['Coding', 'Investing', 'Golf'];

    return a;
}


function hobbyAdd () {

    var a = divText();
    var b = document.getElementById('hobby');

    for (var i = 0; i < a.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = a[i];

        if (b)
         {  b.appendChild(li); }
    }

    b.style.background = 'lightblue';
    

}


hobbyAdd ();