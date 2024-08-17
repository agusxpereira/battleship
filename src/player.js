import handleShip from "./ship.js";
import handleBoard from "./board.js";
function createPlayer(name="Computer"){
    let userName = name;
    let fleet = []; 
    let shift = false;
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
        if(enemyBoard.board[pos.x][pos.y] !== ""){
            enemyBoard.addSuccessful_shot(
                {
                    x:pos.x,
                    y: pos.y
                }
            )
            let idShipUnderAttack = enemyBoard.board[pos.x][pos.y]; 
            let shipUnderAttack = ""; 
            fleet.forEach(ship =>{
                if (ship.id === idShipUnderAttack){
                    shipUnderAttack = ship;
                }
            });
            console.log(shipUnderAttack)
            shipUnderAttack.hit();
            
            return true;
        }else{
            enemyBoard.addMissShot({
                x : pos.x, 
                y : pos.y 
            })
            return false;
        }
    }

    const isFleetSunked = function(){
        let counter = 0;
        fleet.forEach(ship => {
            if(ship.isSunk() === true){
                counter++;
            }
        });

        if(counter == 5){
            return true;
        }else{
            return false;
        }
    }

    const getShift = function(){
        return shift;
    }

    const setShift= function(currentShift){
        shift = currentShift;
    }  
    return{
        userName,
        userBoard, 
        attack,
        fleet,
        isFleetSunked,
        getShift,
        setShift
    }
}

export default { createPlayer };