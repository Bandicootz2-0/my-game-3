
var stickman,stickmanAnimation;
var boxes;
var boxesImg, spikesImg;
var ground;
var boxesArray= [];
var lives= 3;
var score= 0;

function preload() {
  backgroundImage = loadImage("./assets/bg.png");
  stickmanAnimation= loadAnimation("./assets/S1.png", "./assets/S2.png", "./assets/S3.png", "./assets/S4.png");
  spikesImg= loadImage("./assets/spikes.png");
  boxesImg= loadImage("./assets/box.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  stickman= createSprite(60, height-100);
  stickman.addAnimation("stick", stickmanAnimation);
  stickman.scale= 0.65;

  ground= createSprite(60,height-20,width,10);


  
}

function draw() {
  background(backgroundImage);
  
  spawnBoxes();

  stickman.collide(ground);

  if(keyDown("space")) {
    stickman.velocity.y= -10;
  }
  stickman.velocity.y+=0.5;

  for(var i=0; i<boxesArray.length; i++) {
    if (stickman.collide(boxesArray[i])) {
      lives-=1;
      boxesArray[i].remove();
      boxesArray.splice(i, 1);
      i--;
    }
  }

  textSize(22);
  fill("white");
  text("Lives = "+ lives, 100, 150);

  drawSprites();
}


function spawnBoxes() {
  if(frameCount%Math.round(random(100,400)) == 0) {
    boxes= createSprite(width+10, height-80);
    rand= Math.round(random(1,2));
    if(rand==1) {
      boxes.addImage("box",boxesImg);
    }else {
      boxes.addImage("spike", spikesImg)
    }
    boxes.scale= 1.5;
    boxes.velocity.x= -2;
    boxes.lifetime= 800;
    boxesArray.push(boxes);
  }
}