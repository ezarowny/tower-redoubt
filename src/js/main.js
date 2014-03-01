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

function draw_boundary() {
    var main = document.getElementById("main");
    var context = main.getContext("2d");
    context.moveTo(80, 80);
    context.lineTo(560, 80);
    context.lineTo(560, 400);
    context.lineTo(80, 400);
    context.lineTo(80, 80);
    context.stroke();
}

var onClick = function(event) {
    var position = getCursorPosition(event);
    var main = document.getElementById("main");
    var context = main.getContext("2d");
    context.fillRect(position[0], position[1], 20, 20);
    console.log(position);
}

main.addEventListener("click", onClick, false);
draw_boundary();
