class Endboss extends MovableObject {
    
    height = 500;
    width = 500;
    y = -30;
    energy = 100;
    animateEndboss;
    attackTime = 0;
    hadFirstContact = false;
    endboss_hurt_sound = new Audio('sounds/endboss_hit.mp3');
    introSeen = false;
    i= 0;
    isAttacking = false;
    
    offset = {
        top:  240,
        bottom: 100,
        left: 180,
        right: 80
    }
    
    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png' 
    ];
    
    
    IMAGES_INTRO = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
    
    
    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];
    
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];
    
    
    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];
    
    /**
    * constructs an instance of the class, initializing its image, loading various animation states, setting its initial position and starts the animation sequence
    */
    constructor(){
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 3000;
        this.animate();
    }
    
    /**
    * This function sets an interval that executes its inner functions when the end boss appears, whether for the first time or not. It also adds the interval to the interval-array.
    */
    animate(){
        this.speed = 20;
        this.animateEndboss=  setInterval(() => {
            if(this.introWasntSeen()){
                this.playTheIntroPics(); 
            }else{
                this.activateEndboss();
            }
            this.i++;
            this.endTheAttack();
            this.checkIfIntroNeedsToReset();
        }, 200);
        addIntervalToArray(this.animateEndboss);
    }
    
    /**
    * This function resets the variable i, when the character hasn't met the endboss but is in its area.
    */
    checkIfIntroNeedsToReset(){
        if(world.character.x > 2420 && !this.hadFirstContact){
            this.i = 0;
            this.hadFirstContact = true;
        }
    }
    
    /**
    * This function increases the attackTime-variable by 1 and sets the boolean isAttacking to false after a timeout of 1200ms.
    */
    endTheAttack(){
        setTimeout(() => {
            this.attackTime += 1;
            this.isAttacking = false;
        }, 1200);
    }
    
    /**
    * This function stops the animatEndboss-interval and sets an attackInterval which executes the playAnimation-function with the IMAGES_ATTACK-array as its parameter. It also stops itself after the Attack animation and restarts the normal animation of the Endboss
    */
    endbossAttack() {
        clearInterval(this.animateEndboss);  
        let pic = 0;
        const attackInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK); 
            pic++;
            if (pic >= 5) {  
                clearInterval(attackInterval);  
                this.animate();  
            }
        }, 200);
    }
    
    /**
    * This executes the playAnimation, when the Object has more than 0 energy or executes the PlayDeadAnimation, when it has 0 energy
    */
    wasHurt(){
        if(this.energy > 0){
            this.playAnimation(this.IMAGES_HURT); 
        }else{
            this.playDeadAnimation();
        }
    }
    
    /**
    * this clears the animateEndboss-interval and executes the playAnimation-function with the IMAGES_DEAD-array as its parameter.
    */
    playDeadAnimation(){
        clearInterval(this.animateEndboss);
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 300);
    }
    
    /**
    * This function returns true every 6 seconds, so the program knows when the endboss needs to attack
    * 
    * @returns {boolean} - returns true when the variable attackTime variable divided by 36 has no rest as result.
    */
    checkIfEndbossNeedsToAttack(){
        return this.attackTime % 36 == 0 
    }
    
    /**
    * This function executes the playAnimation function with the IMAGES_INTRO-array as its parameter.
    */
    playTheIntroPics(){
        setTimeout(() => {
            this.y =  -30;
            this.playAnimation(this.IMAGES_INTRO);
        }, 20);  
    }
    
    /**
    * This function checks, if the character is in the range of the endboss for the first time.
    * 
    * @returns {boolean} - returns true when the character is in the endboss' range for the first Time
    */
    charIsInEndbossRangeFirstTime(){
        return world.character.x < 2620 && !this.hadFirstContact;
    }
    
    /**
    * This function sets the variables isAttacking and introSeen to true, so the program knows that the endboss needs to attack right now. Then the endbossAttack-function is executed.
    */
    prepareTheAttack(){
        this.isAttacking = true;          
        this.introSeen = true;
        this.endbossAttack();
    }
    
    /**
    * This function checks if the current character or entity is not in an attacking state and if the end boss does not need to attack.
    * 
    * @returns {boolean} - Returns `true` if the entity is not attacking and the end boss does not require an attack. Otherwise, it returns `false`.
    *                                                               
    */
    handleCaseOfNoAttack(){
        return this.isAttacking == false && !this.checkIfEndbossNeedsToAttack();
    }
    
    /**
    * This function checks, if the character is behind the endboss
    * 
    * @returns {boolean} - returns true when the endboss' x-coordinate is less than the characters x-coordinate -50
    */
    characterIsRightOfEndboss(){
        return this.x < world.character.x - 50;
    }
    
    /**
    * This function checks, if the chracter is on the left side of the endboss.
    * 
    * @returns {boolean} - returns true when the endboss' x-coordinate is bigger than the x-coordinate of the character.
    */
    characterIsLeftOfEndboss(){
        return this.x >= world.character.x;
    }
    
    /**
    * This function flips the images of the endboss and let it move to the right side to follow the character.
    */
    endbossGoesRight(){
        this.otherDirection = true;
        this.moveRight();
    }
    
    /**
    * this function sets the endobss' images back to normal and let it move to the left side.
    */
    endbossGoesLeft(){
        this.moveLeft();
        this.otherDirection = false;
    }
    
    /**
    * This function checks if the enboss needs to attack or not and in which direction it has to move. It also executes the needed function for the correct situation.
    */
    handleEndbossBehavior(){
        if(this.checkIfEndbossNeedsToAttack()){
            this.prepareTheAttack();
        }else if(this.handleCaseOfNoAttack()){
            this.playAnimation(this.IMAGES_SWIMMING);
            if(this.characterIsRightOfEndboss()) {
                this.endbossGoesRight();
            }else if(this.characterIsLeftOfEndboss()){
                this.endbossGoesLeft();
            }
        } 
    }
    
    /**
    * This function checks, if the character is in the endboss' range for the first time and determines its y coordinate based on the result, so the intro looks like the endobss comes from above the window, when played.
    */
    handleEndbossWithoutHurt(){
        if(this.charIsInEndbossRangeFirstTime()){
            this.y = -500;
        }else{
            this.y = -30;  
            this.handleEndbossBehavior();
        }
    }
    
    /**
    * This function checks, if the intro needs to be played
    * 
    * @returns {boolean} - returns true, when the i-variable is less than 10 AND the introSeen-function returns false
    */
    introWasntSeen(){
        return this.i < 10 && !this.introSeen;
    }
    
    /**
    * this function checks if the endboss was hurt right now or not. It also executes the correct functions for each case.
    */
    activateEndboss(){
        if(!this.isHurt()){
            this.handleEndbossWithoutHurt();
        }else{
            this.wasHurt();
        }
    }
    
}