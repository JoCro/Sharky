class Bottle extends MovableObject{
    
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    
    IMAGES = [
        'img/4. Marcadores/Posiขn/Animada/1.png',
        'img/4. Marcadores/Posiขn/Animada/2.png',
        'img/4. Marcadores/Posiขn/Animada/3.png',
        'img/4. Marcadores/Posiขn/Animada/4.png',
        'img/4. Marcadores/Posiขn/Animada/5.png',
        'img/4. Marcadores/Posiขn/Animada/6.png',
        'img/4. Marcadores/Posiขn/Animada/7.png',
        'img/4. Marcadores/Posiขn/Animada/8.png' 
    ];
    
    /**
    * Constructs an instance of the class, initializing its image, position, size and animation settings.
    * 
    */
    constructor(){
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES);
        this.x = 250 + Math.random() * 1800;
        this.y = 20 + Math.random() * 400;
        this.width = 50;
        this.height = 50;
        setStoppableInterval(this.animateBottles.bind(this), 250);
    }
    
    /**
    * this function executes the playAnimation-Function with the pictures of the IMAGES-array
    */
    animateBottles(){
        this.playAnimation(this.IMAGES);
    }
}