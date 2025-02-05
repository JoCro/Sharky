let level1;

/**
 * this function initializes the first level with all enemies, collactables and background-objects
 */
async function initLevel(){
    level1 = new Level(
        [
            
            new Pufferfish(),
            new Pufferfish(),
            new Pufferfish(),
            new Jellyfisch(),
            new Jellyfisch(),
            new Jellyfisch(),
            new Endboss()
            
        ],
    
        [
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -720),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -720),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", -720),
            new BackgroundObject("img/3. Background/Layers/1. Light/2.png", -720),
    
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 0),
    
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720),
            new BackgroundObject("img/3. Background/Layers/1. Light/2.png", 720),
    
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720*2),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720*2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720*2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720*2),
            new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 720*2),
    
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720*3),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720*3),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720*3),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720*3),
            new BackgroundObject("img/3. Background/Layers/1. Light/2.png", 720*3),

            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720*4),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720*4),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720*4),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720*4),
            new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 720*4),

            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720*5),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720*5),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720*5),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720*5),
            new BackgroundObject("img/3. Background/Layers/1. Light/2.png", 720*5)
            
        ],

        [

            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()

        ]
    
    
    );
}



