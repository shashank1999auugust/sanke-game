
// {/* // const CANVAS_BORDER_COLOUR = 'blue' */}
const CANVAS_BACKGROUND_COLOUR = "white";

const gameCanvas    = document.getElementById("gameCanvas");
const ctx           = gameCanvas.getContext("2d");

const LEFT_KEY      = 37;
const RIGHT_KEY     = 39;
const UP_KEY        = 38;
const DOWN_KEY      = 40;

function clearCanvas () {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}


ctx.strokestyle = "white";

{/* // snake initial position */}
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150}
            ];

// determines the direction 
var dx = 10;
var dy = 0;

document.addEventListener("keydown",PressDirection);
var foodLocation = GenerateFood();
snake_run ();
// this is the function that runs till the game ends
function snake_run () {
    if(EndGame(snake[0]))
        return;
    setTimeout (
        function onTick () {
            clearCanvas ();
            printFood(foodLocation)
            SnakeFunction();
            advanceSnake();
            snake_run () 
        }
        ,100

    )
}

function EndGame (head) {              
    
    for (var  index = 1; index < snake.length; index++) {
        if (snake[index].x == head.x && snake[index].y == head.y)
            return true;
    }

    if (head.x <  0 || head.x > 290 || head.y < 0 || head.y > 290)
        return true;
    return false;
}

function PressDirection (event) {
    const keypress  = event.keyCode;

    if (keypress == LEFT_KEY){
        if(dx == 10) return;
        dx = -10;dy = 0;
    } else if (keypress == RIGHT_KEY) {
        if(dx == -10) return;
        dx = 10; dy = 0;
    } else if (keypress == UP_KEY) {
        if(dy == 10) return;
        dx = 0; dy = -10;
    } else if (keypress == DOWN_KEY) {
        if(dy == -10) return;
        dx = 0; dy = 10;
    }

}

function SnakeFunction () {
    for (let index = 0; index < snake.length ; index++) {
        printSnakeBlock(snake[index]);
        
    }
}
        
function printSnakeBlock (ordered_pair) {
    ctx.fillStyle = "yellow";
    // ctx.strokestyle = "rgb(242, 245, 66)";
    ctx.fillRect (ordered_pair.x,ordered_pair.y,10,10);

    ctx.strokeRect (ordered_pair.x,ordered_pair.y,10,10);
}

//  ctx.strokeRect(50, 50, gameCanvas.width, gameCanvas.height );

function advanceSnake () {
    const head = 
    {x:snake[0].x + dx,y:snake[0].y + dy}
    
    
    snake.unshift(head);
    if (head.x == foodLocation.x && head.y == foodLocation.y){

        foodLocation = GenerateFood();
    }
    else
        snake.pop ();
}

function randomTen() { 
     return Math.round(
        
        (Math.random() * (300) ) / 10) 
        * 10;
    }

function printFood (ordered_pair){
    ctx.fillStyle = "red";
    
    ctx.fillRect (ordered_pair.x,ordered_pair.y,10,10);
}

function GenerateFood (){
    while (true) {

        let xx = randomTen();
        let yy = randomTen();
        let isFoodValid = true;
        
        // checks if the index of food coninsides with snake
        for (let index = 0; index < snake.length; index++) {
            if (snake[index].x == xx && snake[index].y == yy)
                isFoodValid = false;
        }

        // returns only if the location is valid
        if (isFoodValid)
            return {x:xx,y:yy};

    }
}

