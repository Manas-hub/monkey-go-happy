var mnky, mnky_running;
var invisibleGround;
var obstaclesGroup,obstacle;

var play = 1
var end = 2
var gamestate= play

var score;


//function preload(){
//mnky_running=loadAnimation("Monkey_01.png,Monkey_02.png,Monkey_03.png,Monkey_04.png,Monkey_05.png,Monkey_06.png,Monkey_07.png,Monkey_08.png,Monkey_09.png,Monkey_10.png");
//mnky_running=loadAnimation("Monkey_01.png,Monkey_02.png")
//obstacle = loadImage("stone.png");
//}

function setup() {
  createCanvas(600, 200);
  
  mnky = createSprite(50,180,20,50);
  //mnky.addAnimation("running", mnky_running);
  mnky.scale = 0.5;
  
  invisibleground = createSprite(200,180,400,20);
  invisibleground.x =  invisibleground.width /2;
  invisibleground.velocityX = -4;
  invisibleground.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
  if(gamestate === play){
  
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
  
  if(keyDown("space")) {
    mnky.velocityY = -10;
  }
  
  mnky.velocityY = mnky.velocityY + 0.8
  
  if ( invisibleground.x < 0){
    invisibleground.x =  invisibleground.width/2;
  }
  if(obstaclesGroup.isTouching (mnky)){
    gamestate = end
  }
  } 
  else if(gamestate === end){
    //mnky.addAnimation("collide",mnky_collided)
    obstaclesGroup.setVelocityXEach(0);
  }

  mnky.collide(invisibleGround);
  spawnObstacles();
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}