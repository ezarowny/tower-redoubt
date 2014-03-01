var BOX_SIZE = 30,
    ARENA_WIDTH = 480,
    ARENA_HEIGHT = 360,
    ARENA_TOP = 60,
    ARENA_LEFT = 80,
    ARENA_RIGHT = ARENA_LEFT + ARENA_WIDTH,
    ARENA_BOTTOM = ARENA_TOP + ARENA_HEIGHT,
    TIME_INTERVAL = 1000 / 30,
    KEEP_RUNNING = false,
    MOUSE_X = null,
    MOUSE_Y = null,
    TOWERS = {};

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
    context.lineTo(ARENA_RIGHT, ARENA_TOP);
    context.lineTo(ARENA_RIGHT, ARENA_BOTTOM);
    context.lineTo(ARENA_LEFT, ARENA_BOTTOM);
    context.lineTo(ARENA_LEFT, ARENA_TOP);
    context.stroke();
};

var drawGrid = function(canvas) {
    var context = canvas.getContext('2d');
    for (var x = ARENA_LEFT + 0.5; x < ARENA_RIGHT; x += BOX_SIZE) {
        context.moveTo(x, ARENA_TOP);
        context.lineTo(x, ARENA_BOTTOM);
    }
    for (var y = ARENA_TOP + 0.5; y < ARENA_BOTTOM; y += BOX_SIZE) {
        context.moveTo(ARENA_LEFT, y);
        context.lineTo(ARENA_RIGHT, y);
    }
    context.strokeStyle = "#eee";
    context.stroke();
};

var onClick = function(event) {
    var position = getCursorPosition(event);
    var canvas = event.target;
    var context = canvas.getContext('2d');
    context.fillRect(position[0], position[1], BOX_SIZE, BOX_SIZE);

    // FIXME: This is problematic. Replace with real tower objects
    // someday.
    var tower = getGridLocation(position[0], position[1]);
    TOWERS[tower] = tower;
};

var onMousemove = function(e) {
    var pos = getCursorPosition(e);
    MOUSE_X = pos[0];
    MOUSE_Y = pos[1];
};

var drawBase = function() {
    var canvas = document.getElementById('main');
    canvas.addEventListener('click', onClick, false);
    drawBoundary(canvas);
    drawGrid(canvas);
};

var clearCanvas = function() {
    var canvas = document.getElementById('main');
    canvas.width = canvas.width;
};

var insideArena = function(x, y) {
    return x >= ARENA_LEFT &&
           x <= ARENA_RIGHT &&
           y >= ARENA_TOP &&
           y <= ARENA_BOTTOM;
};

var drawBoxAtMouse = function() {
    if (MOUSE_X === null || MOUSE_Y === null) {
        return;
    }
    if (!insideArena(MOUSE_X, MOUSE_Y)) {
        return;
    }
    var canvas = document.getElementById('main');
    var context = canvas.getContext('2d');
    var boxLeft = MOUSE_X - (MOUSE_X - ARENA_LEFT) % BOX_SIZE;
    var boxTop = MOUSE_Y - (MOUSE_Y - ARENA_TOP) % BOX_SIZE;
    context.fillRect(boxLeft, boxTop, BOX_SIZE, BOX_SIZE);
};

var getGridLocation = function(x, y) {
    var boxLeft = x - (x - ARENA_LEFT) % BOX_SIZE;
    var boxTop = y - (y - ARENA_TOP) % BOX_SIZE;
    return [boxLeft, boxTop];
};

var drawTowers = function(towers) {
    var canvas = document.getElementById('main');
    var context = canvas.getContext('2d');
    for (towerStr in towers) {
        tower = towers[towerStr];
        context.fillRect(tower[0], tower[1], BOX_SIZE, BOX_SIZE);
    }
};

var drawGame = function() {
    clearCanvas();
    drawBase();
    drawTowers(TOWERS);
    drawBoxAtMouse();
};

var gameLoop = function() {
    //updateState();
    drawGame();
};

var recursiveAnimation = function() {
    gameLoop();
    if (KEEP_RUNNING) {
        window.requestAnimationFrame(recursiveAnimation);
    }
};

var stopLoop = function() {
    KEEP_RUNNING = false;
};

var startLoop = function() {
    if (!KEEP_RUNNING) {
        KEEP_RUNNING = true;
        window.requestAnimationFrame(recursiveAnimation);
    }
};

(function(document) {
    document.getElementById('stop').addEventListener('click', stopLoop);
    document.getElementById('start').addEventListener('click', startLoop);
    document.getElementById('main').addEventListener('mousemove', onMousemove);
    startLoop();
})(document);
