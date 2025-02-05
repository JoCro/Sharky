class StatusbarEnemy extends DrawableObject{
    
    
    IMAGES = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ];
    
    percentage = 100;
    
    /**
    * Constructs an instance of the class, initializing its image, position, size and animation settings.
    * 
    */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
    
    /**
    * This function changes the value of the percentage-variable to the value of the percentage-parameter and changes the picture of the statusbar to the new picture, which is given by the resolveImageIndex-function.
    * 
    * @param {number} percentage - a number passed by the function which executes this function.
    */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
    * This function returns a number, which is used later as an index, to determine the correct picture in the IMAGES-array
    * 
    * @returns {number} - returns a number from 0 to 5 based on the value of the percentage-variable
    */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage >= 80){
            return 4;
        }else if(this.percentage >= 60){
            return 3;
        }else if(this.percentage >= 40){
            return 2;
        }else if(this.percentage >= 20){
            return 1;
        }else{
            return 0;
        }
    }
}