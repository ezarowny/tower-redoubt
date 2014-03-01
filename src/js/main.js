var BOX_SIZE = 30,
    ARENA_TOP = 60,
    ARENA_LEFT = 80,
    ARENA_WIDTH = 480,
    ARENA_HEIGHT = 360;

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
    context.moveTo(ARENA_LEFT, ARENA_TOP);
    context.lineTo(ARENA_LEFT + ARENA_WIDTH, ARENA_TOP);
    context.lineTo(ARENA_LEFT + ARENA_WIDTH, ARENA_TOP + ARENA_HEIGHT);
    context.lineTo(ARENA_LEFT, ARENA_TOP + ARENA_HEIGHT);
    context.lineTo(ARENA_LEFT, ARENA_TOP);
    context.stroke();
};

var onClick = function(event) {
    var position = getCursorPosition(event);
    var canvas = event.target;
    var context = canvas.getContext('2d');
    context.fillRect(position[0], position[1], BOX_SIZE, BOX_SIZE);
    console.log(position);
};

(function(document) {
    var canvas = document.getElementById('main');
    canvas.addEventListener('click', onClick, false);
    drawBoundary(canvas);
})(document);
