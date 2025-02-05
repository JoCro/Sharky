class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    
    /**
    * Constructs an instance of the class and initializes its position and image.
    * 
    * @param {String} imagePath - The path to the image file to load for this instance 
    * @param {number} x - The x-coordinate at which to position the instance.
    */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}