class Jellyfisch extends MovableObject{
    
    height = 80;
    width = 80;
    y = 350;
    needsToGoUp;
    isDead = false;
    offset = {
        top: 0,
        bottom: 20,
        left: 0,
        right: 0
    }
    
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
    
    IMAGES_DYING = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];
    
    /**
    * Constructs an instance of the class, initializing its image, position, size and animation settings.
    * 
    */
    constructor(){
        super().loadImage( 'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DYING);
        this.x = 250 + Math.random() * (2500 - 250);
        this.speed = 0.15 + Math.random() * 0.25;
        this.needsToGoUp = true;
        this.animate();
    }
    
    /**
    * This function creates stoppableIntervals, which executes the goUpOrDown and determineTheCorrectPictures functions.
    */
    animate(){
        setStoppableInterval(this.goUpOrDown.bind(this), 1000 / 60);
        setStoppableInterval(this.determineTheCorrectPictures.bind(this), 250);
    }
    
    /**
    * This function checks, if the entity has to move down based on its current location. If this is false, the needsToGoUp-variable is set to true.
    */
    goDown(){
        if(!this.needsToGoUp && this.y < 450 - this.height){
            this.moveDown();
        }else{
            this.needsToGoUp = true;
        }
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
    * This function checks, if the entity's y-coordinate is bigger than 0, if it needs to go up and if it is not dead. When this conditions are true, the moveUp-function is executed. It also executes the goDown-function, when the entity needs to
    */
    goUpOrDown(){
        if (this.y >= 0 && this.needsToGoUp && !this.isDead) {
            this.moveUp();
        } else if (this.y <= 0 || !this.needsToGoUp && !this.isDead) {
            this.needsToGoUp = false;
            this.goDown();
        }
    }
    
    /**
    * This function checks if the entity is dead, in which case the function would execute the playAnimation-function with the IMAGES_DYING-array as its parameter, or not, in which case the playAnimation-function is executed with the IMAGES_SWIMMING-array as its parameter.
    */
    determineTheCorrectPictures(){
        if(!this.isDead){
            this.playAnimation(this.IMAGES_SWIMMING);
        }else if(this.isDead && this.y < 600){
            this.playAnimation(this.IMAGES_DYING);
            this.speed += 5;
            this.moveDown();
        }
    } 
}