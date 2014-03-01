var main = document.getElementById("main");

function getCursorPosition(e) {
    var x;
    var y;
        if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
    }

    x -= main.offsetLeft;
    y -= main.offsetTop;

    return [x, y];
}

var onClick = function(event) {
    cell = getCursorPosition(event);
    console.log(cell);
}

main.addEventListener("click", onClick, false);
