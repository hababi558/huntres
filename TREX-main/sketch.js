var player,playerImg;
var ground,platform,platformGroup,platformImg;
var obstacle1, obstacle2, obstacle3, obstacleImg, obstacle, obstaclesGroup;


function preload(){
playerImg = loadImage("mario.png");
}

function setup(){
  createCanvas(600,400)

  ground = createSprite(300,380,1200,20);
  ground.velocityX = -5

  player = createSprite(100,360,40,40)
 player.addImage(playerImg)
 player.scale = 0.3 

  obstaclesGroup = new Group();
  platformGroup = new Group();
}

function draw(){
  background("black") 
  

  if (ground.x < 0){
    ground.x = ground.width/2;
  }  
  
  if(keyDown("space") && player.y >= 159) {
    player.velocityY = -12;
  }

  player.velocityY = player.velocityY + 0.8
  
  player.collide(ground);  

 // camera.position.x=player.position.x
camera.position.y=player.y

if (player.isTouching(platformGroup)){
  player.collide(platformGroup)
}

  spawnObstacles()
  spawnplatform()
  drawSprites()


}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,350,40,100);
    //obstacle.debug = true;
   //  obstacle.velocityX = -(6 + 3*score/100);
   obstacle.velocityX = -6
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
  /*  switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnplatform() {
  //write code here to spawn the platforms
  if (frameCount % 120 === 0) {
    var platform = createSprite(600,120,100,40 );
    platform.y = Math.round(random(80,400));
    //platform.addImage(platformImage);
    platform.scale = 0.5;
    platform.velocityX = -3;
    
     //assign lifetime to the variable
    platform.lifetime = 200;
    
    //adjust the depth
    platform.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each platform to the group
    platformGroup.add(platform);
  }
  
}