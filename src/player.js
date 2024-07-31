import handleShip from "./ship.js";
import handleBoard from "./board.js";
function createPlayer(name="Computer"){
    let userName = name;
    let fleet = []; 
    //creamos 5 naves, dándole un ID a cada una: 

    const carrier = handleShip.createShip(1, 5);//creamos una nave, dandole un id = 1 y un lenght = 5 
    const battleship = handleShip.createShip(2, 4); 
    const cruiser = handleShip.createShip(3, 3); 
    const submarine = handleShip.createShip(4, 3); 
    const destroyer = handleShip.createShip(5, 2); 
    
    fleet.push(carrier);
    fleet.push(battleship);
    fleet.push(cruiser);
    fleet.push(submarine);
    fleet.push(destroyer);
    
    
    
    
    const userBoard = handleBoard.createBoard(fleet); 
    //Ahora posicionariamos las naves. 

    
    const attack = function(enemyBoard, pos){
        if(enemyBoard.getPos(pos) !== ""){
            let shipUnderAttack = gameBoard.getShip(pos); 
            shipUnderAttack.hit();
        }else{
            enemyBoard.missShots.push({
                x : pos.x, 
                y : pos.y 
            })
        }
    }
    return{
        userName,
        userBoard, 
        fleet
    }
}

export default { createPlayer };