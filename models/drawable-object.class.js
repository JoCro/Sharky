class DrawableObject{
    imageCache = {};
    currentImage = 0;
    x = 10
    y = 310
    img;
    height = 150;
    width = 100;
    
    /**
     * This function gives the img-variable the value of a new Image and sets its source to the path which was given as the parameter of the function
     * 
     * @param {Text} path - the path of an image
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    
    /**
     * This function draws an image onto the canvas 
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas on which the image will be drawn.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    /**
     * This funciton draws a frame around the character and enemies
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas on which the image will be drawn. 
     */
    drawFrame(ctx){
        if(this instanceof Character || this instanceof Pufferfish){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    
    /**
     * This function draws a Picture for each element of the Array which is used as the function parameter
    * 
    * @param {Array} arrayOfPics - ['img/image1.png','img/image2.png'...]
    */
    loadImages(arrayOfPics){
        arrayOfPics.forEach(path =>{
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; 
        });
    }
}