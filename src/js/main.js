var getCursorPosition = function(e) {
    var x, y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
    }
    x -= main.offsetLeft;
    y -= main.offsetTop;
    return [x, y];
};

var drawBoundary = function(canvas) {
    var context = canvas.getContext('2d');
    context.moveTo(80, 80);
    context.lineTo(560, 80);
    context.lineTo(560, 400);
    context.lineTo(80, 400);
    context.lineTo(80, 80);
    context.stroke();
};

var onClick = function(event) {
    var position = getCursorPosition(event);
    var canvas = event.target;
    var context = canvas.getContext('2d');
    context.fillRect(position[0], position[1], 30, 30);
    console.log(position);
};

(function(document) {
    var canvas = document.getElementById('main');
    canvas.addEventListener('click', onClick, false);
    drawBoundary(canvas);
})(document);
