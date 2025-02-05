class Coin extends MovableObject{
    
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    
    IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];
    coin_sound = new Audio ('sounds/coinCollected.mp3');
    
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
        setStoppableInterval(this.animateCoins.bind(this), 250);
    }
    
    /**
    * this function executes the playAnimation-function with the given parameter of the IMAGES-Array
    */
    animateCoins(){
        this.playAnimation(this.IMAGES);
    }
}