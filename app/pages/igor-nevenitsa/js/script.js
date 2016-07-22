function divText()

{

    var a = ['Coding', 'Investing', 'Golf'];

    var b = document.getElementById('hobby');


    for (var i = 0; i < a.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = a[i];
        b.appendChild(li);
    }

    b.style.background = 'lightblue';
    
    return true;
}

divText();
