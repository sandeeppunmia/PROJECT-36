//Create variables here
var canvas;
var dog, dogImg,happyDog ,happyDogImg,database, foodS, foodStock;
var feed, addFood;
var foodStock,lastFed,foodObj;
var gameState = 0;
var petCount;
var database;
var form,pet,game;
var bedRoomImg,deadDogImg,dogVaccinationImg,FoodStockImg,GardenImg,InjectionImg,LazyDogImg,LivingRoomImg;
var RunningDogImg,RunningLeftDogImg,VaccinationImg,WashroomImg;
var readState;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedRoomImg = loadImage("images/virtual pet images/Bed Room.png");
  deadDogImg = loadImage("images/virtual pet images/deadDog.png");
  dogVaccinationImg = loadImage("images/virtual pet images/dogVaccination.png");
  FoodStockImg = loadImage("images/virtual pet images/Food Stock.png");
  GardenImg = loadImage("images/virtual pet images/Garden.png");
  InjectionImg = loadImage("images/virtual pet images/Injection.png");
  LazyDogImg = loadImage("images/virtual pet images/Lazy.png");
  LivingRoomImg = loadImage("images/virtual pet images/Living Room.png");
  RunningDogImg = loadImage("images/virtual pet images/running.png");
  RunningLeftDogImg = loadImage("images/virtual pet images/runningLeft.png");
  VaccinationImg = loadImage("images/virtual pet images/Vaccination.jpg");
  WashroomImg = loadImage("images/virtual pet images/Wash Room.png");
}

function setup() {
  canvas = createCanvas(600, 600);
  database = firebase.database();
  dog = createSprite(450,200);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock,showErr);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  game = new Game();
  game.getState();
  game.start();

  milk = new Food();

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
 
}


function draw() {  
  background(46, 139, 87);

  

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  

  getLastFedTime();
  fill(255,255,254);
    textSize(20);
    lastFed = hour();
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed + "AM",350,30);
  }
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    //foodObj.display();
  }

  if(foodS<=0){
    fill(255,255,254);
    textSize(20);
    text("Oops, it seems that you don't have food to feed your dog..Please ",10,470);
    text("add the food to feed your dog",10,490);
  }

  

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    //dog.addImage(LazyDogImg);
  }

 function update(state){
   database.ref('/').update({
     gameState:state
   });
 }

milk.display();

  drawSprites();
  //add styles here
  textSize(30);
  fill("red");
  text("Food Remaining:"+foodS,10,450);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }
  database.ref('/').set({
    Food:x
  })
}

function showErr(){
  console.log("Error in reading the database");
}

function feedDog(){
  dog.addImage(happyDogImg);
  foodS = foodS - 1;
  database.ref('/').update({
    Food:foodS
  
})
}


  function addFoods(){
      foodS++;
      database.ref('/').update({
          Food:foodS
      })

  }

  async function getLastFedTime(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/asia/tokyo");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
  }
  