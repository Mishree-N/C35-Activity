//variables
var ball;
var database, dbPosition;

function setup(){
    //setup database
    database = firebase.database ();
    //create canvas
    createCanvas(500,500);

    //create red ball
    ball = createSprite(10,10,10,10);
    ball.shapeColor = "red";

    //refer to ball position in database inside the Ball/Position
    var ballPosition = database.ref ("Ball/Position") ;
    //listening whenever ball's position changes
    ballPosition.on ("value", readPosition, showError);
}

function draw(){

    //make background white
    background("white");

    //when left arrow key is pressed
    if(keyDown(LEFT_ARROW)){
        //make ball move left
        writePosition(-1,0);
    }

    //when right arrow key is pressed
    else if(keyDown(RIGHT_ARROW)){
        //move ball to right
        writePosition(1,0);
    }

    //when up arrow key is pressed
    else if(keyDown(UP_ARROW)){
        //move ball up
        writePosition(0,-1);
    }

    //when down arrow key is pressed
    else if(keyDown(DOWN_ARROW)){
        //move ball down
        writePosition(0,+1);
    }

    //show sprites
    drawSprites();
}


//read position to
function readPosition(data){

    //take changed x and y value from database  
    pos = data.val ();
    //set it to ball's position
    ball.x=pos.x;
    ball.y=pos.y;


    console.log(pos.x + ": " + pos.y);

}

function showError(){

    console.log ("error");

}


function writePosition(x,y){

    //refer to ball position in database inside the Ball/Position
    ballPosition = database.ref ("Ball/Position") ;
    //setting and incrementing the x and y in firebase console and ball sprite
    ballPosition.set({x: ball.x+x , y: ball.y+y });

}