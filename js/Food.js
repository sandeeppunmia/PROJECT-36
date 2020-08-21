class Food{
    constructor(){
      //var foodStock,lastFed,foodObj;
      this.image = loadImage("images/Milk.png");
      
    }

    bedroom(){
        background(bedRoomImg,550,500);
    }

    garden(){
         background(GardenImg,550,500);
    }

    washroom(){
         background(WashroomImg,550,500);
    }

    display(){
        var x=80,y=200;
        imageMode(CENTER);    

        if(this.foodStock!=0){
            for(var i=1;i<=foodS;i++){
                if(i%10==0){
                    x=80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
           
                  
        }
        
    }
 }

