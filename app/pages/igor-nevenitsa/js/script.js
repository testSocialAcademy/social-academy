function divText()

{

    var a = ['Coding', 'Investing', 'Golf'];

    var b = document.getElementById('hobby');

 
    for(i=0;i<a.length;i++)
    {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(a[i]));
        b.appendChild(li);
    }
    var elem = document.getElementById('hobby');
    elem.style.background = 'lightblue';
}
divText()


