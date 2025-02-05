class Pufferfish extends MovableObject {
    
    height = 80;
    width = 80;
    y = 350;
    isDead = false;
    offset = {
        top: 0,
        bottom: 20,
        left: 0,
        right: 0
    }
    
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];
    
    IMAGES_DYING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];
    
    /**
    * Constructs an instance of the class, initializing its image, position, size and animation settings.
    * 
    */
    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DYING);
        this.x = 250 + Math.random() * (2500 - 250);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    
    /**
    * This function creates stoppableIntervals, which executes the checkIfItCanMove and playTheCorrectPictures functions.
    */
    animate(){
        setStoppableInterval(this.checkIfItCanMove.bind(this), 1000 / 60);
        setStoppableInterval(this.playTheCorrectPictures.bind(this), 250);
    }
    
    /**
    * This function sets an Interval which executes the playAnimation-function with the IMAGES_DYING-array as its parameter.
    */
    animateDead(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_DYING);
        }, 250);
    }
    
    /**
    * This function checks, if the entity is dead and executes the moveLeft-function when the condition is false
    */
    checkIfItCanMove(){
        if(!this.isDead){
            this.moveLeft();   
        }  
    }
    
    /**
    * This function checks if the entity is dead, in which case the function would execute the playAnimation-function with the IMAGES_DYING-array as its parameter, or not, in which case the playAnimation-function is executed with the IMAGES_SWIMMING-array as its parameter.
    */
    playTheCorrectPictures(){
        if(!this.isDead){
            this.playAnimation(this.IMAGES_SWIMMING); 
        }else if(this.isDead && this.y < 600){
            this.playAnimation(this.IMAGES_DYING);
            this.speed += 5;
            this.moveDown();
        }
    }
    
}