//Create variables here
var dogSprite , dogImg , happyDog , database , foodS  ,foodStock ;
var changeState,readState,feed , addFood , fedTime , lastFed , foodObj ;
var bedimg ,bedroom,washimg,washroom,garden,gardenimg;

function preload()
{
  //load images here   load images here  load images here load images here  
  dogImg =loadImage("dog.png");
  happyDog=loadImage("happydog.png");
  bedimg=loadImage("Bed Room.png");
  washimg=loadImage("Wash Room.png");
  gardenimg=loadImage("Garden.png"); 


}

function setup() {
  database = firebase.database(); 
  createCanvas(500, 500);
  foodStock=database.ref("Food");
  foodStock.on("value", readStock); 
  dogSprite = createSprite(250,300,10,10);
  dogSprite.addImage(dogImg);
  dogSprite.scale =0.2;

  foodObj=new Food(200,200,10,20);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
}


function draw() {  
  background(46,139,87);
  //image(dogImg, 50, 200,200,200);

  //if(keyWentDown(UP_ARROW)){
  //  writeStock(foodS);
    //dogSprite.addImage(happyDog);
//}
 
 foodObj.display();

 
 

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke("white");
  //text("Food Remaining : " + foodS ,200,200);

  textSize(20);
  fill("black");
  stroke("white");
  //text("Note: PressUP_ARROW Key To Feed Drago Milk ",50,50);
  //need to add feed time in database
  fedTime=database.ref('Feed Time');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + "PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed :" + lastFed + "AM",350,30);
  }
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })   
}

function feedDog(){ 
  dogSprite.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    foodS:x
  })
}



