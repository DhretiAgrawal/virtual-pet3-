class Food{
    constructor(x,y){
        this.image=loadImage("Milk.png");
        this.lastFed; 
        this.foodStock = 0;
    }

  display(){
   fill(255,255,254);
   textSize(15);
   
   bedroom()
   {
     background(bedroom,550,500);
   }

   garden()
   {
     background(garden,550,500);
   }

   washroom()
   {
      background(washroom,550,500);
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
     update("Hungry")
     foodObj.display();
   }

   var x = 80 , y = 100;
   
   imageMode(CENTER);
   image(this.image,720,220,70,70);

   if(this.foodStock!=0){ 
       for(var i=0;i<this.foodStock;i++){
           if(i%10==0){ 
               x=80;
               y=y+50;
           }
           image(this.image,x,y,50,50);
           x=x+30;
       }
    }         
  }

    getFoodStock(){
      return this.foodStock;
    }

    updateFoodStock(foodStock){
      this.foodStock=foodStock;
    }

    deductFood(){
      if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
      }
    }


}