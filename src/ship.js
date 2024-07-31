
function createShip(idShip, shipLenght){ 
    const id = idShip;
    let lenght = shipLenght;
    let hits = 0;
    let isPositioned = false;
    const hit = function() {
        console.log("is sunk?: " + this.isSunk())
        if(this.isSunk() === false){
            this.hits = this.hits + 1;
            console.log("is sunk? " + this.isSunk());
            console.log("hits: " + this.hits); 
            return true;
        }else{
            console.log("Este barco ya ha sido hundido");     
            return false;
        }
    }
    const isSunk = function(){
        if(this.hits === this.lenght){
            return true; 
        } 
        else return false;
    }


    return {
        id,
        lenght,
        hits, 
        hit, 
        isSunk, 
        isPositioned
    }
} 

export default {createShip}