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
    TOWERS = [],
    CREEPS = [];

var Tower = function(options) {
    options = options || {};
    this.x = typeof options.x === 'undefined' ? 0 : options.x;
    this.y = typeof options.y === 'undefined' ? 0 : options.y;
};

var Creep = function(options) {
    this.x = options.x;
    this.y = options.y;
    this.speedX = 1;
    this.speedY = 1;
};

var getCanvas = function() {
    return document.getElementById('main');
};

var getContext = function() {
    return getCanvas().getContext('2d');
};

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

var squareIsFree = function(x, y) {
    for (var i = 0; i < TOWERS.length; ++i) {
        var tower = TOWERS[i];
        if (x === tower.x && y === tower.y) {
            return false;
        }
    }
    return true;
};

var onClick = function(event) {
    var position = getCursorPosition(event);
    var canvas = event.target;
    var context = canvas.getContext('2d');
    context.fillRect(position[0], position[1], BOX_SIZE, BOX_SIZE);
    var towerPos = getGridLocation(position[0], position[1]);
    if (squareIsFree(towerPos[0], towerPos[1])) {
        TOWERS.push(new Tower({x: towerPos[0], y: towerPos[1]}));
    }
};

var onMousemove = function(e) {
    var pos = getCursorPosition(e);
    MOUSE_X = pos[0];
    MOUSE_Y = pos[1];
};

var drawBase = function() {
    var canvas = getCanvas();
    canvas.addEventListener('click', onClick, false);
    drawBoundary(canvas);
    drawGrid(canvas);
};

var clearCanvas = function() {
    var canvas = getCanvas();
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
    var context = getContext();
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
    var context = getContext();
    for (var i = 0; i < towers.length; i++) {
        var tower = towers[i];
        context.fillRect(tower.x, tower.y, BOX_SIZE, BOX_SIZE);
    }
};

var drawCreeps = function(creeps) {
    var context = getContext();
    for (var i = 0; i < creeps.length; ++i) {
        var creep = creeps[i];
        context.fillRect(creep.x, creep.y, BOX_SIZE, BOX_SIZE);
    }
};

var drawGame = function() {
    clearCanvas();
    drawBase();
    drawTowers(TOWERS);
    drawCreeps(CREEPS);
    drawBoxAtMouse();
};

var updateState = function() {
    for (var i = 0; i < CREEPS.length; ++i) {
        var creep = CREEPS[i];
        creep.x = creep.x + creep.speedX;
    }
};

var gameLoop = function() {
    updateState();
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

    for (var i = 0; i < 20; i++) {
        setTimeout(function(i) {
            CREEPS.push(new Creep({x: ARENA_LEFT, y: ARENA_TOP + (BOX_SIZE * i)}));
        }, 1000*i, i);
    }
})(document);
