class Level{
    enemies;
    backgroundObjects;
    collectableObjects;
    level_end_x = 3300;
    
    /**
    * Constructs an instance of the class, initializing enemies, background objects and collectable objects for the game level or scene.
    * 
    * @param {Array} enemies - An array of enemy objects present in the level
    * @param {Array} backgroundObjects - An array  of background objects for the level
    * @param {Array} collectableObjects - An array of collectable objects in the level
    */
    constructor(enemies, backgroundObjects, collectableObjects){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects
    }
}