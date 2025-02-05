class ThrowableObject extends MovableObject{
    
    bottleThrow;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    bottle_throw_sound = new Audio('sounds/bottle_throw.mp3');
    
    /**
    * Constructs an instance of the class, initializing the image, position and its animation.
    * 
    * @param {number} x - the x-coordinate of the instance
    * @param {number} y - the y-coordinate of the instance 
    */
    constructor(x, y){
        super().loadImage('img/4. Marcadores/Posiขn/Dark - Left.png')
        this.isEndboss = true;
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 50;
        this.throw();
    }
    
    /**
    * This function simulates throwing a bottle by playing the throw sound, setting an initial upward velocity, and applying gravity to the object. It then uses `setInterval` to move the bottle horizontally, check for collisions with the end boss, and stop the motion once the bottle has traveled beyond a certain distance
    * 
    */
    throw(){
        this.bottle_throw_sound.play();
        this.speedY = 15;
        this.applyGravity();
        this.bottleThrow  = setInterval(() => {
            this.x += 15;
            this.checkEndbossCollision();
            if(this.x >= 5000){
                clearInterval(this.bottleThrow);
            };
        },15);  
    }
    
    /**
    * This function checks, if the Entity collides with the endboss and executes the playEndbossHurtAnimation-function it this is true.
    */
    checkEndbossCollision(){
        world.level.enemies.forEach(element => {
            if(this.isTheEndboss()){
                if(this.isColliding(element) && element instanceof Endboss){
                    clearInterval(this.bottleThrow);
                    this.playEndbossHurtAnimation();
                }
            } 
        });
    }
    
    /**
    * This function executes functions to animate, that the endboss is hurt and  animate its death, if its energy is 0.
    */
    playEndbossHurtAnimation(){
        let endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
        if(endboss){ 
            endboss.hit();
            world.enemyBar.setPercentage(endboss.energy);
            endboss.endboss_hurt_sound.play();
            endboss.wasHurt();
            if(endboss.hasDied()){
                endboss.playDeadAnimation();
            }
        } 
    }
    
    /**
    * This function checks, if the entity is the endboss.
    * 
    * @returns {boolean} - returns true, if the variable isEndboss is true
    */
    isTheEndboss(){
        return this.isEndboss === true;
    }
}




